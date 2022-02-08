import json
import requests
from mtranslate import translate

from model.BaseClassModel import model
from config import *


class ChatbotN04(model):
    def __init__(self, model_name):
        self.name = "API DialoGPT-medium-joshua"
        self.api_endpoint = API_URL + model_name
        self.request_headers = {"Authorization": "Bearer {}".format(API_TOKEN)}

    def chat(self, sentence):
        sentence = translate(sentence, to_language="en", from_language="es")
        payload = {"inputs": {"text": sentence}}
        response = self.query(payload)
        bot_response = response.get("generated_text", None)
        bot_response = translate(bot_response, to_language="es", from_language="en")
        return bot_response

    def query(self, payload):
        data = json.dumps(payload)
        response = requests.request(
            "POST", self.api_endpoint, headers=self.request_headers, data=data
        )
        ret = json.loads(response.content.decode("utf-8"))
        return ret
