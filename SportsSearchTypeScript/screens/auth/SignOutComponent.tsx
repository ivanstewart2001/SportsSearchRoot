import IconButton from "../../components/UI/IconButton"
import { useNavigation } from '@react-navigation/native'
import { AuthScreenProp } from "../../types/screens/names";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../store/store'
import { logoutHandler } from '../../store/auth'

function SignOutComponent() {
    const navigation = useNavigation<AuthScreenProp>()
    const dispatch = useDispatch<AppDispatch>()

    return (
        <IconButton 
            icon='log-out-outline'
            size={24}
            onPressProp={() => {
                dispatch(logoutHandler())
                navigation.navigate('Landing')
            }}
            title=' '
            componentStyles={{}}
            titleStyles={{}}
            containerStyles={{}}
      />
    )
}

export default SignOutComponent