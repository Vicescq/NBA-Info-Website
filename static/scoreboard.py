from datetime import datetime
import requests, pytz

def get_livegames():
    """
    requests JSON from NBA API, parses it and returns list of games
    """
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
    """
    returns list of pairwise string scores that are the away [0] and home [1]
    """
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
    """
    returns list of strings representing the status of game
    """
    status = []
    for game in games:
        status_text = game["gameStatusText"].strip()
        if ((status_text == "Final") or (status_text == "Final/OT")):
            status.append("END")
        elif (status_text == "Half"):
            status.append("HALF")
        else: # when status is the game clock or starting date
            if (len(status_text.split()) == 3): # convert ET to MT
                pass
            else:
                status.append(status_text)
    return status

def convert_PT_to_MT(pt_str):
    """
    converts PT time to MT time
    """
    pt_tz = pytz.timezone("US/Eastern")
    mt_tz = pytz.timezone("US/Mountain")
    
    pt_str = pt_str.split()[0] + " " + pt_str.split()[1]
    dt_pt = datetime.strptime(pt_str, "%I:%M %p")
    dt_pt = pt_tz.localize(dt_pt)
    
    # need to provide Y/M/D due to time offsets happening, stack overflow has a lot of cases where pytz "bugs out"
    dt_curr = datetime.now()
    dt_pt = datetime(dt_curr.year, dt_curr.month, dt_curr.day, dt_pt.hour, dt_pt.minute)
    dt_pt = pt_tz.localize(dt_pt)
    
    dt_mt = dt_pt.astimezone(mt_tz)
    mt_str = dt_mt.strftime("%I:%M") + " pm MT"
    mt_str = mt_str.strip("0")
    return mt_str

def get_gamestatus_colour(game_status, game_count):
    """
    returns list of hex color strings dependent on the status of game
    """
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
    """
    returns list of pairwise string paths to logos corresponding their respective matchup, away [0] home [1]
    """
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

