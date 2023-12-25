from flask import Flask, render_template, jsonify
from functions import *
import requests

app = Flask(__name__)





@app.route("/")
def home():
    games = get_livegames()
    game_count = get_game_count(games)
    matchups = get_matchups(games)
    team_records = get_team_records(games)
    livescores = get_livescores(games)
    game_status = get_gamestatus(games)
    logos = assign_logos(matchups)
    return render_template("index.html", game_count=game_count, matchups=matchups, team_records=team_records, livescores=livescores, game_status=game_status, logos=logos)

@app.route("/update")
def update():
    data = gen_randnum()
    return jsonify(data)
    


if __name__ == "__main__":
    app.run(debug=True)