export interface NflTeamWinsParams {
    year: number
}

export interface NflTeamWinsReturnType {
    name: string,
    wins: number,
    losses: number,
    winRatePercentage: number
}