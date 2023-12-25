from flask import Flask, render_template, jsonify
from static.scoreboard import *
import requests

app = Flask(__name__)

@app.route("/")
def home():
    data = package_data()
    return render_template("index.html", **data)

@app.route("/update")
def update():
    data = package_data()
    return jsonify(data)
    
if __name__ == "__main__":
    app.run(debug=True)