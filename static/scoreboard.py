from datetime import datetime
import requests, pytz

def get_livegames():
    url = "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json"
    response = requests.get(url)
    response_json = response.json()
    games = response_json["scoreboard"]["games"]
    return games

def get_game_count(games):
    return len(games)

def get_matchups(games):
    """
    returns list of pairwise strings that are the away [0] and home [1]
    """
    matchups = []
    for game in games:
        away_team = game["awayTeam"]["teamTricode"]
        home_team = game["homeTeam"]["teamTricode"] 
        matchups.append((away_team, home_team))
    return matchups

def get_team_records(games):
    """
    returns list of pairwise strings (eg. ("82-0", "0-82")) that are the away [0] and home [1]
    """
    records = []
    for game in games:
        away_rec = str(game["awayTeam"]["wins"]) + "-" + str(game["awayTeam"]["losses"])
        home_rec = str(game["homeTeam"]["wins"]) + "-" + str(game["homeTeam"]["losses"])
        records.append((away_rec, home_rec))
    return records

def get_livescores(games):
    scores = []
    for game in games:
        away_score = str(game["awayTeam"]["score"])
        home_score = str(game["homeTeam"]["score"])
        if (away_score == "0" and home_score == "0"):
            scores.append(("", ""))
        else:
            scores.append((away_score, home_score))
    return scores

def get_gamestatus(games):
    status = []
    for game in games:
        status_text = game["gameStatusText"].strip()
        if ((status_text == "Final") or (status_text == "Final/OT")):
            status.append("END")
        elif (status_text == "Half"):
            status.append("HALF")
        else: # when status is the game clock or starting date
            status.append(status_text)
    return status

def get_gamestatus_colour(game_status, game_count):
    gamestatus_colour = []
    for i in range(game_count):
        status_text = game_status[i]
        if (len(status_text.split()) == 3): # form of ["10:30", "pm", "ET"]
            gamestatus_colour.append("#22272b") # future game
        elif (status_text == "END"):
            gamestatus_colour.append("#590b0b") # finished game
        else:
            gamestatus_colour.append("#1e162f") # live game
    return gamestatus_colour

        
def assign_logos(matchups):
    logos = []
    for matchup in matchups:
        away_logo = "..\\static\\images\\logos\\" + matchup[0] + ".svg"
        home_logo = "..\\static\\images\\logos\\" + matchup[1] + ".svg"
        logos.append((away_logo, home_logo))
    return logos

def package_data():
    data = {}
    games = get_livegames()
    game_count = get_game_count(games)
    matchups = get_matchups(games)
    team_records = get_team_records(games)
    livescores = get_livescores(games)
    game_status = get_gamestatus(games)
    gamestatus_colour = get_gamestatus_colour(game_status, game_count)
    logos = assign_logos(matchups)

    data["game_count"] = game_count
    data["matchups"] = matchups
    data["team_records"] = team_records
    data["livescores"] = livescores
    data["game_status"] = game_status
    data["gamestatus_colour"] = gamestatus_colour
    data["game_count"] = game_count
    data["logos"] = logos
    return data

