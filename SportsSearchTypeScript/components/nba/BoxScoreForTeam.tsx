import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from "react-native"
import { NbaBoxScoresType } from "../../types/nba/boxScore"

interface BoxScoreForTeamParams {
    teamName: string,
    boxScoreData: NbaBoxScoresType[] | undefined
}

function BoxScoreForTeam({ teamName, boxScoreData }:BoxScoreForTeamParams) {
    function convertToPercent(value:string|undefined|null) {
        if (value) {
            const converted = Number(value) * 100
            return Math.round(converted).toString() + '%'
        } else {
            return 'No Value'
        }
    }

    function renderItem(item:NbaBoxScoresType) {
        const { PLAYER, MP, TRB, AST, BLK, TOV, STL, PTS } = item
        return (
            <View style={styles.subContainer}>
                <Text>Player: {PLAYER}</Text>
                <Text>Minutes Played: {MP}</Text>
                <Text>Points: {PTS}</Text>
                <Text>Free throw Percentage: {convertToPercent(item['FT%'])}</Text>
                <Text>Field Goal Percentage: {convertToPercent(item['FG%'])}</Text>
                <Text>Three Point Percentage: {convertToPercent(item['3P%'])}</Text>
                <Text>Total Rebounds: {TRB}</Text>
                <Text>Assists: {AST}</Text>
                <Text>Blocks: {BLK}</Text>
                <Text>Steals: {STL}</Text>
                <Text>Turnovers: {TOV}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.teamNameContainer}>
                <Text>{teamName}</Text>
            </View>
            
            <FlatList
                keyExtractor={(item, index) => 'key'+index}
                data={boxScoreData}
                renderItem={ ({item}:ListRenderItemInfo<NbaBoxScoresType>) => renderItem(item)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        margin: 10
    },
    subContainer: {
        borderBottomWidth: 2
    },
    teamNameContainer: {
        borderBottomWidth: 2
    }
})

export default BoxScoreForTeam