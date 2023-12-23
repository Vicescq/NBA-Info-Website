import requests, pprint, json
from nba_api.live.nba.endpoints import scoreboard



def home():
    games = scoreboard.ScoreBoard().games.get_dict()
    print(get_matchups(games)[0])
    

def get_matchups(games):
    matchups = []
    for game in games:
        home_team = game["homeTeam"]["teamCity"] + " " + game["homeTeam"]["teamName"]
        away_team = game["awayTeam"]["teamCity"] + " " + game["awayTeam"]["teamName"]
        matchups.append(home_team + " vs " + away_team)
    return matchups


home()