from pydantic import BaseModel


class NLPProto(BaseModel):
    modelId: str
    query: str

