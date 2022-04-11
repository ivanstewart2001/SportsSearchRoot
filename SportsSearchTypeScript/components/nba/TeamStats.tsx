import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import { NbaTeamStatsReturnType } from '../../types/nba/teamStats'

interface TeamStatsrComponentParams {
    data: NbaTeamStatsReturnType[]
}

function TeamStats({data} : TeamStatsrComponentParams) {
    function convertToPercent(value:string|undefined) {
        if (value) {
            const converted = Number(value) * 100
            return Math.round(converted).toString() + '%'
        } else {
            return 'No Value'
        }
    }

    function renderItem(item:NbaTeamStatsReturnType) {
        const { G, MP, FG, FGA, FT, FTA, BLK, AST, STL, TOV, TRB, PTS, SEASON } = item
        return (
            <View style={styles.container}>
                <Text>Season: {SEASON || 'No Value'}</Text>
                <Text>Games Played: {G || 'No value'}</Text>
                <Text>Field Goals: {FG || 'No value'}</Text>
                <Text>Field Goals Attempted: {FGA || 'No value'}</Text>
                <Text>Field Goal Percentage: {item['FG%'] || 'No value'}</Text>
                <Text>Minutes Played: {MP || 'No value'}</Text>
                <Text>3 Points: {item['3P'] || 'No value'}</Text>
                <Text>3 Points Attempted: {item['3PA'] || 'No value'}</Text>
                <Text>3 Point Percentage: {item['3P%'] ? convertToPercent(item['3P%'].toString()) : 'No Value'}</Text>
                <Text>2 Points: {item['2P'] || 'No value'}</Text>
                <Text>2 Points Attempted: {item['2PA'] || 'No value'}</Text>
                <Text>2 Point Percentage: {item['2P%'] ? convertToPercent(item['2P%'].toString()) : 'No Value'}</Text>
                <Text>Free Throws: {FT || 'No value'}</Text>
                <Text>Free Throws Attempted: {FTA || 'No value'}</Text>
                <Text>Free Throw Percentage: {item['FT%'] ? convertToPercent(item['FT%'].toString()) : 'No Value'}</Text>
                <Text>Points: {PTS || 'No value'}</Text>
                <Text>Total Rebounds: {TRB || 'No value'}</Text>
                <Text>Assists: {AST || 'No value'}</Text>
                <Text>Steals: {STL || 'No value'}</Text>
                <Text>Blocks: {BLK || 'No value'}</Text>
                <Text>Turnovers: {TOV || 'No value'}</Text>
                <Text></Text>
            </View>
        )
    }

    return (
        <View style={styles.rootContainer}>
            <FlatList 
                keyExtractor={(item, index) => 'key'+index}
                data={data}
                renderItem={ ({item}:ListRenderItemInfo<NbaTeamStatsReturnType>) => renderItem(item)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    container: {
        borderWidth: 2,
        margin: 10
    }
})

export default TeamStats