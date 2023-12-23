from flask import Flask, render_template
from data import data


app = Flask(__name__)
app.register_blueprint(data)



if __name__ == "__main__":
    app.run(debug=True)