import { Button, StyleSheet, Text, View, ScrollView, TextStyle, ViewStyle } from "react-native";
import { useNavigation } from '@react-navigation/native'
import IconButton from "../../components/UI/IconButton";
import { NbaSearchScreenProps } from "../../types/screens/names";

function NbaSearchScreen() {
    const navigation = useNavigation<NbaSearchScreenProps>()

    const titleStyles:TextStyle = {
        fontSize: 24
    }

    const componentStyles:ViewStyle = {
        borderWidth: 2,
        marginHorizontal: 50,
        borderRadius: 10,
        padding: 5,
        marginVertical: 5
    }

    const containerStyles:ViewStyle = {
        justifyContent: 'center',
    }

    function navigateToNbaSearchPlayer() {
        navigation.navigate('NbaSearchPlayer')
    }

    function navigateToNbaSearchSchedules() {
        navigation.navigate('NbaSearchSchedules')
    }

    function navigateToNbaSearchBoxScore() {
        navigation.navigate('NbaSearchBoxScore')
    }

    function navigateToNbaSearchDraftClass() {
        navigation.navigate('NbaSearchDraftClass')
    }

    function navigateToNbaSearchTeamRoster() {
        navigation.navigate('NbaSearchTeamRoster')
    }

    function navigateToNbaSearchTeamStats() {
        navigation.navigate('NbaSearchTeamStats')
    }

    function navigateToNbaSearchRosterStats() {
        navigation.navigate('NbaSearchRosterStats')
    }

    return (
        <ScrollView style={styles.container}>
            <IconButton 
                icon="person-outline" 
                title="Player" 
                size={50}
                containerStyles={containerStyles}
                titleStyles={titleStyles}
                componentStyles={componentStyles}
                onPressProp={navigateToNbaSearchPlayer}
            /> 

            <IconButton 
                icon="calendar-outline" 
                title="Schedules" 
                size={50}
                containerStyles={containerStyles}
                titleStyles={titleStyles}
                componentStyles={componentStyles}
                onPressProp={navigateToNbaSearchSchedules}
            />

            <IconButton 
                icon="clipboard-outline" 
                title="Box Score" 
                size={50}
                containerStyles={containerStyles}
                titleStyles={titleStyles}
                componentStyles={componentStyles}
                onPressProp={navigateToNbaSearchBoxScore}
            /> 

            <IconButton 
                icon="people-outline" 
                title="Draft Class" 
                size={50}
                containerStyles={containerStyles}
                titleStyles={titleStyles}
                componentStyles={componentStyles}
                onPressProp={navigateToNbaSearchDraftClass}
            />

            <IconButton 
                icon="list-outline" 
                title="Team Roster" 
                size={50}
                containerStyles={containerStyles}
                titleStyles={titleStyles}
                componentStyles={componentStyles}
                onPressProp={navigateToNbaSearchTeamRoster}
            />  

            <IconButton 
                icon="bar-chart-outline" 
                title="Team Stats" 
                size={50}
                containerStyles={containerStyles}
                titleStyles={titleStyles}
                componentStyles={componentStyles}
                onPressProp={navigateToNbaSearchTeamStats}
            />

            <IconButton 
                icon="stats-chart-outline" 
                title="Roster Stats" 
                size={50}
                containerStyles={containerStyles}
                titleStyles={titleStyles}
                componentStyles={componentStyles}
                onPressProp={navigateToNbaSearchRosterStats}
            /> 
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    }
})

export default NbaSearchScreen