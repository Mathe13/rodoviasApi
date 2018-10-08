from flask import Flask
import os
from controlers import routes
app = Flask(__name__)
app.register_blueprint(routes.rotas)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
