import { Button, StyleSheet, Text, View, ScrollView, TextStyle, ViewStyle } from "react-native";
import { useNavigation } from '@react-navigation/native'
import IconButton from "../../components/UI/IconButton";
import { NflSearchScreenProps } from "../../types/screens/names";

function NflSearchScreen() {
    const navigation = useNavigation<NflSearchScreenProps>()

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

    function navigateToNflSearchTeamPassing() {
        navigation.navigate('TeamPassing')
    }

    function navigateToNflSearchTeamRecieving() {
        navigation.navigate('TeamRecieving')
    }

    function navigateToNflSearchTeamRushing() {
        navigation.navigate('TeamRushing')
    }

    function navigateToNflSearchTeamWins() {
        navigation.navigate('TeamWins')
    }

    return (
        <ScrollView style={styles.container}>
            <IconButton 
                icon="arrow-redo-outline" 
                title="Team Passing" 
                size={50}
                containerStyles={containerStyles}
                titleStyles={titleStyles}
                componentStyles={componentStyles}
                onPressProp={navigateToNflSearchTeamPassing}
            /> 

            <IconButton 
                icon="add" 
                title="Team Rushing" 
                size={50}
                containerStyles={containerStyles}
                titleStyles={titleStyles}
                componentStyles={componentStyles}
                onPressProp={navigateToNflSearchTeamRushing}
            />

            <IconButton 
                icon="clipboard-outline" 
                title="Team Recieving"
                size={50}
                containerStyles={containerStyles}
                titleStyles={titleStyles}
                componentStyles={componentStyles}
                onPressProp={navigateToNflSearchTeamRecieving}
            /> 

            <IconButton 
                icon="trophy-outline" 
                title="Team Wins" 
                size={50}
                containerStyles={containerStyles}
                titleStyles={titleStyles}
                componentStyles={componentStyles}
                onPressProp={navigateToNflSearchTeamWins}
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

export default NflSearchScreen