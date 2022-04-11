import { NbaTeamStatsReturnType } from "../../types/nba/teamStats";

export function convertTeamStats(data:any) {
    const returnData:NbaTeamStatsReturnType = {
        G: undefined,
        GS: undefined,
        MP: undefined,
        FG: undefined,
        FGA: undefined,
        'FG%': undefined,
        '3P': undefined,
        '3PA': undefined,
        '3P%': undefined,
        '2P': undefined,
        '2PA': undefined,
        '2P%': undefined,
        'eFG%': undefined,
        FT: undefined,
        FTA: undefined,
        'FT%': undefined,
        ORB: undefined,
        DRB: undefined,
        TRB: undefined,
        AST: undefined,
        STL: undefined,
        BLK: undefined,
        TOV: undefined,
        PF: undefined,
        PTS: undefined,
        SEASON: '',
        TEAM: ''
    }

    for (const item of data) {
        const currentItemKey = Object.keys(item)[0]
        const currentItemValue = Number(Object.values(item)[0])

        console.log(item, currentItemKey, currentItemValue)

        if (currentItemKey === 'G') {
            returnData['G'] = currentItemValue
        } else if (currentItemKey === 'GS') {
            returnData['GS'] = currentItemValue
        } else if (currentItemKey === 'MP') {
            returnData['MP'] = currentItemValue
        } else if (currentItemKey === 'FG') {
            returnData['FG'] = currentItemValue
        } else if (currentItemKey === 'FGA') {
            returnData['FGA'] = currentItemValue
        } else if (currentItemKey === 'FG%') {
            returnData['FG%'] = currentItemValue
        } else if (currentItemKey === '3P') {
            returnData['3P'] = currentItemValue
        } else if (currentItemKey === '3PA') {
            returnData['3PA'] = currentItemValue
        } else if (currentItemKey === '3P%') {
            returnData['3P%'] = currentItemValue
        } else if (currentItemKey === '2P') {
            returnData['2P'] = currentItemValue
        } else if (currentItemKey === '2PA') {
            returnData['2PA'] = currentItemValue
        } else if (currentItemKey === '2P%') {
            returnData['2P%'] = currentItemValue
        } else if (currentItemKey === 'FT') {
            returnData['FT'] = currentItemValue
        } else if (currentItemKey === 'FTA') {
            returnData['FTA'] = currentItemValue
        } else if (currentItemKey === 'FT%') {
            returnData['FT%'] = currentItemValue
        } else if (currentItemKey === 'ORB') {
            returnData['ORB'] = currentItemValue
        } else if (currentItemKey === 'DRB') {
            returnData['DRB'] = currentItemValue
        } else if (currentItemKey === 'TRB') {
            returnData['TRB'] = currentItemValue
        } else if (currentItemKey === 'AST') {
            returnData['AST'] = currentItemValue
        } else if (currentItemKey === 'STL') {
            returnData['STL'] = currentItemValue
        } else if (currentItemKey === 'BLK') {
            returnData['BLK'] = currentItemValue
        } else if (currentItemKey === 'TOV') {
            returnData['TOV'] = currentItemValue
        } else if (currentItemKey === 'PTS') {
            returnData['PTS'] = currentItemValue
        } else if (currentItemKey === 'TEAM') {
            returnData['TEAM'] = (Object.values(item)[0] as string)
        } else if (currentItemKey === 'SEASON') {
            returnData['SEASON'] = (Object.values(item)[0] as string)
        }
    }

    return [returnData]
}