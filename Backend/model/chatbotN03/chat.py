import random
import json
import torch
from model.chatbotN03.model import Net
from model.chatbotN03.utils import DataProcess

#################################################################################################
#                             Cargamos el modelo  entrenado                                     #
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

with open("../Backend/model/chatbotN03/intents.json", "r", encoding="utf-8") as f:
    intents = json.load(f)

FILE = "../Backend/model/chatbotN03/data.pth"
data = torch.load(FILE)
preprocess_dataset = DataProcess()

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["ouput_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = Net(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()
#########################################################################################################

def chat(sentece):
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
    sentence = preprocess_dataset.tokenize(sentece)
    x = preprocess_dataset.bag_word(sentence, all_words)
    x = x.reshape(1, x.shape[0])
    x = torch.from_numpy(x).to(device)
    x = x.float()
    output = model(x)
    _, predictions = torch.max(output, dim=1)
    tag = tags[predictions.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predictions.item()]

    if prob.item() > 0.75:
        for intent in intents["intents"]:
            if tag == intent["tag"]:
                return f"{random.choice(intent['responses'])}"
    else:
        return f"Aun estoy aprendiendo su lenguaje..."
