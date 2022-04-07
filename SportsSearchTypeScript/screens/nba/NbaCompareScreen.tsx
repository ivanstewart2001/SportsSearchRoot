import { useEffect, useState } from "react"
import { Text, View, StyleSheet, Alert, Button, ScrollView } from "react-native"
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from "react-redux"
import { comparePlayerStatsHandler, comparePlayerHeadshotHandler } from "../../store/nba"
import { AppDispatch, RootState } from "../../store/store"
import LoadingOverlay from "../../components/UI/LoadingOverlay"
import { TextInput } from "react-native-gesture-handler"
import { NbaCompareHeadshotParams, NbaComparePlayerParams, NbaPlayerHeadshotParams, NbaPlayerStatsParams } from "../../types/redux/nba"
import { NbaPlayerStatsType } from "../../types/nba/playerStats"
import PlayerStats from "../../components/nba/PlayerStats"
import { NbaCompareFullProps } from "../../types/nba/compare"
import NbaCompare from '../../components/nba/Compare'

function NbaCompareScreen() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, loading } = useSelector((state:RootState) => state.nba)
    const [playerStats, setPlayerStats] = useState<NbaCompareFullProps>()
    const [playerFullName1, setPlayerFullName1] = useState('')
    const [playerFullName2, setPlayerFullName2] = useState('')
    const [submitted, setSubmitted] = useState(false)

    function getPlayers() {
        if ((playerFullName1.length === 0) || (playerFullName2.length === 0)) {
            Alert.alert('Invalid Input', 'Must include both players full name')
            return
        }

        setSubmitted(true)
        const comparePlayersParams:NbaComparePlayerParams = {
            player1: {
                playerFullName: playerFullName1,
                statType: 'PER_GAME',
                playoffs: false,
                career: true
            },
            player2: {
                playerFullName: playerFullName2,
                statType: 'PER_GAME',
                playoffs: false,
                career: true
            }
        }

        const compareHeadshotParams:NbaCompareHeadshotParams = {
            player1: {
                playerFullName: playerFullName1
            },
            player2: {
                playerFullName: playerFullName2
            }
        }

        // Could honestly combine these actions into 1 action and reducer
        dispatch(comparePlayerStatsHandler(comparePlayersParams))
        dispatch(comparePlayerHeadshotHandler(compareHeadshotParams))
        return
    }

    useEffect(() => {
        setPlayerStats(data.compare)
    }, [loading])

    if (loading) {
        return <LoadingOverlay />
    }

    if (!submitted) {
        return (
            <ScrollView style={styles.container}>
                <TextInput 
                    placeholder="First Player Name" 
                    style={styles.input}
                    onChangeText={setPlayerFullName1}
                />

                <TextInput 
                    placeholder="Second Player Name" 
                    style={styles.input}
                    onChangeText={setPlayerFullName2}
                />


                <Button title="Search" onPress={getPlayers} />
            </ScrollView>
        )
    }

    if (playerStats?.player1 && playerStats?.player2 && (playerStats.player1.stats.length === 0 || playerStats.player2.stats.length === 0) && submitted && !loading) {
        return (
            <View style={styles.container}>
                <Text>Sorry! Could not find data for given players Please try inputting different players.</Text>
                <Button title='Reset' onPress={() => {
                    setPlayerFullName1('')
                    setPlayerFullName2('')
                    setSubmitted(false)
                    setPlayerStats(undefined)
                }}/>
            </View>
        )
    }
    
    if (playerStats?.player1 && playerStats.player2) {
        return (
            <View style={styles.container}>
                <Button title='Reset' onPress={() => {
                        setPlayerFullName1('')
                        setPlayerFullName2('')
                        setSubmitted(false)
                        setPlayerStats(undefined)
                }}/>
                <NbaCompare player1={playerStats.player1} player2={playerStats.player2}/>
            </View>
    
        )
    }

    return <Text>???</Text>

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
        padding: 10,
        margin: 10
    }
})

export default NbaCompareScreen