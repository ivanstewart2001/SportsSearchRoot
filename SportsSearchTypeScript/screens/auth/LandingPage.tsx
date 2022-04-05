import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { AuthScreenProp } from "../../types/screens/names";

function LandingScreen() {
    const navigation = useNavigation<AuthScreenProp>()

    function navigateToLogin() {
        navigation.navigate('Login')
    }

    function navigateToSignUp() {
        navigation.navigate('SignUp')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sports Search</Text>
            <Text style={styles.subTitle}>News | Stats | Reports | Schedules | Comparisons</Text>

            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={navigateToLogin} />
                <Button title="Sign Up" onPress={navigateToSignUp} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 36
    },
    subTitle: {
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row'
    }
})

export default LandingScreen