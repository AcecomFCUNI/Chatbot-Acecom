"""
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from proto import NLPProto
from nlp import NLP
from config import INFO


app = FastAPI(
    title="Chatbot Acecom IA",
    description="Colección de modelos de chatbots recopilados y/o creados por ACECOM IA",
    version="0.0.1",
)
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

initRunning = [i["running"] for i in INFO]
nlp = NLP(initRunning)


@app.get("/")
def home():
    return {"message": "Endpoint de Chatbot Acecom"}


@app.get("/info")
def home():
    return {"info": INFO}


@app.post("/nlp")
def nlp_task(q: NLPProto):
    try:
        return nlp.ask(q.modelId, q.query)
    except BaseException as e:
        return {"error": str(e)}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
