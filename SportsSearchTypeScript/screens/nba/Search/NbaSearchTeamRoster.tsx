import { useEffect, useState } from "react"
import { Text, View, StyleSheet, Alert, Button, ScrollView } from "react-native"
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from "react-redux"
import { teamRosterHandler } from "../../../store/nba"
import { AppDispatch, RootState } from "../../../store/store"
import LoadingOverlay from "../../../components/UI/LoadingOverlay"
import { TextInput } from "react-native-gesture-handler"
import { TeamRosterParams } from "../../../types/redux/nba"
import { NbaPlayerStatsType } from "../../../types/nba/playerStats"
import PlayerStats from "../../../components/nba/PlayerStats"
import TeamRoster from "../../../components/nba/TeamRoster"

function NbaSearchTeamRoster() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, loading } = useSelector((state:RootState) => state.nba)
    const [year, setYear] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState('ATL')

    function getPlayer() {
        if (year.length < 4) {
            Alert.alert('Invalid Input', 'Year must be 4 digits')
            return
        }

        setSubmitted(true)
        const params:TeamRosterParams = {
            team: selectedTeam,
            year
        }

        dispatch(teamRosterHandler(params))
       
        return
    }

    if (loading) {
        return <LoadingOverlay />
    }

    if (!submitted) {
        return (
            <ScrollView style={styles.container}>
                <TextInput 
                    placeholder="Season End Year" 
                    style={styles.input}
                    onChangeText={setYear}
                    maxLength={4}
                    keyboardType='number-pad'
                />

                <Text>Team</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedTeam}
                    onValueChange={(itemValue, itemIndex) => setSelectedTeam(itemValue)}
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

                <Button title="Search" onPress={getPlayer} />
            </ScrollView>
        )
    }

    if (data.roster && data.roster.length === 0 && submitted && !loading) {
        return (
            <View style={styles.container}>
                <Text>Sorry! Could not find roster for given year. Please try a different year and or team.</Text>
                <Button title='Reset' onPress={() => {
                    setYear('')
                    setSelectedTeam('ATL')
                    setSubmitted(false)
                }}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Button title='Reset' onPress={() => {
                    setYear('')
                    setSelectedTeam('ATL')
                    setSubmitted(false)
            }}/>
            <TeamRoster data={data.roster} />
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
    }
})

export default NbaSearchTeamRoster