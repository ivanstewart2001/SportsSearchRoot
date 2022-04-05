import { FlatList, ListRenderItemInfo, ScrollView, StyleSheet, Text, View } from "react-native"
import { NbaScheduleComponentParams } from "../../types/nba/schedule"
import {  NBAScheduleForCurrentWeekResponse, NBAScheduleForCurrentWeekResponseGames } from "../../types/redux/nba"


function NbaSchedule({ gameDate, games }:NBAScheduleForCurrentWeekResponse) {
    if (games) {
        function renderItem(game:NBAScheduleForCurrentWeekResponseGames) {
            const {awayTeam, homeTeam, arenaName, gameStatusText, pointsLeaders} = game

            return (
                <View style={styles.container}> 
                    <Text>Home Team: {homeTeam.teamName} ({homeTeam.wins}-{homeTeam.losses})</Text>
                    <Text>Away Team: {awayTeam.teamName} ({awayTeam.wins}-{awayTeam.losses})</Text>
                    <Text>Arena: {arenaName}</Text>

                    { gameStatusText === 'Final' && (
                        <View>
                            <Text>Score: {homeTeam.teamName} {homeTeam.score} - {awayTeam.teamName} {awayTeam.score}</Text>
                            <Text>Point Leaders</Text>
                            {
                                pointsLeaders.map((pointLeader) => (
                                    <Text>Player: {pointLeader.firstName} {pointLeader.lastName}: {pointLeader.points} points</Text>
                                ))
                            }
                        </View>
                    )}
                </View>
            )
        }

        return (
            <View>
                <Text>Game Date{gameDate}</Text>
                <FlatList
                    keyExtractor={(item, index) => 'key'+index}
                    data={games}
                    renderItem={ ({item}:ListRenderItemInfo<NBAScheduleForCurrentWeekResponseGames>) => renderItem(item)}
                />
            </View>
        )
    }

    return (
        <View>
            <Text>No data avaliable</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        margin: 10
    }
})

export default NbaSchedule