from flask import Flask
import os
from controlers import routes
app = Flask(__name__)
app.register_blueprint(routes.rotas)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host='127.0.0.1', port=port)
