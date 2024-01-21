from home import *
from dateutil.parser import isoparse

def package_boxscoredata(mindex):
    data = {}
    data["error"] = "SUCCESS"
    try:
        games = get_livegames()
        gameids = get_gameids(games)
        gameid_target = gameids[mindex]

        boxscore_json = get_boxscoredata(gameid_target)
        players = get_players(boxscore_json)
        data["awayplayers"] = players[0]
        data["homeplayers"] = players[1]
    except:
        data["error"] = "GAME HAS NOT STARTED"

    
    return data

def get_boxscoredata(gameid_target):
    endpoint = "https://cdn.nba.com/static/json/liveData/boxscore/boxscore_" + str(gameid_target) + ".json"
    response = requests.get(endpoint)
    response_json = response.json()
    return response_json
    
def get_players(boxscore_json):
    away_player_list = boxscore_json["game"]["awayTeam"]["players"]
    home_player_list = boxscore_json["game"]["homeTeam"]["players"]
    trimmed_apl = []
    trimmed_hpl = []

    for aplayer, hplayer in zip(away_player_list, home_player_list) :
        t_aplayer = {}
        t_hplayer = {}

        t_aplayer["name"] = aplayer["name"]
        t_hplayer["name"] = hplayer["name"]

        t_aplayer["jerseynum"] = aplayer["jerseyNum"]
        t_hplayer["jerseynum"] = hplayer["jerseyNum"]

        t_aplayer["oncourt"] = aplayer["oncourt"]
        t_hplayer["oncourt"] = hplayer["oncourt"]

        t_aplayer["id"] = aplayer["personId"]
        t_hplayer["id"] = hplayer["personId"]

        t_aplayer["played"] = aplayer["played"]
        t_hplayer["played"] = hplayer["played"]

        # sometimes, players do not have a listed position
        t_aplayer["position"] = aplayer.get("position", "No pref")
        t_hplayer["position"] = hplayer.get("position", "No pref")

        t_aplayer["starter"] = aplayer["starter"]
        t_hplayer["starter"] = hplayer["starter"]

        t_aplayer["statistics"] = format_statistics(aplayer["statistics"])
        t_hplayer["statistics"] = format_statistics(hplayer["statistics"])
         
        trimmed_apl.append(t_aplayer)
        trimmed_hpl.append(t_hplayer)

    trimmed_apl = sorted(trimmed_apl, key=lambda x: x["starter"], reverse=True)
    trimmed_hpl = sorted(trimmed_hpl, key=lambda x: x["starter"], reverse=True)

    return trimmed_apl, trimmed_hpl

def format_statistics(stats):
    """
    Properly formats the statistics in order for better display on website
    """
    stats["fieldGoalsPercentage"] = round(stats["fieldGoalsPercentage"], 2)
    stats["freeThrowsPercentage"] = round(stats["freeThrowsPercentage"], 2)
    stats["threePointersPercentage"] = round(stats["threePointersPercentage"], 2)

    time_str = stats["minutes"]
    min = time_str.split("M")[0][-2:]
    sec = time_str.split("M")[1].split(".")[0]
    stats["minutes"] = f"{min}:{sec}"

    # a = isoparse(iso_time)
    # minutes = a.total_seconds() // 60
    # seconds = a.total_seconds() % 60
    # stats["minutes"] = f"{minutes}:{seconds}"


    return stats


def get_teams():
    pass