export interface NbaBoxScoresType {
    "PLAYER": string | null | undefined, 
    "MP": string | null | undefined, 
    "FG": string | null | undefined, 
    "FGA": string | null | undefined, 
    "FG%": string | null | undefined, 
    "3P": string | null | undefined, 
    "3PA": string | null | undefined,
    "3P%": string | null | undefined,
    "FT": string | null | undefined, 
    "FTA": string | null | undefined, 
    "FT%": string | null | undefined, 
    "ORB": string | null | undefined, 
    "DRB": string | null | undefined, 
    "TRB": string | null | undefined, 
    "AST": string | null | undefined, 
    "STL": string | null | undefined, 
    "BLK": string | null | undefined, 
    "TOV": string | null | undefined, 
    "PF": string | null | undefined, 
    "PTS": string | null | undefined, 
    "+/-": string | null | undefined
}

export interface BoxScoreReturnType {
    'team1': Array<NbaBoxScoresType>,
    'team2': Array<NbaBoxScoresType>
}
