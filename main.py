from flask import Flask
# from flask_cors import CORS

import os

from controlers import routes
app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(routes.rotas)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
