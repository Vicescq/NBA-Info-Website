from flask import Flask, render_template, jsonify
from functions import *
import requests

app = Flask(__name__)





@app.route("/")
def home():
    games = get_livegames()
    game_count = get_game_count(games)
    matchups = get_matchups(games)
    return render_template("index.html", game_count=game_count, matchups=matchups)

@app.route("/update")
def update():
    data = gen_randnum()
    return jsonify(data)
    


if __name__ == "__main__":
    app.run()