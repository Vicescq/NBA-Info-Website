from flask import Flask, render_template
from nba_api.live.nba.endpoints import scoreboard
from functions import *

app = Flask(__name__)

@app.route("/")
def home():
    games = scoreboard.ScoreBoard().games.get_dict()
    game_count = get_game_count(games)
    matchups = get_matchups(games)
    return render_template("index.html", game_count=game_count, matchups=matchups)

if __name__ == "__main__":
    app.run(debug=True)