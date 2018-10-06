from flask import Flask
from controlers import routes
app = Flask(__name__)
app.register_blueprint(routes.rotas)

app.run(host="127.0.0.1", debug=True)
