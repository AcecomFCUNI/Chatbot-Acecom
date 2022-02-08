from abc import ABC, abstractmethod 

class model(ABC):
    @abstractmethod
    def __init__(self):
        pass

    @abstractmethod
    def chat(self, sentence):
        pass