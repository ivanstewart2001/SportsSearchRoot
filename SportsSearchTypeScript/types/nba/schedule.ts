import { NBAScheduleForCurrentWeekResponseGames } from "../redux/nba";

export interface NbaScheduleComponentParams {
    gameDate: string|undefined,
    games: NBAScheduleForCurrentWeekResponseGames|undefined
}