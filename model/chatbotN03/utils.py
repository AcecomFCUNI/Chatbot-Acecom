import nltk
import numpy as np
from nltk.stem import SnowballStemmer
from torchtext.data import get_tokenizer
#nltk.download('perluniprops')
#nltk.download('nonbreaking_prefixes')
#nltk.download('punkt')

tokenizer = get_tokenizer("toktok", language="es")
stemmer = SnowballStemmer("spanish")


class DataProcess:
    def tokenize(self, sentence):
        return tokenizer(sentence)

    def stem(self, word):
        return stemmer.stem(word.lower())

    def bag_word(self, token_sentence, all_world):
        token_sentence = [self.stem(w) for w in token_sentence]
        bag = np.zeros_like(all_world, dtype=np.float32)
        bag = [1.0 if w in token_sentence else 0 for w in all_world]
        bag = np.array(bag)
        return bag