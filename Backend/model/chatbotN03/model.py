import torch.nn as nn
import torch.nn.functional as f


class Net(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(Net, self).__init__()
        '''
        -Método:
            - __init__: Este es el constructor de la clase  Net 
        -Argumentos:
           - input_size : Número de neuronas en la entrada.
           - hidden_size: Número de neuronas en la capa oculta.
           - output_size: Número de neuronas en la capa de salida.
        '''
        self.linear1 = nn.Linear(input_size, hidden_size)
        self.linear2 = nn.Linear(hidden_size, hidden_size)
        self.linear3 = nn.Linear(hidden_size, output_size)
        self.relu = nn.ReLU()

    def forward(self, x):
        '''
        - Método
            - forward: Esta función realizara el paso hacie adelante en la red.
        - Argumentos:
            - x: Le pasamos de parámetro un tensor de torch. 
        - Retorna:
            - out: Nos retorna la inferencia del modelo.
        '''
        x = self.relu(self.linear1(x))
        x = self.relu(self.linear2(x))
        out = self.linear3(x)
        return out
