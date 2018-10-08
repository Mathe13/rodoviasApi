from flask import render_template, Blueprint, request
import utils
from datetime import datetime
from flask import jsonify
from models import oscilacaoModel
rotas = Blueprint('rotas', __name__, static_folder="../static")
rotas.json_encoder = utils.CustomJSONEncoder
# index


@rotas.route("/")
def index():
    return "hello world"


@rotas.route("/oscilacao", methods=['GET'])
def lista():
    resultado = oscilacaoModel.listaOscilacao()
    return(jsonify(resultado))
    # return("a")


@rotas.route("/oscilacao", methods=['POST'])
def cadastra():
    data = {
        "x": request.form.get("x"),
        "y": request.form.get("y"),
        "z": request.form.get("z"),
        "lat": request.form.get("lat"),
        "lng": request.form.get("lng"),
        "datahora": (datetime.now()).isoformat()
    }
    try:
        resultado = oscilacaoModel.addOscilacao(data)
        return jsonify(resultado)
    except Exception as e:
        print("erro", e)
        return e
