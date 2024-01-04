"""
Extremely similar functions compare to home_functions.py, just a few changes, majority involves the removal of for loops as we are on single game basis instead of processing multiple
"""
import requests, pytz
from static.python.home_functions import convert_PT_to_MT

def get_livegame(game_index):
    """
    Not to be confused with get_livegames in home_functions!
    """
    url = "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json"
    response = requests.get(url)
    response_json = response.json()
    game = response_json["scoreboard"]["games"][game_index]
    return game

def get_matchup(game):
    """
    Unlike the get_matchups() within home_functions, this one returns the FULL names of the teams
    """
    away_team1 = (game["awayTeam"]["teamCity"]).upper()
    away_team2 = (game["awayTeam"]["teamName"]).upper()
    home_team1 = (game["homeTeam"]["teamCity"]).upper()
    home_team2 = (game["homeTeam"]["teamName"]).upper()
    return away_team1, away_team2, home_team1, home_team2

def get_team_records(game):
    away_rec = str(game["awayTeam"]["wins"]) + "-" + str(game["awayTeam"]["losses"])
    home_rec = str(game["homeTeam"]["wins"]) + "-" + str(game["homeTeam"]["losses"])
    return away_rec, home_rec

def get_livescores(game):
    away_score = str(game["awayTeam"]["score"])
    home_score = str(game["homeTeam"]["score"])
    if (away_score == "0" and home_score == "0"):
        return ("", "")
    else:
        return away_score, home_score
    
def get_gamestatus(game):
    status_text = game["gameStatusText"].strip()
    if ((status_text == "Final") or (status_text == "Final/OT") or (status_text == "Final/OT2")):
        return "END"
    elif (status_text == "Half"):
        return "HALF"
    else: # when status is the game clock or starting date
        if (len(status_text.split()) == 3): # convert ET to MT
            status_text = convert_PT_to_MT(status_text)
        return status_text

def assign_logos(game):
    # modifying get_matchup requres me to add this small piece of code
    away_team = game["awayTeam"]["teamTricode"]
    home_team = game["homeTeam"]["teamTricode"]
    matchup = away_team, home_team

    away_logo = "..\\static\\images\\logos\\" + matchup[0] + ".svg"
    home_logo = "..\\static\\images\\logos\\" + matchup[1] + ".svg"
    return away_logo, home_logo

def package_boxscore_data(game_index):
    data = {}
    game = get_livegame(game_index)
    matchup = get_matchup(game)
    team_records = get_team_records(game)
    livescores = get_livescores(game)
    game_status = get_gamestatus(game)
    logos = assign_logos(game)

    data["matchup"] = matchup
    data["team_records"] = team_records
    data["livescores"] = livescores
    data["game_status"] = game_status
    data["logos"] = logos
    return data
