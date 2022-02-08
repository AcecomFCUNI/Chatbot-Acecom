"""
Sitio: https://pytorch.org/tutorials/beginner/chatbot_tutorial.html#define-models
Cuaderno: https://colab.research.google.com/github/pytorch/tutorials/blob/gh-pages/_downloads/cf54d584af1322e88020549223e907dc/chatbot_tutorial.ipynb
"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

from mtranslate import translate
import torch
import torch.nn as nn

from config import *
from model.BaseClassModel import model
from model.chatbotN02.utils import (
    indexesFromSentence,
    normalizeString,
    Voc,
    EncoderRNN,
    LuongAttnDecoderRNN,
)


MAX_LENGTH = 20
encoder_n_layers = 2
decoder_n_layers = 2
corpus_name = "cornell movie-dialogs corpus"
attn_model = "dot"
# attn_model = 'general'
# attn_model = 'concat'
hidden_size = 500
dropout = 0.1


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
        decoder_input = (
            torch.ones(1, 1, device=DEVICE_INFERENCE, dtype=torch.long) * 1
        )  # (sos_token =1)
        # Initialize tensors to append decoded words to
        all_tokens = torch.zeros([0], device=DEVICE_INFERENCE, dtype=torch.long)
        all_scores = torch.zeros([0], device=DEVICE_INFERENCE)
        # Iteratively decode one word token at a time
        for _ in range(max_length):
            # Forward pass through decoder
            decoder_output, decoder_hidden = self.decoder(
                decoder_input, decoder_hidden, encoder_outputs
            )
            # Obtain most likely word token and its softmax score
            decoder_scores, decoder_input = torch.max(decoder_output, dim=1)
            # Record token and score
            all_tokens = torch.cat((all_tokens, decoder_input), dim=0)
            all_scores = torch.cat((all_scores, decoder_scores), dim=0)
            # Prepare current token to be next decoder input (add a dimension)
            decoder_input = torch.unsqueeze(decoder_input, 0)
        # Return collections of word tokens and scores
        return all_tokens, all_scores


def evaluate(searcher, voc, sentence, max_length=MAX_LENGTH):
    ### Format input sentence as a batch
    # words -> indexes
    indexes_batch = [indexesFromSentence(voc, sentence)]
    # Create lengths tensor
    lengths = torch.tensor(
        [len(indexes) for indexes in indexes_batch], device=DEVICE_INFERENCE
    )
    # Transpose dimensions of batch to match models' expectations
    input_batch = torch.LongTensor(indexes_batch, device=DEVICE_INFERENCE).transpose(
        0, 1
    )
    # Decode sentence with searcher
    tokens, _ = searcher(input_batch, lengths, max_length)
    # indexes -> words
    decoded_words = [voc.index2word[token.item()] for token in tokens]
    return decoded_words


def evaluateOneInput(input_sentence, searcher, voc):
    try:
        # Check if it is quit case
        input_sentence = normalizeString(input_sentence)
        # Evaluate sentence
        output_words = evaluate(searcher, voc, input_sentence)
        # Format and print response sentence
        output_words[:] = [x for x in output_words if not (x == "EOS" or x == "PAD")]
        return " ".join(output_words)

    except KeyError:
        return "Error: Encountered unknown word."


class ChatbotN02(model):
    def __init__(self):
        self.name = "Tutorial Pytorch"
        self.voc = Voc(corpus_name)
        self.quantization = True
        checkpoint = None
        try:
            if self.quantization:
                checkpoint = torch.load(
                    "model/weights/model_pytorch_q.pth",
                    map_location=DEVICE_INFERENCE,
                )
            else:
                checkpoint = torch.load(
                    "model/weights/model_pytorch.pth",
                    map_location=DEVICE_INFERENCE,
                )

            encoder_sd = checkpoint["en"]
            decoder_sd = checkpoint["de"]
            embedding_sd = checkpoint["embedding"]
            self.voc.__dict__ = checkpoint["voc_dict"]
            embedding = nn.Embedding(self.voc.num_words, hidden_size)
            embedding.load_state_dict(embedding_sd)

            self.encoder = EncoderRNN(hidden_size, embedding, encoder_n_layers, dropout)
            self.decoder = LuongAttnDecoderRNN(
                attn_model,
                embedding,
                hidden_size,
                self.voc.num_words,
                decoder_n_layers,
                dropout,
            )
            if self.quantization:
                self.encoder = torch.quantization.quantize_dynamic(
                    self.encoder,  # the original model
                    {torch.nn.GRU},  # a set of layers to dynamically quantize
                    dtype=torch.qint8,
                )

                self.decoder = torch.quantization.quantize_dynamic(
                    self.decoder,  # the original model
                    {torch.nn.GRU},  # a set of layers to dynamically quantize
                    dtype=torch.qint8,
                )

            self.encoder.load_state_dict(encoder_sd)
            self.decoder.load_state_dict(decoder_sd)

            self.encoder.to(DEVICE_INFERENCE)
            self.decoder.to(DEVICE_INFERENCE)

            # Set dropout layers to eval mode
            self.encoder.eval()
            self.decoder.eval()

            self.searcher = GreedySearchDecoder(self.encoder, self.decoder)

        except Exception as e:
            print("Imprimiendo excepcion", e)

    def chat(self, query):
        query = translate(query, to_language="en", from_language="es")
        output = evaluateOneInput(query, self.searcher, self.voc)
        output = translate(output, to_language="es", from_language="en")
        return output
