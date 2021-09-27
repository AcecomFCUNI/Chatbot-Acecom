import random
import json
import torch
from model.chatbotN03.model import Net
from model.chatbotN03.utils import DataProcess
from model.BaseClassModel import model
#################################################################################################
#                             Creamos la clase model
# 
class ChatbotN03(model):
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        with open("../Backend/model/chatbotN03/intents.json", "r", encoding="utf-8") as f:
            self.intents = json.load(f)

        FILE = "../Backend/model/chatbotN03/data.pth"
        data = torch.load(FILE)
        self.preprocess_dataset = DataProcess()

        self.input_size = data["input_size"]
        self.hidden_size = data["hidden_size"]
        self.output_size = data["ouput_size"]
        self.all_words = data["all_words"]
        self.tags = data["tags"]
        model_state = data["model_state"]

        self.model = Net(self.input_size, self.hidden_size, self.output_size).to(self.device)
        self.model.load_state_dict(model_state)
        self.model.eval()

    def chat(self, sentece):
        """
        Función:
            chat:
                - Esta función permite realizar la inferencia del chatbot.

        Argumentos:
            sentence:
                - Se debe agregar un mensaje (str)
        Retorna:
                - No retornaré el mensaje realizado por el bot.
        """
        #bot_name = "Chatbot_ACECOM_IA"
        sentence = self.preprocess_dataset.tokenize(sentece)
        x = self.preprocess_dataset.bag_word(sentence, self.all_words)
        x = x.reshape(1, x.shape[0])
        x = torch.from_numpy(x).to(self.device)
        x = x.float()
        output = self.model(x)
        _, predictions = torch.max(output, dim=1)
        tag = self.tags[predictions.item()]

        probs = torch.softmax(output, dim=1)
        prob = probs[0][predictions.item()]

        if prob.item() > 0.75:
            for intent in self.intents["intents"]:
                if tag == intent["tag"]:
                    return f"{random.choice(intent['responses'])}"
        else:
            return f"Aun estoy aprendiendo su lenguaje..."
