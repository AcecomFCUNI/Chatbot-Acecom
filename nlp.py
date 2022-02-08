import os
import gc
from model.chatbotN03.chat import ChatbotN03

os.environ["PYTORCH_TRANSFORMERS_CACHE"] = "model/weights/"


def chatbotSelector(toActivate):
    chatbot = None
    if toActivate[0]:
        try:
            from model.chatbotN01.model import ChatbotN01

            chatbot = ChatbotN01()
        except:
            print("Error al importar el ChatbotN01")
    if toActivate[1]:
        try:
            from model.chatbotN02.model import ChatbotN02

            chatbot = ChatbotN02()
        except:
            print("Error al importar el ChatbotN02")
    if toActivate[2]:
        try:
            # from model.chatbotN03.chat import ChatbotN03
            chatbot = ChatbotN03()
        except:
            print("Error al instanciar el ChatbotN03")

    if toActivate[3]:
        from model.chatbotN04.model import ChatbotN04

        chatbot = ChatbotN04("DialoGPT-medium-joshua")

    if toActivate[4]:
        try:
            from model.chatbotN05.model import ChatbotN05

            chatbot = ChatbotN05()
        except:
            print("Error al importar el ChatbotN05")
    return chatbot


class NLP:
    def __init__(self, initRunning):
        self.chatbot = ChatbotN03()
        self.toActivate = initRunning

    def generator(self, toActivate, modelId):
        if toActivate[int(modelId) - 1] != True:
            del self.chatbot
            gc.collect()
            self.toActivate = self.chmod(int(modelId))
            self.chatbot = chatbotSelector(self.toActivate)

    def chmod(self, modelId):
        toActivate = [
            True if index + 1 == int(modelId) else False
            for index, _ in enumerate(self.toActivate)
        ]
        return toActivate

    def ask(self, modelId, query):
        self.generator(self.toActivate, modelId)
        if modelId == "1":
            if self.chatbot != None:
                response = self.chatbot.chat(query)
                return {
                    "type": "response",
                    "data": response,
                }
            else:
                return {
                    "type": "error",
                    "data": "El chatbot 01 no está instanciado correctamente, verificar Backend",
                }
        elif modelId == "2":
            if self.chatbot != None:
                response = self.chatbot.chat(query)
                return {
                    "type": "response",
                    "data": response,
                }
            else:
                return {
                    "type": "error",
                    "data": "El chatbot 02 no está instanciado correctamente, verificar Backend",
                }

        elif modelId == "3":
            if self.chatbot != None:
                response = self.chatbot.chat(query)
                return {
                    "type": "response",
                    "data": response,
                }
            else:
                return {
                    "type": "error",
                    "data": "El chatbot 03 no está instanciado correctamente, verificar Backend",
                }
        elif modelId == "4":
            if self.chatbot != None:
                response = self.chatbot.chat(query)
                return {
                    "type": "response",
                    "data": response,
                }
            else:
                return {
                    "type": "error",
                    "data": "El chatbot 04 no está instanciado correctamente, verificar Backend",
                }
        elif modelId == "5":
            if self.chatbot != None:
                response = self.chatbot.chat(query)
                return {
                    "type": "response",
                    "data": response,
                }
            else:
                return {
                    "type": "error",
                    "data": "El chatbot 05 no está instanciado correctamente, verificar Backend",
                }
