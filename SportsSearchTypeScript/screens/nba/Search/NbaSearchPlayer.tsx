import { useEffect, useState } from "react"
import { Text, View, StyleSheet, Alert, Button, ScrollView } from "react-native"
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from "react-redux"
import { playerStatsHandler, playerHeadshotHandler } from "../../../store/nba"
import { AppDispatch, RootState } from "../../../store/store"
import LoadingOverlay from "../../../components/UI/LoadingOverlay"
import { TextInput } from "react-native-gesture-handler"
import { NbaPlayerHeadshotParams, NbaPlayerStatsParams } from "../../../types/redux/nba"
import { NbaPlayerStatsType } from "../../../types/nba/playerStats"
import PlayerStats from "../../../components/nba/PlayerStats"

function NbaSearchPlayer() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, loading } = useSelector((state:RootState) => state.nba)
    const [playerHeadshot, setPlayerHeadshot] = useState<string>()
    const [playerStats, setPlayerStats] = useState<Array<NbaPlayerStatsType>>()
    const [playerFullName, setPlayerFullName] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [selectedStatType, setSelectedStatTYpe] = useState('PER_GAME')
    const [selectedPlayoffs, setSelectedPlayoffs] = useState(false)
    const [selectedCareer, setSelectedCareer] = useState(false)

    function getPlayer() {
        if (playerFullName.length === 0) {
            Alert.alert('Invalid Input', 'Must include player name')
            return
        }

        setSubmitted(true)
        const playerStatsParams:NbaPlayerStatsParams = {
            playerFullName,
            statType: selectedStatType,
            playoffs: selectedPlayoffs,
            career: selectedCareer
        }
        const playerHeadshotParams:NbaPlayerHeadshotParams = {
            playerFullName
        }

        dispatch(playerStatsHandler(playerStatsParams))
        dispatch(playerHeadshotHandler(playerHeadshotParams))
        return
    }

    useEffect(() => {
        setPlayerHeadshot(data.playerHeadshot)
        setPlayerStats(data.playerStats)
    }, [loading])

    if (loading) {
        return <LoadingOverlay />
    }

    if (!submitted) {
        return (
            <ScrollView style={styles.container}>
                <TextInput 
                    placeholder="Player Name" 
                    style={styles.input}
                    onChangeText={setPlayerFullName}
                />

                <Text>Stat Type</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedStatType}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatTYpe(itemValue)}
                >
                    <Picker.Item label='Per Game' value='PER_GAME' />
                    <Picker.Item label='Per Minute' value='PER_MINUTE' />
                    <Picker.Item label='Per Possession' value='PER_POSS' />
                    <Picker.Item label='Advanced' value='ADVANCED' />
                </Picker>

                <Text>Playoffs</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedPlayoffs}
                    onValueChange={(itemValue, itemIndex) => setSelectedPlayoffs(itemValue)}
                >
                    <Picker.Item label='True' value={true} />
                    <Picker.Item label='False' value={false} />
                </Picker>

                <Text>Career</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedCareer}
                    onValueChange={(itemValue, itemIndex) => setSelectedCareer(itemValue)}
                >
                    <Picker.Item label='True' value={true} />
                    <Picker.Item label='False' value={false} />
                </Picker>

                <Button title="Search" onPress={getPlayer} />
            </ScrollView>
        )
    }

    if (playerStats && playerStats.length === 0 && submitted && !loading) {
        return (
            <View style={styles.container}>
                <Text>Sorry! Could not find draft class for given year. Please try a different year.</Text>
                <Button title='Reset' onPress={() => {
                    setPlayerFullName('')
                    setSubmitted(false)
                    setPlayerStats(undefined)
                    setPlayerHeadshot(undefined)
                }}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Button title='Reset' onPress={() => {
                    setPlayerFullName('')
                    setSubmitted(false)
                    setPlayerStats(undefined)
                    setPlayerHeadshot(undefined)
            }}/>
            <PlayerStats
                statType={selectedStatType}
                playerHeadshot={playerHeadshot} 
                playerStats={playerStats}
            />
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
        width: 200,
        height: 200,
        borderWidth: 2,
        marginVertical: 5,
        padding: 5
    }
})

export default NbaSearchPlayer