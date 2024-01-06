from flask import Flask, render_template, jsonify, request
from static.python.home_functions import *
from static.python.boxscore_functions import *

app = Flask(__name__)

@app.route("/")
def home():
    data = package_home_data()
    if data["game_count"]:
        return render_template("home.html", **data, data=data)
    elif not data["game_count"]:
        return render_template("base.html", no_games=1)
    else:
        print("API Error!")

@app.route("/update_home")
def update_home():
    data = package_home_data()
    return jsonify(data)

@app.route("/boxscore")
def boxscore():
    args = request.args
    match_id = args.get("match_id")
    game_index = int(match_id.split("_")[2])
    data = package_boxscore_data(game_index)
    return render_template("boxscore.html", **data)



if __name__ == "__main__":
    app.run(debug=True) 



