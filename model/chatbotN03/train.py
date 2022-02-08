import json
import numpy as np
import torch
import torch.nn.functional as f
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from torch.optim import optimizer
from utils import DataProcess


from config import DEVICE_INFERENCE
from model.chatbotN03.model import Net

######################################################################
#                  Cargamos el Archivo json                          #
with open("model/chatbotN03/intents.json", "r", encoding="utf-8") as f:
    data = json.load(f)

######################################################################
#                 Creamos algunas variables                          #
all_words = []
tags = []
xy = []
preprocess_dataset = DataProcess()

ignore_words = [
    "!",
    "#",
    "$",
    "%",
    "&",
    "(",
    ")",
    "*",
    "+",
    "-",
    ",",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "¿",
    "?",
    "@",
    "[",
    "]",
    "^",
    "_",
    "`",
    "{",
    "|",
    "}",
    "~",
    "]",
]

X_train = []
Y_train = []
######################################################################
#            Preparamos la data para el entrenamiento                #

for intent in data["intents"]:
    tag = intent["tag"]
    tags.append(tag)
    for pattern in intent["patterns"]:
        w = preprocess_dataset.tokenize(pattern)
        all_words.extend(w)
        xy.append((w, tag))

all_words = [preprocess_dataset.stem(w) for w in all_words if w not in ignore_words]
all_words = sorted(set(all_words))
tags = sorted(set(tags))

for (patter_sentece, tag) in xy:
    bag = preprocess_dataset.bag_word(patter_sentece, all_words)
    X_train.append(bag)
    label = tags.index(tag)
    Y_train.append(label)

X_train = np.array(X_train)
Y_train = np.array(Y_train)

#############################################################################


class ChatDataset(Dataset):
    def __init__(self):
        """
        -Método:
            - __init__: Este es el constructor de la clase  ChatDataset que hereda de Dataset.
        - Argumentos:
            -  self.n_samples: Tamaño de los datos de entrenamiento.
            - self.x_data: Los datos de entrenamiento.
            - self.y_data: Las etiquetas de los datos de entrenamiento.
        """
        self.n_samples = len(X_train)
        self.x_data = X_train
        self.y_data = Y_train

    def __getitem__(self, index):
        """
        -Método:
            - __getitem__: Este es un método especial para obtener elementos.
        - Argumentos:
            -  index: El indice que nos dar la posición de un dato en x_data y y_data.
        - Retorna:
           - Nos retorana los valores de x_data e y_data en la posición index.
        """
        return self.x_data[index], self.y_data[index]

    def __len__(self):
        """
        -Método:
           - __len__ : Este método especial nos dara el tamño de los datos de ejemplo.
        Retorna:
           - nos retornara el tamñaño de los datos de ejemplo.
        """
        return self.n_samples


###################################################################################
#                           Entrenammiento del modelo                             #
batch_size = 8
hidden_Size = 8
output = len(tags)
input = len(X_train[0])
learning_rate = 0.001
num_epoch = 1000
dataset = ChatDataset()
train_loader = DataLoader(dataset, batch_size, shuffle=True, num_workers=0)
model = Net(input, hidden_Size, output).to(DEVICE_INFERENCE)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

for epoch in range(num_epoch):
    for (words, labels) in train_loader:
        words = words.to(device=DEVICE_INFERENCE)
        words = words.float()
        labels = labels.to(device=DEVICE_INFERENCE)
        labels = labels.type(torch.int64)
        outputs = model(words)
        loss = criterion(outputs, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    if (epoch + 1) % 100 == 0:
        print(f"epoch: {epoch+1}/{num_epoch}, loss = {loss.item():.4f}")

print(f"final loss = {loss.item():.4f}")
############################################################################################
#                              Descargamos el modelo                                       #
data = {
    "model_state": model.state_dict(),
    "input_size": input,
    "ouput_size": output,
    "hidden_size": hidden_Size,
    "all_words": all_words,
    "tags": tags,
}

FILE = "model/weights/model_bog.pth"
torch.save(data, FILE)
print(f"El entrenamiento ha terminado tu archivo {FILE} se ha guardado.")
