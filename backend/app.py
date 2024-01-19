from flask import Flask, render_template, jsonify, request
from home import *
from boxscore import *
import time

app = Flask(__name__)

@app.route("/homedata")
def home():
    data = package_home_data()
    return data

@app.route("/boxscore")
def boxscore():
    print({"test": 123})
    return {"test": 123}

@app.route("/gamecount")
def gamecount():
    games = get_livegames()
    gamecount = get_game_count(games)
    return str(gamecount)

if __name__ == "__main__":
    app.run(debug=True) 



