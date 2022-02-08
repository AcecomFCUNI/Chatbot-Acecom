FROM python:3.9-slim

WORKDIR /code

COPY ./requirements_backend.txt /code/requirements.txt

#RUN apk add --no-cache mysql-client
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./ /code

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--reload"]
