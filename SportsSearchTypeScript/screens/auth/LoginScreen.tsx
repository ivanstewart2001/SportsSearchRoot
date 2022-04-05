import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { CheckBox } from '@rneui/themed/dist'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from '../../store/auth'
import { AppDispatch, RootState } from '../../store/store'
import { useNavigation } from '@react-navigation/native'
import { MainScreenProp } from "../../types/screens/names";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { prettifyErrorMessage } from '../../util/errorMessages'

function LoginScreen() {
    const [hidePassword, setHidePassword] = useState(true)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const dispatch = useDispatch<AppDispatch>()
    const { authData, loading } = useSelector((state:RootState) => state.auth)

    const navigation = useNavigation<MainScreenProp>()

    function navigateToLanding() {
        navigation.navigate('Main')
    }

    useEffect(() => {
        if (!loading && !!authData.email && !!authData.userId) {
            navigateToLanding()
        } else if (!loading && !!authData.code) {
            setError(prettifyErrorMessage(authData.code))
        }
    }, [dispatch, loading])

    function submit() {
        dispatch(loginHandler({email, password}))
    }

    if (loading) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Sports Search</Text>
                <Text style={styles.subTitle}>News | Stats | Reports | Schedules | Comparisons</Text>
            </View>

            {!!error && <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>}

            <View style={styles.textInputContainer}>
                <TextInput 
                    style={styles.textInput} 
                    autoCapitalize="none" 
                    keyboardType="email-address" 
                    onChangeText={setEmail}
                />
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={hidePassword}
                    onChangeText={setPassword}
                />

                <CheckBox
                    title="Hide Password"
                    checked={hidePassword}
                    onPress={() => setHidePassword(!hidePassword)}
                    containerStyle={{
                        backgroundColor: 'transparent'
                    }}
                />

            </View>
            <Button title="Login" onPress={submit}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 36
    },
    subTitle: {
        fontSize: 16
    },
    titleContainer: {
        marginTop: 200,
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        width: 350,
        margin: 5,
        height: 30,
        padding: 5
    },
    textInputContainer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        color: 'red'
    },
    errorContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default LoginScreen