import { FlatList, Image, ListRenderItemInfo, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { NbaPlayerStatsType } from '../../types/nba/playerStats'
import { TeamRosterReturnType } from '../../types/nba/teamRoster'

interface TeamRosterComponentParams {
    data: TeamRosterReturnType[]
}

function TeamRoster({data} : TeamRosterComponentParams) {
    function renderItem(item:TeamRosterReturnType) {
        const { 
            BIRTH_DATE, 
            COLLEGE, 
            EXPERIENCE, 
            HEIGHT, 
            NATIONALITY, 
            NUMBER, 
            PLAYER,
            POS, 
            WEIGHT
        } = item

        return (
            <View style={styles.container}>
                <Text>Player: {PLAYER || 'No value'}</Text>
                <Text>Team: {COLLEGE || 'No value'}</Text>
                <Text>Number: {NUMBER || 'No Value'}</Text>
                <Text>Games Played: {BIRTH_DATE || 'No value'}</Text>
                <Text>Experience: {`${EXPERIENCE === 'R' ? 'Rookie' : `${EXPERIENCE} seasons`}` || 'No value'}</Text>
                <Text>Height: {HEIGHT || 'No value'}</Text>
                <Text>Nationality: {NATIONALITY || 'No value'}</Text>
                <Text>Position: {POS || 'No value'}</Text>
                <Text>Weight: {`${WEIGHT} pounds`|| 'No value'}</Text>
            </View>
        )
    }

    return (
        <View style={styles.rootContainer}>
            <FlatList 
                keyExtractor={(item, index) => 'key'+index}
                data={data}
                renderItem={ ({item}:ListRenderItemInfo<TeamRosterReturnType>) => renderItem(item)}
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

export default TeamRoster