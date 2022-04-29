import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { DrawerNavigationProp }  from '@react-navigation/drawer'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { NbaDraftClassType } from '../nba/draftClass'
import { FavoritesPlayersReturnType } from '../redux/nba'

export type RootStackParamList = {
    // Auth Routes
    Landing: undefined,
    Login: undefined,
    SignUp: undefined,

    // Main Route
    Main: undefined,


    // NBA Routes
    NbaSearchPlayer: undefined,
    NbaSearchSchedules: undefined,
    NbaSearchBoxScore: undefined,
    NbaSearchDraftClass: undefined,
    NbaSearchTeamRoster: undefined,
    NbaSearchTeamStats: undefined,
    NbaSearchRosterStats: undefined
    NbaSearchPlayerModal: { data: NbaDraftClassType },
    NbaFavoritesPlayerModal: { data: FavoritesPlayersReturnType }

    // NFL Routes
    TeamPassing: undefined,
    TeamRushing: undefined,
    TeamWins: undefined,
    TeamRecieving: undefined
}

// Auth
export type AuthStackParamList = {
    Landing: undefined,
    Login: undefined,
    SignUp: undefined,
}
export type AuthScreenProp = NativeStackNavigationProp<AuthStackParamList>

// Main
export type MainStackParamList = {
    Main: undefined
}
export type MainScreenProp = NativeStackNavigationProp<MainStackParamList>

// NBA
export type NbaSearchParamList = {
    NbaSearchPlayer: undefined,
    NbaSearchSchedules: undefined,
    NbaSearchBoxScore: undefined,
    NbaSearchDraftClass: undefined,
    NbaSearchTeamRoster: undefined,
    NbaSearchTeamStats: undefined,
    NbaSearchRosterStats: undefined

}
export type NbaSearchScreenProps = NativeStackNavigationProp<NbaSearchParamList>


export type NbaSearchPlayerModalProp = {
    route: RouteProp<{ params: NbaDraftClassType }, 'params'>
    navigation: NavigationProp<any>
}

export type NbaFavoritePlayerModalProp = {
    route: RouteProp<{ params: FavoritesPlayersReturnType }, 'params'>
    navigation: NavigationProp<any>
}

export type NbaModalsParamList = {
    NbaSearchPlayerModal: NbaDraftClassType,
    NbaFavoritesPlayerModal: FavoritesPlayersReturnType
}
export type NbaModalScreenProps = NativeStackNavigationProp<NbaModalsParamList>

// NBA
export type NflSearchParamList = {
    TeamPassing: undefined,
    TeamRushing: undefined,
    TeamWins: undefined,
    TeamRecieving: undefined

}
export type NflSearchScreenProps = NativeStackNavigationProp<NflSearchParamList>


export type DrawerParamList = {
    nbaBottomTabs: undefined,
    nflBottomTabs: undefined,
    mlbBottomTabs: undefined
}


