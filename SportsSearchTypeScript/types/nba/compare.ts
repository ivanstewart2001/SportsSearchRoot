import { NbaPlayerStatsType } from "./playerStats"

export interface NbaCompareFullProps {
    player1: {
        stats: NbaPlayerStatsType[],
        headshot: string
    }|undefined,
    player2: {
        stats: NbaPlayerStatsType[],
        headshot: string
    }|undefined
}

export interface AllStatsType {
    SEASON?: number
    G?: number,
    GS?: number,
    MP?: number,
    FG?: number,
    FGA?: number,
    'FG%'?: number,
    '3P'?: number,
    '3PA'?: number,
    '3P%'?: number,
    '2P'?: number,
    '2PA'?: number,
    '2P%'?: number,
    FT?: number,
    FTA?: number,
    'FT%'?: number,
    ORB?: number,
    DRB?: number,
    TRB?: number,
    AST?: number,
    STL?: number,
    BLK?: number,
    TOV?: number,
    PTS?: number
}
