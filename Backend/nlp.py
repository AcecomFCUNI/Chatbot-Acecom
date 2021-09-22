import re
import string
from model.chatbotN03.chat import chat

class NLP:
    def __init__(self):
        pass

    def ask(self, modelId, query):
        if modelId == '1':
            query += "  RETORNANDO" + modelId
            return {
                "type": "response",
                "data": query,
            }
        elif modelId == '2':
            query += "  RETORNANDO" + modelId
            return {
                "type": "response",
                "data": query,
            }

        elif modelId == '3':
            query = chat(query)
            return {
                "type": "response",
                "data": query,
            }
        
        
