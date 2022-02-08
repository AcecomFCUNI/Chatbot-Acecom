from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals


from pathlib import Path
import sys
import torch
import torch.nn as nn

path_root = Path(__file__).parents[2]
sys.path.append(str(path_root))

from config import *
from utils import (
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

voc = Voc(corpus_name)

print("\nCargando modelo..\n")
checkpoint = torch.load(
    "model/weights/model_pytorch.pth",
    map_location=DEVICE_INFERENCE,
)
encoder_sd = checkpoint["en"]
decoder_sd = checkpoint["de"]
embedding_sd = checkpoint["embedding"]
voc.__dict__ = checkpoint["voc_dict"]
embedding = nn.Embedding(voc.num_words, hidden_size)
embedding.load_state_dict(embedding_sd)

encoder = EncoderRNN(hidden_size, embedding, encoder_n_layers, dropout)
decoder = LuongAttnDecoderRNN(
    attn_model,
    embedding,
    hidden_size,
    voc.num_words,
    decoder_n_layers,
    dropout,
)

encoder.load_state_dict(encoder_sd)
decoder.load_state_dict(decoder_sd)

print("\nQuantizando el modelo (int8)..\n")
model_encoder_int8 = torch.quantization.quantize_dynamic(
    encoder,  # the original model
    {torch.nn.GRU},  # a set of layers to dynamically quantize
    dtype=torch.qint8,
)

model_decoder_int8 = torch.quantization.quantize_dynamic(
    decoder,  # the original model
    {torch.nn.GRU},  # a set of layers to dynamically quantize
    dtype=torch.qint8,
)

model_encoder_int8 = model_encoder_int8.to(DEVICE_INFERENCE)
model_decoder_int8 = model_decoder_int8.to(DEVICE_INFERENCE)

print("\nGuardando modelo quantizado..\n")
torch.save(
    {
        "en": model_encoder_int8.state_dict(),
        "de": model_decoder_int8.state_dict(),
        "voc_dict": voc.__dict__,
        "embedding": embedding.state_dict(),
    },
    "model/weights/model_pytorch_q.pth",
)

