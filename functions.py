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
    returns pairwise strings that are the away [0] and home [1]
    """
    matchups = []
    for game in games:
        away_team = game["awayTeam"]["teamCity"] + " " + game["awayTeam"]["teamName"]
        home_team = game["homeTeam"]["teamCity"] + " " + game["homeTeam"]["teamName"]
        curr_tuple = away_team, home_team
        matchups.append(curr_tuple)
    return matchups

