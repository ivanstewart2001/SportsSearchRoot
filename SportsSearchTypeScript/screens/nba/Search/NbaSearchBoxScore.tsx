import { useEffect, useState } from "react"
import { Text, View, StyleSheet, Alert, Button, ScrollView } from "react-native"
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from "react-redux"
import { boxScoreHandler } from "../../../store/nba"
import { AppDispatch, RootState } from "../../../store/store"
import LoadingOverlay from "../../../components/UI/LoadingOverlay"
import { TextInput } from "react-native-gesture-handler"
import { NbaBoxScoreParams } from "../../../types/redux/nba"
import { BoxScoreReturnType } from "../../../types/nba/boxScore"
import BoxScoreForTeam from "../../../components/nba/BoxScoreForTeam"

function NbaSearchBoxScore() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, loading } = useSelector((state:RootState) => state.nba)
    const [boxScore, setBoxScore] = useState<BoxScoreReturnType>()
    const [submitted, setSubmitted] = useState(false)
    const [selectedTeam1, setSelectedTeam1] = useState('ATL')
    const [selectedTeam2, setSelectedTeam2] = useState('ATL')
    const [period, setPeriod] = useState('GAME')
    const [selectedDate, setSelectedDate] = useState('')
    const [team1Totals, setTeam1Totals] = useState()
    const [team2Totals, setTeam2Totals] = useState()


    function getPlayer() {
        setSubmitted(true)
        const playerStatsParams:NbaBoxScoreParams = {
            team1: selectedTeam1,
            team2: selectedTeam2,
            statType: 'BASIC',
            date: selectedDate,
            period
        }

        dispatch(boxScoreHandler(playerStatsParams))
        return
    }

    useEffect(() => {
        setBoxScore(data.boxScore)
    }, [loading])

    if (loading) {
        return <LoadingOverlay />
    }

    if (!submitted) {
        return (
            <ScrollView style={styles.container}>
                <TextInput
                    value={selectedDate}
                    onChangeText={setSelectedDate}
                    placeholder="Date in format: YYYY-MM-DD"
                    maxLength={10}
                    style={styles.textInput}
                />

                <Text>Team 1</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedTeam1}
                    onValueChange={(itemValue, itemIndex) => setSelectedTeam1(itemValue)}
                >
                    <Picker.Item label='ATLANTA HAWKS' value='ATL' />
                    <Picker.Item label='ST. LOUIS HAWKS' value='SLH' />
                    <Picker.Item label='BOSTON CELTICS' value='BOS' />
                    <Picker.Item label='BROOKLYN NETS' value='BRK' />
                    <Picker.Item label='NEW JERSEY NETS' value='NJN' />
                    <Picker.Item label='CHICAGO BULLS' value='CHI' />
                    <Picker.Item label='CHARLOTTE HORNETS (1988-2004)' value='CHH' />
                    <Picker.Item label='CHARLOTTE HORNETS (2014-Present)' value='CHO' />
                    <Picker.Item label='CHARLOTTE BOBCATS' value='CHA' />
                    <Picker.Item label='CLEVELAND CAVALIERS' value='CLE' />
                    <Picker.Item label='DALLAS MAVERICKS' value='DAL' />
                    <Picker.Item label='DENVER NUGGETS' value='DEN' />
                    <Picker.Item label='DETROIT PISTONS' value='DET' />
                    <Picker.Item label='GOLDEN STATE WARRIORS' value='GSW' />
                    <Picker.Item label='SAN FRANCISCO WARRIORS' value='SFW' />
                    <Picker.Item label='PHILADELPHIA WARRIORS' value='PHI' />
                    <Picker.Item label='HOUSTON ROCKETS' value='HOU' />
                    <Picker.Item label='INDIANA PACERS' value='IND' />
                    <Picker.Item label='LOS ANGELES CLIPPERS' value='LAC' />
                    <Picker.Item label='SAN DIEGO CLIPPERS' value='SDC' />
                    <Picker.Item label='LOS ANGELES LAKERS' value='LAL' />
                    <Picker.Item label='MEMPHIS GRIZZLIES' value='MEM' />
                    <Picker.Item label='VANCOUVER GRIZZLIES' value='VAN' />
                    <Picker.Item label='MIAMI HEAT' value='MIA' />
                    <Picker.Item label='MILWAUKEE BUCKS' value='MIL' />
                    <Picker.Item label='MINNESOTA TIMBERWOLVES' value='MIN' />
                    <Picker.Item label='NEW ORLEANS PELICANS' value='NOP' />
                    <Picker.Item label='NEW YORK KNICKS' value='NYK' />
                    <Picker.Item label='OKLAHOMA CITY THUNDER' value='OKC' />
                    <Picker.Item label='SEATTLE SUPERSONICS' value='SEA' />
                    <Picker.Item label='ORLANDO MAGIC' value='ORL' />
                    <Picker.Item label='PHILADELPHIA 76ERS' value='PHI' />
                    <Picker.Item label='PHOENIX SUNS' value='PHO' />
                    <Picker.Item label='PORTLAND TRAIL BLAZERS' value='POR' />
                    <Picker.Item label='SACRAMENTO KINGS' value='SAC' />
                    <Picker.Item label='SAN ANTONIO SPURS' value='SAS' />
                    <Picker.Item label='TORONTO RAPTORS' value='TOR' />
                    <Picker.Item label='UTAH JAZZ' value='UTA' />
                    <Picker.Item label='WASHINGTON WIZARDS' value='WAS' />
                </Picker>

                <Text>Team 2</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedTeam2}
                    onValueChange={(itemValue, itemIndex) => setSelectedTeam2(itemValue)}
                >
                    <Picker.Item label='ATLANTA HAWKS' value='ATL' />
                    <Picker.Item label='ST. LOUIS HAWKS' value='SLH' />
                    <Picker.Item label='BOSTON CELTICS' value='BOS' />
                    <Picker.Item label='BROOKLYN NETS' value='BRK' />
                    <Picker.Item label='NEW JERSEY NETS' value='NJN' />
                    <Picker.Item label='CHICAGO BULLS' value='CHI' />
                    <Picker.Item label='CHARLOTTE HORNETS (1988-2004)' value='CHH' />
                    <Picker.Item label='CHARLOTTE HORNETS (2014-Present)' value='CHO' />
                    <Picker.Item label='CHARLOTTE BOBCATS' value='CHA' />
                    <Picker.Item label='CLEVELAND CAVALIERS' value='CLE' />
                    <Picker.Item label='DALLAS MAVERICKS' value='DAL' />
                    <Picker.Item label='DENVER NUGGETS' value='DEN' />
                    <Picker.Item label='DETROIT PISTONS' value='DET' />
                    <Picker.Item label='GOLDEN STATE WARRIORS' value='GSW' />
                    <Picker.Item label='SAN FRANCISCO WARRIORS' value='SFW' />
                    <Picker.Item label='PHILADELPHIA WARRIORS' value='PHI' />
                    <Picker.Item label='HOUSTON ROCKETS' value='HOU' />
                    <Picker.Item label='INDIANA PACERS' value='IND' />
                    <Picker.Item label='LOS ANGELES CLIPPERS' value='LAC' />
                    <Picker.Item label='SAN DIEGO CLIPPERS' value='SDC' />
                    <Picker.Item label='LOS ANGELES LAKERS' value='LAL' />
                    <Picker.Item label='MEMPHIS GRIZZLIES' value='MEM' />
                    <Picker.Item label='VANCOUVER GRIZZLIES' value='VAN' />
                    <Picker.Item label='MIAMI HEAT' value='MIA' />
                    <Picker.Item label='MILWAUKEE BUCKS' value='MIL' />
                    <Picker.Item label='MINNESOTA TIMBERWOLVES' value='MIN' />
                    <Picker.Item label='NEW ORLEANS PELICANS' value='NOP' />
                    <Picker.Item label='NEW YORK KNICKS' value='NYK' />
                    <Picker.Item label='OKLAHOMA CITY THUNDER' value='OKC' />
                    <Picker.Item label='SEATTLE SUPERSONICS' value='SEA' />
                    <Picker.Item label='ORLANDO MAGIC' value='ORL' />
                    <Picker.Item label='PHILADELPHIA 76ERS' value='PHI' />
                    <Picker.Item label='PHOENIX SUNS' value='PHO' />
                    <Picker.Item label='PORTLAND TRAIL BLAZERS' value='POR' />
                    <Picker.Item label='SACRAMENTO KINGS' value='SAC' />
                    <Picker.Item label='SAN ANTONIO SPURS' value='SAS' />
                    <Picker.Item label='TORONTO RAPTORS' value='TOR' />
                    <Picker.Item label='UTAH JAZZ' value='UTA' />
                    <Picker.Item label='WASHINGTON WIZARDS' value='WAS' />
                </Picker>

                <Text>Period</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={period}
                    onValueChange={(itemValue, itemIndex) => setPeriod(itemValue)}
                >
                    <Picker.Item label='Game' value='GAME' />
                    <Picker.Item label='First Quarter' value='Q1' />
                    <Picker.Item label='Second Quarter' value='Q2' />
                    <Picker.Item label='Third Quarter' value='Q3' />
                    <Picker.Item label='Forth Quarter' value='Q4' />
                    <Picker.Item label='First Half' value='H1' />
                    <Picker.Item label='Second Half' value='H2' />
                </Picker>

                <Button title="Search" onPress={getPlayer} />
            </ScrollView>
        )
    }

    if (boxScore?.team1.length === 0 && submitted && !loading) {
        return (
            <View style={styles.container}>
                <Text>Sorry! Could not find draft class for given year. Please try a different year.</Text>
                <Button title='Reset' onPress={() => {
                    setSelectedDate('')
                    setSubmitted(false)
                }}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Button title='Reset' onPress={() => {
                    setSelectedDate('')
                    setSubmitted(false)
            }}/>
            <Text>{selectedTeam1}: {boxScore?.team1[13].PTS} - {selectedTeam2}: {boxScore?.team2[13].PTS}</Text>
            <BoxScoreForTeam teamName={selectedTeam1} boxScoreData={boxScore?.team1} />
            <BoxScoreForTeam teamName={selectedTeam2} boxScoreData={boxScore?.team2} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    renderItemContainer: {
        margin: 5
    },
    playerText: {
        fontSize: 18
    },
    input: {
        borderWidth: 2,
        height: 50,
        width: 400,
        padding: 10
    },
    picker: {
        width: 400,
        height: 200,
        borderWidth: 2,
        marginVertical: 5,
        padding: 5
    },
    textInput: {
        borderWidth: 2,
        margin: 10,
        height: 30
    }
})

export default NbaSearchBoxScore