import { NbaRosterStatsType } from './../nba/rosterStats';
import { ArticlesReturnType } from '../nba/articles';
import { BoxScoreReturnType } from '../nba/boxScore';
import { NbaDraftClassType } from '../nba/draftClass';
import { NbaScheduleComponentParams } from '../nba/schedule';
import { TeamRosterReturnType } from '../nba/teamRoster';
import { NbaTeamStatsReturnType } from '../nba/teamStats';
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

export interface TeamRosterParams {
    team: string,
    year: string
}

export interface NbaTeamStatsParams {
    teamAbbreviation: string,
    year: string,
    dataFormat: string
}

export interface NbaRosterStatsParams {
    teamAbbreviation: string,
    year: string,
    dataFormat: string,
    playoffs: boolean
}

export interface EntireNbaInitialStateType {
    loading: boolean,
    data: {
        draftClass: NbaDraftClassType[],
        playerStats: NbaPlayerStatsType[],
        playerHeadshot: string,
        boxScore: {
            team1: BoxScoreReturnType[],
            team2: BoxScoreReturnType[]
        },
        schedule: NbaScheduleComponentParams[],
        compare: {
            player1: {
                stats: NbaPlayerStatsType[],
                headshot: string
            },
            player2: {
                stats: NbaPlayerStatsType[],
                headshot: string
            }
        },
        news: ArticlesReturnType[],
        favorites: FavoritesPlayersReturnType[],
        roster: TeamRosterReturnType[],
        teamStats: NbaTeamStatsReturnType[],
        rosterStats: NbaRosterStatsType[],
        error: string
    }
}