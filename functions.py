import requests

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
        scores.append((away_score, home_score))
    return scores

def get_gamestatus(games):
    status = []
    for game in games:
        if (game["gameStatusText"] == "Final"):
            status.append("END")
        else:
            status.append("TEMP") # change when more info arrives
    return status
        
def assign_logos(matchups):
    logos = []
    for matchup in matchups:
        away_logo = "..\\static\\images\\logos\\" + matchup[0] + ".svg"
        home_logo = "..\\static\\images\\logos\\" + matchup[1] + ".svg"
        logos.append((away_logo, home_logo))
    return logos


def gen_randnum():
    url = "https://csrng.net/csrng/csrng.php?min=1&max=100"
    response = requests.get(url)
    return response.json()[0]["random"]

