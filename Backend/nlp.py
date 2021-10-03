import re
import string

#from model.chatbotN01.model import ChatbotN01
from model.chatbotN02.model import ChatbotN02
#from model.chatbotN03.chat import ChatbotN03

class NLP:
    def __init__(self):
        #self.chatbot01 = ChatbotN01()
        self.chatbot02 = ChatbotN02()
        #self.chatbot03 = ChatbotN03()

    def ask(self, modelId, query):
        if modelId == '1':
            query = query+"id"#self.chatbot01.chat(query)
            return {
                "type": "response",
                "data": query,
            }
        elif modelId == '2':
            query += " " + self.chatbot02.chat(query)
            return {
                "type": "response",
                "data": query,
            }

        elif modelId == '3':
            #query = self.chatbot03.chat(query)
            query += "  RETORNANDO" + modelId
            return {
                "type": "response",
                "data": query,
            }
        
        
