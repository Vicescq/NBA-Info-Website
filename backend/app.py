from flask import Flask, render_template, jsonify, request
from home_functions import *

app = Flask(__name__)

@app.route("/homedata")
def home():
    data = package_home_data()
    #data["game_count"] = 0
    if data["game_count"]:
        return data
    elif not data["game_count"]:
        return {"null": "No games Today!"}

if __name__ == "__main__":
    app.run(debug=True) 



