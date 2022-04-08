import { NbaPlayerStatsType } from './../nba/playerStats';
export interface NbaDraftParams {
    year: string
}

export interface NbaPlayerStatsParams {
    playerFullName: string,
    statType: string,
    playoffs: boolean,
    career: boolean
}

export interface NbaComparePlayerParams {
    player1:  NbaPlayerStatsParams,
    player2: NbaPlayerStatsParams
}

export interface NbaCompareHeadshotParams {
    player1:  NbaPlayerHeadshotParams,
    player2: NbaPlayerHeadshotParams
}

export interface NbaPlayerHeadshotParams {
    playerFullName: string
}

export interface NbaBoxScoreParams {
    date: string,
    team1: string, 
    team2: string,
    period: string
    statType: 'BASIC'|'ADVANCED'
}

export interface NbaScheduleParams {
    team?: string,
    date?: string
}

export interface NBAScheduleForCurrentWeekResponse {
    gameDate: string,
    games: Array<NBAScheduleForCurrentWeekResponseGames>
}

export interface NBAScheduleForCurrentWeekResponseGames {
    gameId: string,
    gameCode: string,
    gameStatus: number,
    gameStatusText: string,
    gameSequence: number,
    gameDateEst: string,
    gameTimeEst: string,
    gameDateTimeEst: string,
    gameDateUTC: string,
    gameTimeUTC: string,
    gameDateTimeUTC: string,
    awayTeamTime: string,
    homeTeamTime: string,
    day: string,
    monthNum: number,
    weekNumber: number,
    weekName: string,
    ifNecessary: boolean,
    seriesGameNumber: string,
    seriesText: string,
    arenaName: string,
    arenaState: string,
    arenaCity: string,
    postponedStatus: string,
    broadcasters: {
      nationalTvBroadcasters: [],
      nationalRadioBroadcasters: [],
      homeTvBroadcasters: [],
      homeRadioBroadcasters: [],
      awayTvBroadcasters: [],
      awayRadioBroadcasters: [],
      intlRadioBroadcasters: [],
      intlTvBroadcasters: []
    },
    homeTeam: {
      teamId: number,
      teamName: string,
      teamCity: string,
      teamTricode: string,
      teamSlug: string,
      wins: number,
      losses: number,
      score: number,
      seed: number
    },
    awayTeam: {
      teamId: number,
      teamName: string,
      teamCity: string,
      teamTricode: string,
      teamSlug: string,
      wins: number,
      losses: number,
      score: number,
      seed: number
    },
    pointsLeaders: Array<NBAScheduleForCurrentWeekResponsePointsLeaders>    
}

export interface NBAScheduleForCurrentWeekResponsePointsLeaders {
    personId: number,
    firstName: string,
    lastName: string,
    teamId: number,
    teamCity: string,
    teamName: string,
    teamTricode: string,
    points: number 
}

export interface SavePlayerToFavoritesParams {
    playerHeadshot: string|undefined,
    playerStats: NbaPlayerStatsType[]|undefined,
    playerName: string
}

export interface RemovePlayerFromFavoritesParams {
    id: string
}

export interface FavoritesPlayersReturnType {
    id: string|null,
    playerHeadshot: string|undefined,
    playerStats: NbaPlayerStatsType[]|undefined,
    playerName: string
}

export interface EntireNbaInitialStateType {
    loading: boolean,
    data: {
        draftClass: [],
        playerStats: [],
        playerHeadshot: string,
        boxScore: {
            team1: [],
            team2: []
        },
        schedule: [],
        compare: {
            player1: {
                stats: [],
                headshot: string
            },
            player2: {
                stats: [],
                headshot: string
            }
        },
        news: [],
        favorites: FavoritesPlayersReturnType[]
        error: string
    }
}