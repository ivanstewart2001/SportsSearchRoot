import { AllStatsType } from "../../types/nba/compare"
import { NbaPlayerStatsType } from "../../types/nba/playerStats"

function formatStats(player:NbaPlayerStatsType[]) {
    const playerAllStats:AllStatsType = {}

    for (const obj of player) {
        if (typeof obj.SEASON === typeof '') {
            const season = obj.SEASON ? Number(obj.SEASON.slice(0,2).trim()) : null
            const games = obj.G ? Number(obj.G) : null
            const gamesStarted = obj.GS ? Number(obj.GS) : null
            const minutesPlayed = obj.MP ? Number(obj.MP) : null
            const fieldGoals = obj.FG ? Number(obj.FG) : null
            const fieldGoalsAttempted = obj.FGA ? Number(obj.FGA) : null
            const fieldGoalPercentage = obj["FG%"] ? Number(obj["FG%"]) : null
            const threePoints = obj['3P'] ? Number(obj["3P"]) : null
            const threePointsAttempted = obj['3PA'] ? Number(obj["3PA"]) : null
            const threePointsPercentage = obj['3P%'] ? Number(obj["3P%"]) : null
            const twoPoints = obj['2P'] ? Number(obj["2P"]) : null
            const twoPointsAttempted = obj['2PA'] ? Number(obj["2PA"]) : null
            const twoPointsPercentage = obj['2P%'] ? Number(obj["2P%"]) : null
            const freeThrows = obj['FT'] ? Number(obj["FT"]) : null
            const freeThrowsAttempted = obj['FTA'] ? Number(obj["FTA"]) : null
            const freeThrowsPercentage = obj['FT%'] ? Number(obj["FT%"]) : null
            const offensiveRebounds = obj.ORB ? Number(obj.ORB) : null
            const defensiveRebounds = obj.DRB ? Number(obj.DRB) : null
            const totalRebounds = obj.TRB ? Number(obj.TRB) : null
            const assists = obj.AST ? Number(obj.AST) : null
            const steals = obj.STL ? Number(obj.STL) : null
            const blocks = obj.BLK ? Number(obj.BLK) : null
            const turnovers = obj.TOV ? Number(obj.TOV) : null
            const points = obj.PTS ? Number(obj.PTS) : null

            if (playerAllStats['SEASON'] && season) {
                playerAllStats['SEASON'] += season
            } else if (season) {
                playerAllStats['SEASON'] = season
            }

            if (playerAllStats['G'] && games) {
                playerAllStats['G'] += games
            } else if (games) {
                playerAllStats['G'] = games
            }

            if (playerAllStats['GS'] && gamesStarted) {
                playerAllStats['GS'] += gamesStarted
            } else if (gamesStarted) {
                playerAllStats['GS'] = gamesStarted
            }


            if (playerAllStats['MP'] && minutesPlayed) {
                playerAllStats['MP'] += minutesPlayed*(season?season:1)
            } else if (minutesPlayed) {
                playerAllStats['MP'] = minutesPlayed*(season?season:1)
                
            }

            if (playerAllStats['FG'] && fieldGoals) {
                playerAllStats['FG'] += fieldGoals*(season?season:1)
            } else if (fieldGoals) {
                playerAllStats['FG'] = fieldGoals*(season?season:1)
            }

            if (playerAllStats['FGA'] && fieldGoalsAttempted) {
                playerAllStats['FGA'] += fieldGoalsAttempted*(season?season:1)
            } else if (fieldGoalsAttempted) {
                playerAllStats['FGA'] = fieldGoalsAttempted*(season?season:1)
            }

            if (playerAllStats['FG%'] && fieldGoalPercentage) {
                playerAllStats['FG%'] += fieldGoalPercentage*(season?season:1)
            } else if (fieldGoalPercentage) {
                playerAllStats['FG%'] = fieldGoalPercentage*(season?season:1)
            }

            if (playerAllStats['3P'] && threePoints) {
                playerAllStats['3P'] += threePoints*(season?season:1)
            } else if (threePoints) {
                playerAllStats['3P'] = threePoints*(season?season:1)
            }

            if (playerAllStats['3PA'] && threePointsAttempted) {
                playerAllStats['3PA'] += threePointsAttempted*(season?season:1)
            } else if (threePointsAttempted) {
                playerAllStats['3PA'] = threePointsAttempted*(season?season:1)
            }

            if (playerAllStats['3P%'] && threePointsPercentage) {
                playerAllStats['3P%'] += threePointsPercentage*(season?season:1)
            } else if (threePointsPercentage) {
                playerAllStats['3P%'] = threePointsPercentage*(season?season:1)
            }

            if (playerAllStats['2P'] && twoPoints) {
                playerAllStats['2P'] += twoPoints*(season?season:1)
            } else if (twoPoints) {
                playerAllStats['2P'] = twoPoints*(season?season:1)
            }

            if (playerAllStats['2PA'] && twoPointsAttempted) {
                playerAllStats['2PA'] += twoPointsAttempted*(season?season:1)
            } else if (twoPointsAttempted) {
                playerAllStats['2PA'] = twoPointsAttempted*(season?season:1)
            }

            if (playerAllStats['2P%'] && twoPointsPercentage) {
                playerAllStats['2P%'] += twoPointsPercentage*(season?season:1)
            } else if (twoPointsPercentage) {
                playerAllStats['2P%'] = twoPointsPercentage*(season?season:1)
            }

            if (playerAllStats['FT'] && freeThrows) {
                playerAllStats['FT'] += freeThrows*(season?season:1)
            } else if (freeThrows) {
                playerAllStats['FT'] = freeThrows*(season?season:1)
            }

            if (playerAllStats['FTA'] && freeThrowsAttempted) {
                playerAllStats['FTA'] += freeThrowsAttempted*(season?season:1)
            } else if (freeThrowsAttempted) {
                playerAllStats['FTA'] = freeThrowsAttempted*(season?season:1)
            }

            if (playerAllStats['FT%'] && freeThrowsPercentage) {
                playerAllStats['FT%'] += freeThrowsPercentage*(season?season:1)
            } else if (freeThrowsPercentage) {
                playerAllStats['FT%'] = freeThrowsPercentage*(season?season:1)
            }

            if (playerAllStats['ORB'] && offensiveRebounds) {
                playerAllStats['ORB'] += offensiveRebounds*(season?season:1)
            } else if (offensiveRebounds) {
                playerAllStats['ORB'] = offensiveRebounds*(season?season:1)
            }

            if (playerAllStats['DRB'] && defensiveRebounds) {
                playerAllStats['DRB'] += defensiveRebounds*(season?season:1)
            } else if (defensiveRebounds) {
                playerAllStats['DRB'] = defensiveRebounds*(season?season:1)
            }

            if (playerAllStats['TRB'] && totalRebounds) {
                playerAllStats['TRB'] += totalRebounds*(season?season:1)
            } else if (totalRebounds) {
                playerAllStats['TRB'] = totalRebounds*(season?season:1)
            }

            if (playerAllStats['AST'] && assists) {
                playerAllStats['AST'] += assists*(season?season:1)
            } else if (assists) {
                playerAllStats['AST'] = assists*(season?season:1)
            }

            if (playerAllStats['STL'] && steals) {
                playerAllStats['STL'] += steals*(season?season:1)
            } else if (steals) {
                playerAllStats['STL'] = steals*(season?season:1)
            }

            if (playerAllStats['BLK'] && blocks) {
                playerAllStats['BLK'] += blocks*(season?season:1)
            } else if (blocks) {
                playerAllStats['BLK'] = blocks*(season?season:1)
            }

            if (playerAllStats['TOV'] && turnovers) {
                playerAllStats['TOV'] += turnovers*(season?season:1)
            } else if (turnovers) {
                playerAllStats['TOV'] = turnovers*(season?season:1)
            }

            if (playerAllStats['PTS'] && points) {
                playerAllStats['PTS'] += points*(season?season:1)
            } else if (points) {
                playerAllStats['PTS'] = points*(season?season:1)
            }
        }
    }

    const keysToDivide = [ 'MP', 'FG', 'FGA', 'FG%', '3P', '3PA', '3P%', '2P', '2PA', '2P%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PTS' ]
    for (const [key, value] of Object.entries(playerAllStats)) {
        if (keysToDivide.includes(key)) {
            (playerAllStats as any)[key] = value/(playerAllStats.SEASON ? playerAllStats.SEASON : 1)
        }
    }
    return playerAllStats
}

export default formatStats