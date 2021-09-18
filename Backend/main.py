'''
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
'''

import os

from fastapi import FastAPI

from proto import NLPProto
from nlp import NLP


app = FastAPI(
    title="chatbot", description="Chatbot diseñado por AcecomIA", version="0.0.1"
)
nlp = NLP()


@app.post("/nlp")
def nlp_task(q: NLPProto):
    try:
        return {"answer": nlp.ask(q.modelId, q.query)}
    except BaseException as e:
        return {"error": str(e)}
