def get_game_count(games):
    for index, game in enumerate(games):
        pass
    game_count = index + 1
    return game_count

def get_matchups(games):
    matchups = []
    for game in games:
        away_team = game["awayTeam"]["teamCity"] + " " + game["awayTeam"]["teamName"]
        home_team = game["homeTeam"]["teamCity"] + " " + game["homeTeam"]["teamName"]
        curr_tuple = away_team, home_team
        matchups.append(curr_tuple)
    
    return matchups

