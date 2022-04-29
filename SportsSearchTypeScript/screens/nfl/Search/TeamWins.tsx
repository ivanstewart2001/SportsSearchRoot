import { useState } from "react";
import { Alert, Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { nflTeamWinsHandler } from "../../../store/nfl";
import { AppDispatch, RootState } from "../../../store/store";
import { NflTeamWinsReturnType } from "../../../types/nfl/teamWins";

function TeamWins() {
    const [year, setYear] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { data, loading } = useSelector((state:RootState) => state.nfl)

    function getNflTeamWins() {
        const currentYear = new Date().getFullYear() 
        if (year.length != 4) {
            Alert.alert('Invald Input', 'Year must be 4 digits')
            setYear('')
            setSubmitted(false)
            return
        } else if ((currentYear < Number(year)) || (Number(year) < 1946)) {
            Alert.alert('Invald Input', 'The NFL was not founded until 1946. Enter a year between 1946 and current year.')
            setYear('')
            setSubmitted(false)
            return
        }

        setSubmitted(true)
        dispatch(nflTeamWinsHandler({year: Number(year)}))
        return
    }

    function renderItem(item:NflTeamWinsReturnType) {
        return (
            <View style={styles.itemContainer}>
                <Text>Name: {item.name}</Text>
                <Text>Wins: {item.wins}</Text>
                <Text>Losses: {item.losses}</Text>
                <Text>Win Percentage: {item.winRatePercentage}</Text>
            </View>
        )
    }

    if (loading) {
        return <LoadingOverlay />
    }

    if (!submitted) {
        return (
            <View style={styles.container}>
                <View style={styles.yearInput}>
                    <TextInput
                        keyboardType="number-pad"
                        value={year}
                        placeholder="Year"
                        onChangeText={setYear}
                    />
                </View>
                <Button title="Search" onPress={getNflTeamWins} />
            </View>
        )
    }

    if (data.teamWins && data.teamWins.length === 0 && submitted && !loading) {
        return (
            <View style={styles.container}>
                <Text>Sorry! Could not find team win data for given year. Please try a different year.</Text>
                <Button title='Select New Year' onPress={() => {
                    setYear('')
                    setSubmitted(false)
                }}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Button title='Select New Year' onPress={() => {
                setYear('')
                setSubmitted(false)
            }}/>
            <FlatList 
                keyExtractor={(item, index) => 'key'+index}
                data={data.teamWins}
                renderItem={ ({item}:ListRenderItemInfo<NflTeamWinsReturnType>) => renderItem(item)}
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
    yearInput: {
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2
    },
    itemContainer: {
        borderWidth: 2,
        marginVertical: 4
    }
})

export default TeamWins