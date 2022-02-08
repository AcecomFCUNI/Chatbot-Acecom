<h2 align="center">
<p>ChatBot ACECOM (Backend)</p>
</h2>

[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
[![pytorch](https://img.shields.io/badge/PyTorch-1.9-EE4C2C.svg?style=flat&logo=pytorch)](https://pytorch.org)

## ℹ️ Introducción

Esta rama contiene todos los archivos necesarios para poder levantar el backend localmente y/o en Heroku. En heroku solo estan hosteados los modelos más ligeros para evitar saturar la capa gratuita. Si desea levantar el chatbot de forma completa se recomienda tener un mínimo de 8gb de RAM.

## 📑 Instalación de los paquetes

- Para poder ejecutar este proyecto le recomendamos encarecidamente use ANACONDA o _pipenv_ para poder manejar sus entornos de trabajo y no tener problemas de incompatibilidad.
- Una vez que tiene su entorno creado y **activado**, ejecute el siguiente comando en terminal:

```bash
pip install -r requirements.txt
```

Esto puede tomar un poco de tiempo, asi que tenga paciencia!

- Eso es todo, estas listo para pasar a la siguiente sección.

## 📁 Configurando los pesos

Necesita descargar los pesos de los modelos que hemos entrenado en el siguiente [link](https://drive.google.com/drive/folders/1ckQjeJIccKYkaGOF0kN_ZMd11yd8rgFc?usp=sharing). Estos pesos deben estar dentro de la carpeta `weights`.

## 🧠 Inferencia

Para probar nuestro chatBot, simplemente ejecute desde el terminal:

```bash
python main.py
```

Desde su navegador acceda a [http://localhost:8000/docs](http://localhost:8000/docs), los parámetros requeridos son el _modelId_ (id del modelo que deseamos probar, comenzando desde 1) y la _query_ (el mensaje del usuario).

Puede acceder al backend desplegado en Heroku en el siguiente [link](https://chatbot-acecom.herokuapp.com/docs).
