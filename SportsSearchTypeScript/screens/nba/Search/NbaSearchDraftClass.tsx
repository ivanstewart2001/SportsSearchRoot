import { useEffect, useState } from "react"
import { Pressable, Text, FlatList, ListRenderItemInfo, View, StyleSheet, Alert, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { draftClassHandler } from "../../../store/nba"
import { AppDispatch, RootState } from "../../../store/store"
import { NbaDraftClassType } from '../../../types/nba/draftClass'
import LoadingOverlay from "../../../components/UI/LoadingOverlay"
import { useNavigation } from "@react-navigation/native"
import { NbaModalScreenProps } from "../../../types/screens/names"
import { TextInput } from "react-native-gesture-handler"

function NbaSearchDraftClass() {
    const navigation = useNavigation<NbaModalScreenProps>()
    const dispatch = useDispatch<AppDispatch>()
    const { data, loading } = useSelector((state:RootState) => state.nba)
    const [playerData, setPlayerData] = useState<Array<NbaDraftClassType>>()
    const [year, setYear] = useState('')
    const [submitted, setSubmitted] = useState(false)

    function getDraftClass() {
        const currentYear = new Date().getFullYear() 
        if (year.length != 4) {
            Alert.alert('Invald Input', 'Year must be 4 digits')
            setYear('')
            setSubmitted(false)
            return
        } else if ((currentYear < Number(year)) || (Number(year) < 1946)) {
            Alert.alert('Invald Input', 'The NBA was not founded until 1946. Enter a year between 1946 and current year.')
            setYear('')
            setSubmitted(false)
            return
        }

        setSubmitted(true)
        dispatch(draftClassHandler({year}))
        return
    }

    useEffect(() => {
        setPlayerData(data.draftClass)
    }, [loading])

    function renderItem(item:NbaDraftClassType) {
        const returnText = `${item.PICK}. ${item.PLAYER}`
        return (
            <Pressable
                onPress={() => item.PLAYER ? navigation.navigate('NbaSearchPlayerModal', item) : Alert.alert('Error Fetching Player', 'Could not fetch given player. Please select a different player.')}
            >
                <View style={styles.renderItemContainer}>
                    <Text style={styles.playerText}>{item.PLAYER ? returnText : 'Could not fetch player'}</Text>
                </View>
            </Pressable>
        )
    }

    if (loading) {
        return <LoadingOverlay />
    }

    if (!submitted) {
        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder="Draft Year" 
                    style={styles.input} 
                    maxLength={4} 
                    keyboardType="number-pad"
                    onChangeText={setYear}
                />
                <Button title="Search" onPress={getDraftClass} />
            </View>
        )
    }

    if (playerData && Object.keys(playerData).length === 0 && submitted && !loading) {
        return (
            <View style={styles.container}>
                <Text>Sorry! Could not find draft class for given year. Please try a different year.</Text>
                <Button title='Select New Year' onPress={() => {
                    setYear('')
                    setSubmitted(false)
                    setPlayerData(undefined)
                }}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Button title='Select New Year' onPress={() => {
                    setYear('')
                    setSubmitted(false)
                    setPlayerData(undefined)
            }}/>
            <FlatList 
                keyExtractor={(item, index) => 'key'+index}
                data={playerData}
                renderItem={ ({item}:ListRenderItemInfo<NbaDraftClassType>) => renderItem(item)}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
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
    }
})

export default NbaSearchDraftClass