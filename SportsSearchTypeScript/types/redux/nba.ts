export interface NbaDraftParams {
    year: string
}

export interface NbaPlayerStatsParams {
    playerFullName: string,
    statType: string,
    playoffs: boolean,
    career: boolean
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