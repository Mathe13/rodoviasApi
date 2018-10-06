from flask import render_template, Blueprint
import json
rotas = Blueprint('rotas', __name__, static_folder="../static")

# index


@rotas.route("/")
def index():
    return "hello world"


@rotas.route("/oscilacao", methods=['GET'])
def lista():
    return json.dumps({"a": "b"})


@rotas.route("/oscilacao", methods=['POST'])
def cadastra():
    return "falta implementar"
