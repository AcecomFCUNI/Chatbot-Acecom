import torch


INFO = [
    {
        "name": "Tensorflow",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1200px-Tensorflow_logo.svg.png",
        "message": "Esta interactuando con el tutorial oficial de Tensorflow",
        "running": False,
        "blocked": True,
    },
    {
        "name": "Pytorch",
        "image": "https://www.pngitem.com/pimgs/m/31-310639_pytorch-logo-png-transparent-png.png",
        "message": "Esta interactuando con el tutorial oficial de Pytorch, que además ha sido quantizado",
        "running": False,
        "blocked": False,
    },
    {
        "name": "BoW",
        "image": "https://miro.medium.com/max/377/1*yDysYXCrt6ONX6bAY8BIvw.png",
        "message": "Esta interactuando con un modelo que usa Bag Of Words",
        "running": True,
        "blocked": False,
    },
    {
        "name": "DialoGPT",
        "image": "https://huggingface.co/front/thumbnails/dialogpt.png",
        "message": "Esta interactuando con DialoGPT-medium-joshua, alojado en HuggingFace",
        "running": False,
        "blocked": False,
    },
    {
        "name": "Blender Bot",
        "image": "https://parl.ai/static/img/icon.png",
        "message": "Esta interactuando con Blender Bot, el chatbot más avanzado!",
        "running": False,
        "blocked": True,
    },
]

API_URL = "https://api-inference.huggingface.co/models/r3dhummingbird/"
API_TOKEN = "api_teBtJXGTyGkxOlqEEpiKcJPsXmsfCIfIoX"
DEVICE_TRAIN = torch.device("cuda" if torch.cuda.is_available() else "cpu")
DEVICE_INFERENCE = torch.device("cpu")
