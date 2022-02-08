"""
Paper: https://arxiv.org/abs/1907.06616
Sitio: https://parl.ai/projects/recipes/
"""

from mtranslate import translate
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

from model.BaseClassModel import model


class ChatbotN05(model):
    def __init__(self):
        self.name = "BlenderBot"
        self.tokenizer = AutoTokenizer.from_pretrained(
            "facebook/blenderbot-400M-distill"
        )
        self.blender = AutoModelForSeq2SeqLM.from_pretrained(
            "facebook/blenderbot-400M-distill"
        )

    def chat(self, sentence):
        sentence = translate(sentence, to_language="en", from_language="es")
        sentence = self.tokenizer([sentence], return_tensors="pt")
        ids_response = self.blender.generate(**sentence)
        response = self.tokenizer.batch_decode(ids_response)
        response = response[0].replace("<s>", "").replace("</s>", "")
        response = translate(response, to_language="es", from_language="en")
        return response
