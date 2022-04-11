from crypt import methods
from basketball_reference_scraper.drafts import get_draft_class
from basketball_reference_scraper.teams import get_roster, get_team_stats, get_roster_stats
from basketball_reference_scraper.players import get_stats, get_player_headshot
from basketball_reference_scraper.box_scores import get_box_scores
import numpy as np
import simplejson
from flask import Flask, request

app = Flask(__name__)

# Team Abbreviations
# ATLANTA HAWKS : ATL
# ST. LOUIS HAWKS : SLH
# MILWAUKEE HAWKS : MIL
# TRI-CITIES BLACKHAWKS : TCB
# BOSTON CELTICS : BOS
# BROOKLYN NETS : BRK
# NEW JERSEY NETS : NJN
# CHICAGO BULLS : CHI
# CHARLOTTE HORNETS (1988-2004): CHH
# CHARLOTTE HORNETS (2014-Present): CHO
# CHARLOTTE BOBCATS : CHA
# CLEVELAND CAVALIERS : CLE
# DALLAS MAVERICKS : DAL
# DENVER NUGGETS : DEN
# DETROIT PISTONS : DET
# FORT WAYNE PISTONS : FWP
# GOLDEN STATE WARRIORS : GSW
# SAN FRANCISCO WARRIORS : SFW
# PHILADELPHIA WARRIORS : PHI
# HOUSTON ROCKETS : HOU
# INDIANA PACERS : IND
# LOS ANGELES CLIPPERS : LAC
# SAN DIEGO CLIPPERS : SDC
# BUFFALO BRAVES : BUF
# LOS ANGELES LAKERS : LAL
# MINNEAPOLIS LAKERS : MIN
# MEMPHIS GRIZZLIES : MEM
# VANCOUVER GRIZZLIES : VAN
# MIAMI HEAT : MIA
# MILWAUKEE BUCKS : MIL
# MINNESOTA TIMBERWOLVES : MIN
# NEW ORLEANS PELICANS : NOP
# NEW ORLEANS/OKLAHOMA CITY HORNETS : NOK
# NEW ORLEANS HORNETS : NOH
# NEW YORK KNICKS : NYK
# OKLAHOMA CITY THUNDER : OKC
# SEATTLE SUPERSONICS : SEA
# ORLANDO MAGIC : ORL
# PHILADELPHIA 76ERS : PHI
# SYRACUSE NATIONALS : SYR
# PHOENIX SUNS : PHO
# PORTLAND TRAIL BLAZERS : POR
# SACRAMENTO KINGS : SAC
# KANSAS CITY KINGS : KCK
# KANSAS CITY-OMAHA KINGS : KCK
# CINCINNATI ROYALS : CIN
# ROCHESTER ROYALS : ROR
# SAN ANTONIO SPURS : SAS
# TORONTO RAPTORS : TOR
# UTAH JAZZ : UTA
# NEW ORLEANS JAZZ : NOJ
# WASHINGTON WIZARDS : WAS
# WASHINGTON BULLETS : WAS
# CAPITAL BULLETS : CAP
# BALTIMORE BULLETS : BAL
# CHICAGO ZEPHYRS : CHI
# CHICAGO PACKERS : CHI
# ANDERSON PACKERS : AND
# CHICAGO STAGS : CHI
# INDIANAPOLIS OLYMPIANS : IND
# SHEBOYGAN RED SKINS : SRS
# ST. LOUIS BOMBERS : SLB
# WASHINGTON CAPITOLS : WAS
# WATERLOO HAWKS : WAT
# SAN DIEGO ROCKETS : SDR

def np_encoder(object):
    if isinstance(object, np.generic):
        return object.item()
    elif object == np.nan:
        return 'null'

def formatDataframe(res):
    types = []
    for typeStr in res:
        types.append(typeStr)

    playerData = []
    for index in range(len(res)):
        individualPlayerData = {}

        for year in range(len(types)):
            try:
                currentType = types[year]
                value = res[currentType][index]

                individualPlayerData.update({
                    currentType: value
                })
            except:
                pass
        playerData.append(individualPlayerData)

    return simplejson.dumps(playerData, default=np_encoder, ignore_nan=True)

def formatSeries(res):
    types = []
    for typeStr in res.keys():
        types.append(typeStr)

    returnData = []
    for index in range(len(res)):
        try:
            key = types[index]
            value = res[index]
            returnData.append({key:value})
        except:
            pass
    return simplejson.dumps(returnData, default=np_encoder, ignore_nan=True)
        

# Functions
def getDraftClassHandler(year:int) -> list:
    # Gets all players in a draft class

    # Parameters
    # year - Desired draft year (e.g. 1989, 2020)

    res =  get_draft_class(year)
    return formatDataframe(res)

def getRosterHandler(teamAbbreviation:str, year:int) -> list:
    # Gets entire roster for a year

    # Parameters
    # team - NBA team abbreviation (e.g. 'GSW', 'SAS')
    # season_end_year - Desired end year (e.g. 1988, 2011)
    
    res = get_roster(teamAbbreviation, year)
    return formatDataframe(res)

def getTeamStatsHandler(teamAbbreviation:str, season:int, dataFormat:str) -> list:

    # Gets team stats

    # Parameters
    # team - NBA team abbreviation (e.g. 'GSW', 'SAS')
    # season_end_year - Desired end year (e.g. 1988, 2011)
    # data_format - One of 'TOTAL'|'PER_GAME'|'PER_POSS'. Default value is 'PER_GAME'

    res = get_team_stats(teamAbbreviation, season, dataFormat)
    return formatSeries(res)

def getRosterStatsHandler(teamAbbreviation:str, season:int, dataFormat:str, playoffs:bool) -> list:
    # Gets individual player data grouped by team and other filters

    # Parameters
    # team - NBA team abbreviation (e.g. 'GSW', 'SAS')
    # season_end_year - Desired end year (e.g. 1988, 2011)
    # data_format - One of 'TOTALS'|'PER_GAME'|'PER_MINUTE'|'PER_POSS'|'ADVANCED'. Default value is 'PER_GAME'
    # playoffs - Whether to return Playoff stats or not. One of True|False

    res = get_roster_stats(teamAbbreviation, season, dataFormat, playoffs)
    return formatDataframe(res)

def getPlayerStatsHandler(playerFullName:str, statType:str, playoffs:bool, career:bool) -> list:
    # Returns individual players stats

    # Parameters
    # name - Player full name (e.g. 'LaMarcus Aldridge')
    # stat_type - One of 'PER_GAME', 'PER_MINUTE', 'PER_POSS', 'ADVANCED'
    # playoffs - Whether to return Playoff stats or not. One of True|False. Default value is False
    # career - Whether to return career stats or not. One of True|False. Default value is False

    res = get_stats(playerFullName, statType, playoffs, career)
    return formatDataframe(res)

def getPlayerHeadshotHandler(playerName: str) -> str:
    # Gets player headshot

    # Parameters
    # name - Player full name (e.g. 'LaMarcus Aldridge')

    res = get_player_headshot(playerName)
    return simplejson.dumps(res)

def getBoxScoresHandler(date:str, team1:str, team2:str, period:str, statType:str) -> list:
    # Gets box score for given filters

    # Parameters
    # date - Desired date in a string format (e.g. '2020-01-06')
    # team1 - One of the team abbreviation (e.g. 'DEN', 'GSW')
    # team2 - Other team abbreviation (e.g. 'DEN', 'GSW')
    # period - Period for which to acquire stats. One of 'GAME'|'Q1'|'Q2'|'Q3'|'Q4'|'H1'|'H2'. Default value is 'GAME'
    # stat_type - Period for which to acquire stats. One of 'BASIC'|'ADVANCED'. Default value is 'BASIC'. Note that advanced stats are only available for period='GAME'.

    res = get_box_scores(date, team1, team2, period, statType)
    # res = get_box_scores('2022-04-02', 'ATL', 'BRK', 'GAME', 'BASIC')
    team1Data = formatDataframe(res[team1])
    team2Data = formatDataframe(res[team2])
    returnList = [team1Data, team2Data]
    print('\n\n\n', returnList)
    # print(res[team1], res[team2])
    # print(team1Data, '\n', team2Data)
    return simplejson.dumps(returnList)


# Flask Server Calls

@app.route('/getDraftClassHandler', methods=['POST'])
def getDraftClassHandlerServer():
    data = request.get_json()

    year = data['year']

    return getDraftClassHandler(year)

@app.route('/getRosterHandler', methods=['POST'])
def getRosterHandlerServer():
    data = request.get_json()

    teamAbbreviation = data['team']
    year = data['year']

    return getRosterHandler(teamAbbreviation, year)

@app.route('/getTeamStatsHandler', methods=['POST'])
def getTeamStatsHandlerServer():
    data = request.get_json()

    teamAbbreviation = data['teamAbbreviation']
    year = int(data['year'])
    dataFormat = data['dataFormat']

    return getTeamStatsHandler(teamAbbreviation, year, dataFormat)

@app.route('/getRosterStatsHandler', methods=['POST'])
def getRosterStatsHandlerServer():
    data = request.get_json()

    teamAbbreviation = data['teamAbbreviation']
    year = int(data['year'])
    dataFormat = data['dataFormat']
    playoffs = data['playoffs']

    return getRosterStatsHandler(teamAbbreviation, year, dataFormat, playoffs)

@app.route('/getPlayerStatsHandler', methods=['POST'])
def getPlayerStatsHandlerServer():
    data = request.get_json()

    playerFullName = data['playerFullName']
    statType = data['statType']
    playoffs = data['playoffs']
    career = data['career']

    print(getPlayerStatsHandler(playerFullName, statType, playoffs, career))
    return getPlayerStatsHandler(playerFullName, statType, playoffs, career)

@app.route('/getPlayerHeadshotHandler', methods=['POST'])
def getPlayerHeadshotHandlerServer():
    data = request.get_json()

    playerFullName = data['playerFullName']

    return getPlayerHeadshotHandler(playerFullName)


@app.route('/getBoxScoresHandler', methods=['POST'])
def getBoxScoresHandlerServer():
    data = request.get_json()

    date = data['date']
    team1 = data['team1']
    team2 = data['team2']
    period = data['period']
    statType = data['statType']

    return getBoxScoresHandler(date, team1, team2, period, statType)

if __name__ == "__main__":
    app.run(port=5000)

# # Handlers - DEPRECATED
# if functionName == 'getDraftClassHandler':
#     # year = int(args[2])
#     print('from python')
#     # print(getDraftClassHandler(year))

# if functionName == 'getRosterHandler':
#     teamAbbreviation = str(args[2])
#     year = int(args[3])
#     print(getRosterHandler(teamAbbreviation, year))

# if functionName == 'getTeamStatsHandler':
#     teamAbbreviation = str(args[2])
#     year =int(args[3])
#     dataFormat = str(args[4])
#     print(getTeamStatsHandler(teamAbbreviation, year, dataFormat))

# if functionName == 'getRosterStatsHandler':
#     teamAbbreviation = str(args[2])
#     year = int(args[3])
#     dataFormat = str(args[4])
#     playoffs = args[5]
#     print(getRosterStatsHandler(teamAbbreviation, year, dataFormat, playoffs))

# if functionName == 'getPlayerStatsHandler':
#     playerFullName = str(args[2])
#     statType = str(args[3])
#     playoffs = args[4]
#     career = args[5]
#     print(getPlayerStatsHandler(playerFullName, statType, playoffs, career))

# if functionName == 'getPlayerHeadshotHandler':
#     playerFullName = str(args[2])
#     print(getPlayerHeadshotHandler(playerFullName))

# if functionName == 'getBoxScoresHandler':
#     date = str(args[2])
#     team1 = str(args[3])
#     team2 = str(args[4])
#     period = str(args[5])
#     statType = str(args[6])
#     print(getBoxScoresHandler(date, team1, team2, period, statType))
