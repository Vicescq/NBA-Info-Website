from flask import Flask, render_template, jsonify, request
from home_functions import *

app = Flask(__name__)

@app.route("/homedata")
def home():
    data = package_home_data()
    if data["game_count"]:
        return data
    elif not data["game_count"]:
        return {"null": "No games Today!"}
    else:
        return {"API_err": "An error occured in the API"}

if __name__ == "__main__":
    app.run(debug=True) 



