from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import torch
from torch.jit import script, trace
import torch.nn as nn
from torch import optim
import torch.nn.functional as F

from model.BaseClassModel import model
from model.chatbotN02.utils import indexesFromSentence, normalizeString, Voc, EncoderRNN, LuongAttnDecoderRNN

import os

from io import open

MAX_LENGTH = 20
encoder_n_layers = 2
decoder_n_layers = 2

class GreedySearchDecoder(nn.Module):
    def __init__(self, encoder, decoder):
        super(GreedySearchDecoder, self).__init__()
        self.encoder = encoder
        self.decoder = decoder

    def forward(self, input_seq, input_length, max_length):
        # Forward input through encoder model
        encoder_outputs, encoder_hidden = self.encoder(input_seq, input_length)
        # Prepare encoder's final hidden layer to be first hidden input to the decoder
        decoder_hidden = encoder_hidden[:decoder_n_layers]
        # Initialize decoder input with SOS_token
        decoder_input = torch.ones(1, 1, device=device, dtype=torch.long) * 1 #(sos_token =1)
        # Initialize tensors to append decoded words to
        all_tokens = torch.zeros([0], device=device, dtype=torch.long)
        all_scores = torch.zeros([0], device=device)
        # Iteratively decode one word token at a time
        for _ in range(max_length):
            # Forward pass through decoder
            decoder_output, decoder_hidden = self.decoder(decoder_input, decoder_hidden, encoder_outputs)
            # Obtain most likely word token and its softmax score
            decoder_scores, decoder_input = torch.max(decoder_output, dim=1)
            # Record token and score
            all_tokens = torch.cat((all_tokens, decoder_input), dim=0)
            all_scores = torch.cat((all_scores, decoder_scores), dim=0)
            # Prepare current token to be next decoder input (add a dimension)
            decoder_input = torch.unsqueeze(decoder_input, 0)
        # Return collections of word tokens and scores
        return all_tokens, all_scores



def evaluate(encoder, decoder, searcher, voc, sentence, max_length=MAX_LENGTH):
    ### Format input sentence as a batch
    # words -> indexes
    indexes_batch = [indexesFromSentence(voc, sentence)]
    # Create lengths tensor
    lengths = torch.tensor([len(indexes) for indexes in indexes_batch])
    # Transpose dimensions of batch to match models' expectations
    input_batch = torch.LongTensor(indexes_batch).transpose(0, 1)
    # Use appropriate device
    input_batch = input_batch.to(device)
    lengths = lengths.to("cpu")
    # Decode sentence with searcher
    tokens, scores = searcher(input_batch, lengths, max_length)
    # indexes -> words
    decoded_words = [voc.index2word[token.item()] for token in tokens]
    return decoded_words

def evaluateOneInput(inputm, encoder, decoder, searcher, voc):
    input_sentence = ''
    try:
        # Get input sentence
        input_sentence = inputm
        # Check if it is quit case
        input_sentence = normalizeString(input_sentence)
        # Evaluate sentence
        output_words = evaluate(encoder, decoder, searcher, voc, input_sentence)
        # Format and print response sentence
        output_words[:] = [x for x in output_words if not (x == 'EOS' or x == 'PAD')]
        return ( ' '.join(output_words))

    except KeyError:
        return ("Error: Encountered unknown word.")



#Load Model

USE_CUDA = torch.cuda.is_available()
device = torch.device("cuda" if USE_CUDA else "cpu")

save_dir = os.path.join("model/chatbotN02/data", "save")
corpus_name = "cornell movie-dialogs corpus"

# Configure models
model_name = 'cb_model'
attn_model = 'dot'
#attn_model = 'general'
#attn_model = 'concat'
hidden_size = 500

dropout = 0.1
batch_size = 64

checkpoint_iter = 4000
loadFilename = os.path.join(save_dir, model_name, corpus_name,
                            '{}-{}_{}'.format(encoder_n_layers, decoder_n_layers, hidden_size),
                            '{}_checkpoint.tar'.format(checkpoint_iter))


corpus = os.path.join("data", corpus_name)


class ChatbotN02(model):
    def __init__(self):
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.voc= Voc(corpus_name)
        checkpoint = torch.load(loadFilename, map_location=torch.device('cpu'))
        encoder_sd = checkpoint['en']
        decoder_sd = checkpoint['de']
        encoder_optimizer_sd = checkpoint['en_opt']
        decoder_optimizer_sd = checkpoint['de_opt']
        embedding_sd = checkpoint['embedding']
        self.voc.__dict__ = checkpoint['voc_dict']
        embedding = nn.Embedding(self.voc.num_words, hidden_size)
        embedding.load_state_dict(embedding_sd)

        self.encoder = EncoderRNN(hidden_size, embedding, encoder_n_layers, dropout)
        self.decoder = LuongAttnDecoderRNN(attn_model, embedding, hidden_size, self.voc.num_words, decoder_n_layers, dropout)
        self.encoder.load_state_dict(encoder_sd)
        self.decoder.load_state_dict(decoder_sd)

        self.encoder = self.encoder.to(device)
        self.decoder = self.decoder.to(device)
        #print('Models built and ready to go!')

        # Set dropout layers to eval mode
        self.encoder.eval()
        self.decoder.eval()

        self.searcher = GreedySearchDecoder(self.encoder, self.decoder)

    def chat(self, query):
        output = evaluateOneInput(query, self.encoder, self.decoder, self.searcher, self.voc)
        return output