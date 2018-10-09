from flask import render_template, Blueprint, request
import utils
from datetime import datetime
from flask import jsonify
from models import oscilacaoModel
rotas = Blueprint('rotas', __name__, static_folder="../static")
rotas.json_encoder = utils.CustomJSONEncoder


@rotas.route("/oscilacao", methods=['GET'])
def lista():
    resultado = oscilacaoModel.listaOscilacao()
    return(jsonify(resultado))
    # return("a")


@rotas.route("/oscilacao", methods=['POST'])
def cadastra():
    data = request.get_json(force=True)
    data['datahora'] = (datetime.now()).isoformat()
    print(data)
    try:
        resultado = oscilacaoModel.addOscilacao(data)
        # print(resultado)
        return jsonify(resultado)
    except Exception as e:
        print("erro"+str(e))
        return (str(e))

@rotas.route("/")
def index():
    return render_template("home.html.j2")

@rotas.route("/mapa")
def mapa():
    # resultado = oscilacaoModel.listaOscilacao()
    # resultado=resultado['resultado']
    return render_template("map.html.j2")
