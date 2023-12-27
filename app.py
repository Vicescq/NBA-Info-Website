from flask import Flask, render_template, jsonify
from static.scoreboard import *
import requests

app = Flask(__name__)

@app.route("/")
def home():
    data = package_data()
    return render_template("home.html", **data, data=data)

@app.route("/update_home")
def update_home():
    data = package_data()
    return jsonify(data)
    
if __name__ == "__main__":
    app.run(debug=True)