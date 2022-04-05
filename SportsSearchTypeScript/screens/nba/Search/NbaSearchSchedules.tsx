import { useEffect, useState } from "react"
import { Pressable, Text, FlatList, ListRenderItemInfo, View, StyleSheet, Alert, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { scheduleHandler } from "../../../store/nba"
import { AppDispatch, RootState } from "../../../store/store"
import { NbaDraftClassType } from '../../../types/nba/draftClass'
import LoadingOverlay from "../../../components/UI/LoadingOverlay"
import { useNavigation } from "@react-navigation/native"
import { NbaModalScreenProps } from "../../../types/screens/names"
import { TextInput } from "react-native-gesture-handler"
import { Picker } from "@react-native-picker/picker"
import { NBAScheduleForCurrentWeekResponse, NbaScheduleParams } from "../../../types/redux/nba"
import NbaSchedule from "../../../components/nba/Schedule"
import { NbaScheduleComponentParams } from "../../../types/nba/schedule"

function NbaSearchSchedule() {
    const navigation = useNavigation<NbaModalScreenProps>()
    const dispatch = useDispatch<AppDispatch>()
    const { data, loading } = useSelector((state:RootState) => state.nba)
    const [scheduleData, setScheduleData] = useState<Array<NBAScheduleForCurrentWeekResponse>>()
    const [date, setDate] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [team, setTeam] = useState()

    function getSchedule() {
        if ((!date) && (team === 'ALL')) {
            Alert.alert('Invalid Input', 'Must include date and/or team.')
            return
        }

        let params:NbaScheduleParams = {}

        if (team !== 'ALL') {
            params['team'] = team
        }

        if (date.length !== 0) {
            params['date'] = date
        }

        setSubmitted(true)
        dispatch(scheduleHandler(params))
        return
    }

    useEffect(() => {
        setScheduleData(data.schedule)
    }, [loading])

    function renderItem(item:NBAScheduleForCurrentWeekResponse) {
        const {gameDate, games} = item
        return (
            <NbaSchedule gameDate={gameDate || 'No date'} games={games} />
        )
    }

    if (loading) {
        return <LoadingOverlay />
    }

    if (!submitted) {
        return (
            <View style={styles.container}>
                <TextInput
                    value={date}
                    onChangeText={setDate}
                    placeholder="Date in format: DD-MM-YYYY"
                    maxLength={10}
                    style={styles.textInput}
                />

                <Picker
                    style={styles.picker}
                    selectedValue={team}
                    onValueChange={(itemValue, itemIndex) => setTeam(itemValue)}
                >
                    <Picker.Item label='ALL' value='ALL' />
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

                <Button title="Search" onPress={getSchedule} />
            </View>
        )
    }

    if (scheduleData && scheduleData.length === 0 && submitted && !loading) {
        return (
            <View style={styles.container}>
                <Text>Sorry! Could not find draft class for given year. Please try a different year.</Text>
                <Button title='Reset' onPress={() => {
                    setDate('')
                    setSubmitted(false)
                    setScheduleData(undefined)
                }}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Button title='Reset' onPress={() => {
                    setDate('')
                    setSubmitted(false)
                    setScheduleData(undefined)
            }}/>
            <FlatList 
                keyExtractor={(item, index) => 'key'+index}
                data={scheduleData}
                renderItem={ ({item}:ListRenderItemInfo<NBAScheduleForCurrentWeekResponse>) => renderItem(item)}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        width: 200,
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

export default NbaSearchSchedule