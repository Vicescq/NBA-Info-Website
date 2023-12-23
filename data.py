import requests, pprint, json
from flask import Blueprint, render_template
from nba_api.live.nba.endpoints import scoreboard

data = Blueprint("data", __name__, static_folder="static", template_folder="templates")

@data.route("/")
def home():
    games = scoreboard.ScoreBoard().games.get_dict()
    for index, game in enumerate(games):
        pass
    game_count = index + 1
    return render_template("index.html", game_count=game_count)

