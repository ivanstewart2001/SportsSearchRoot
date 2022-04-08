import { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NbaSearchPlayerModalProp } from '../../../../types/screens/names'

function NbaPlayerSearchModal({ route, navigation }:NbaSearchPlayerModalProp) {
    const { 
        PLAYER, COLLEGE, 
        PICK, YEARS, 
        TEAM, 
        PER_GAME_AST, 
        PER_GAME_PTS,
        PER_GAME_MP,
        PER_GAME_TRB,
        TOTALS_AST,
        TOTALS_G,
        TOTALS_PTS,
        TOTALS_MP,
        TOTALS_TRB
    } = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            title: PLAYER
        })
    }, [])

    function convertToPercent(value:string|undefined) {
        if (value) {
            const converted = Number(value) * 100
            return Math.round(converted).toString() + '%'
        } else {
            return 'No Value'
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.header}>Overview</Text>
                <Text>College: {COLLEGE || 'No Value'}</Text>
                <Text>Pick Number: {PICK || 'No Value'}</Text>
                <Text>Team: {TEAM || 'No Value'}</Text>
                <Text>Years: {YEARS || 'No Value'}</Text>
            </View>
            
            <View style={styles.contentContainer}>
                <Text style={styles.header}>Career Per Game Stats</Text>
                <Text>Assists: {PER_GAME_AST || 'No Value'}</Text>
                <Text>Minutes Played: {PER_GAME_MP || 'No Value'}</Text>
                <Text>Points: {PER_GAME_PTS || 'No Value'}</Text>
                <Text>Total Rebounds: {PER_GAME_TRB || 'No Value'}</Text>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.header}>Career Total Stats</Text>
                <Text>Assists: {TOTALS_AST || 'No Value'}</Text>
                <Text>Games: {TOTALS_G || 'No Value'}</Text>
                <Text>Minites: {TOTALS_MP || 'No Value'}</Text>
                <Text>Points: {TOTALS_PTS || 'No Value'}</Text>
                <Text>Rebounds: {TOTALS_TRB || 'No Value'}</Text>
                <Text>Three-Point: {convertToPercent(route.params['SHOOTING_3P%'])}</Text>
                <Text>Field Goal: {convertToPercent(route.params['SHOOTING_FG%'])}</Text>
                <Text>Free Throw: {convertToPercent(route.params['SHOOTING_FT%'])}</Text>
            </View>            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        fontWeight: 'bold',
        fontSize: 24
    },
    contentContainer: {
        alignItems: 'center',
        margin: 10
    }
})

export default NbaPlayerSearchModal