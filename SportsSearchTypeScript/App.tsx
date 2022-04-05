import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'

// Navigators
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Auth Screens
import LandingScreen from './screens/auth/LandingPage';
import LoginScreen from './screens/auth/LoginScreen'
import SignUpScreen from './screens/auth/SignUpScreen';

// NBA Screens
import NbaNewsScreen from './screens/nba/NbaNewsScreen'
import NbaSearchScreen from './screens/nba/NbaSearchScreen'
import NbaCompareScreen from './screens/nba/NbaCompareScreen'
import NbaFavoritesScreen from './screens/nba/NbaFavoritesScreen'
import NbaSearchPlayerScreen from './screens/nba/Search/NbaSearchPlayer'
import NbaSchedulesScreen from './screens/nba/Search/NbaSearchSchedules'
import NbaSearchBoxScoreScreen from './screens/nba/Search/NbaSearchBoxScore'
import NbaSearchDraftClassScreen from './screens/nba/Search/NbaSearchDraftClass'
import NbaSearchTeamRosterScreen from './screens/nba/Search/NbaSearchTeamRoster'
import NbaSearchTeamStatsScreen from './screens/nba/Search/NbaSearchTeamStats'
import NbaSearchRosterStatsScreen from './screens/nba/Search/NbaSearchRosterStats'

// NBA Modals
import NbaSearchPlayerModal from './screens/nba/Search/modals/NbaSearchPlayerModal'

// NFL Screens
import NflSchedulesScreen from './screens/nfl/NflSchedulesScreen'
import NflSearchScreen from './screens/nfl/NflSearchScreen'
import NflCompareScreen from './screens/nfl/NflCompareScreen'
import NflFavoritesScreen from './screens/nfl/NflFavoritesScreen'

// MLB Screens
import MlbReportsScreen from './screens/mlb/MlbReportsScreen'
import MlbSearchScreen from './screens/mlb/MlbSearchScreen'
import MlbCompareScreen from './screens/mlb/MlbCompareScreen'
import MlbFavoritesScreen from './screens/mlb/MlbFavoritesScreen'


// Interfaces / Types
import { TabBarIconProps } from './types/root/App';
import { RootStackParamList, DrawerParamList } from './types/screens/names';

// Redux
import { Provider } from 'react-redux';
import { store } from './store/store'
import SignOutComponent from './screens/auth/SignOutComponent';

const Stack = createNativeStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator<DrawerParamList>()
const BottomTab = createBottomTabNavigator()

function SearchTabBarIcon({ color, size }:TabBarIconProps) {
  return (
    <Ionicons name='search-outline' size={size} color={color} />
  )
}

function CompareTabBarIcon({ color, size }:TabBarIconProps) {
  return (
    <Ionicons name='analytics-outline' size={size} color={color} />
  )
}

function FavoriteTabBarIcon({ color, size }:TabBarIconProps) {
  return (
    <Ionicons name='star-outline' size={size} color={color} />
  )
}


function BottomTabNavigatorNBA() {
  return (
    <BottomTab.Navigator
      // screenOptions={{
      //   headerShown: false
      // }}
    >
      <BottomTab.Screen
        name='nbaNewsScreen' 
        component={NbaNewsScreen} 
        options={{
          title: 'News',
          tabBarIcon: ({color, size}) => <Ionicons name='newspaper-outline' size={size} color={color} />
        }}
      />
      <BottomTab.Screen 
        name='nbaSearchScreen' 
        component={NbaSearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: SearchTabBarIcon
        }}
      />
      <BottomTab.Screen 
        name='nbaCompareScreen'
        component={NbaCompareScreen} 
        options={{
          title: 'Compare',
          tabBarIcon: CompareTabBarIcon
        }}
      />
      <BottomTab.Screen
        name='nbaFavoritesScreen' 
        component={NbaFavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: FavoriteTabBarIcon
        }} 
      />
    </BottomTab.Navigator>
  )
}

function BottomTabNavigatorNFL() {
  return (
    <BottomTab.Navigator
      // screenOptions={{
      //   headerShown: false
      // }}
    >
      <BottomTab.Screen
        name='nflSchedulesScreen' 
        component={NflSchedulesScreen} 
        options={{
          title: 'Schedules',
          tabBarIcon: ({color, size}) => <Ionicons name='calendar-outline' size={size} color={color} />
        }}
      />
      <BottomTab.Screen 
        name='nflSearchScreen' 
        component={NflSearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: SearchTabBarIcon
        }}
      />
      <BottomTab.Screen 
        name='nflCompareScreen'
        component={NflCompareScreen} 
        options={{
          title: 'Compare',
          tabBarIcon: CompareTabBarIcon
        }}
      />
      <BottomTab.Screen
        name='nflFavoritesScreen' 
        component={NflFavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: FavoriteTabBarIcon
        }} 
      />
    </BottomTab.Navigator>
  )
}

function BottomTabNavigatorMLB() {
  return (
    <BottomTab.Navigator
      // screenOptions={{
      //   headerShown: false
      // }}
    >
      <BottomTab.Screen
        name='mlbReportsScreen' 
        component={MlbReportsScreen} 
        options={{
          title: 'Reports',
          tabBarIcon: ({color, size}) => <Ionicons name='document-text-outline' size={size} color={color} />
        }}
      />
      <BottomTab.Screen 
        name='mlbSearchScreen' 
        component={MlbSearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: SearchTabBarIcon
        }}
      />
      <BottomTab.Screen 
        name='mlbCompareScreen'
        component={MlbCompareScreen} 
        options={{
          title: 'Compare',
          tabBarIcon: CompareTabBarIcon
        }}
      />
      <BottomTab.Screen
        name='mlbFavoritesScreen' 
        component={MlbFavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: FavoriteTabBarIcon
        }} 
      />
    </BottomTab.Navigator>
  )
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        headerRight: () => (
          <SignOutComponent />
        )
      })}
    >
      <Drawer.Screen 
        name='nbaBottomTabs' 
        component={BottomTabNavigatorNBA} 
        options={{
          title: 'NBA',
          drawerIcon: ({color, size}) => (
            <Ionicons name="basketball-outline" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen 
        name='nflBottomTabs'
        component={BottomTabNavigatorNFL}
        options={{
          title: 'NFL',
          drawerIcon: ({color, size}) => (
            <Ionicons name="american-football-outline" color={color} size={size} />
          )
        }}  
      />
      <Drawer.Screen
        name='mlbBottomTabs'
        component={BottomTabNavigatorMLB}
        options={{
          title: 'MLB',
          drawerIcon: ({color, size}) => (
            <Ionicons name="baseball-outline" color={color} size={size} />
          )
        }}
      />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <Provider store={store}>
        <NavigationContainer>
            <SafeAreaView style={styles.container}>
              <Stack.Navigator
                // screenOptions={{
                //   headerShown: false
                // }}
              >
                <Stack.Screen 
                  name='Landing' 
                  component={LandingScreen}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen 
                  name='Login' 
                  component={LoginScreen}
                  options={{
                    headerShown: true,
                    headerBackTitle: 'Back',
                    headerTitle: ''
                  }} 
                />
                <Stack.Screen 
                  name='SignUp' 
                  component={SignUpScreen} 
                  options={{
                    headerShown: true,
                    headerBackTitle: 'Back',
                    headerTitle: ''
                  }} 
                />
                <Stack.Screen 
                  name='Main' 
                  component={DrawerNavigator}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen 
                  name='NbaSearchPlayer'
                  component={NbaSearchPlayerScreen}
                  options={{
                    headerShown: true,
                    headerBackTitle: 'Search',
                    headerTitle: 'NBA Player Search'
                  }}
                />
                <Stack.Screen 
                  name='NbaSearchSchedules'
                  component={NbaSchedulesScreen}
                  options={{
                    headerShown: true,
                    headerBackTitle: 'Search',
                    headerTitle: 'NBA Schedules Search'
                  }}
                />
                <Stack.Screen 
                  name='NbaSearchBoxScore'
                  component={NbaSearchBoxScoreScreen}
                  options={{
                    headerShown: true,
                    headerBackTitle: 'Search',
                    headerTitle: 'NBA Box Score Search'
                  }}
                />
                <Stack.Screen 
                  name='NbaSearchDraftClass'
                  component={NbaSearchDraftClassScreen}
                  options={{
                    headerShown: true,
                    headerBackTitle: 'Search',
                    headerTitle: 'NBA Draft Class Search'
                  }}
                />
                <Stack.Screen 
                  name='NbaSearchTeamRoster'
                  component={NbaSearchTeamRosterScreen}
                  options={{
                    headerShown: true,
                    headerBackTitle: 'Search',
                    headerTitle: 'NBA Team Roster Search'
                  }}
                />
                <Stack.Screen 
                  name='NbaSearchTeamStats'
                  component={NbaSearchTeamStatsScreen}
                  options={{
                    headerShown: true,
                    headerBackTitle: 'Search',
                    headerTitle: 'NBA Team Stats Search'
                  }}
                />     
                <Stack.Screen 
                  name='NbaSearchRosterStats'
                  component={NbaSearchRosterStatsScreen}
                  options={{
                    headerShown: true,
                    headerBackTitle: 'Search',
                    headerTitle: 'NBA Roster Stats Search'
                  }}
                /> 
                <Stack.Screen 
                  name='NbaSearchPlayerModal'
                  component={NbaSearchPlayerModal}
                  options={{
                    headerShown: true,
                    presentation: 'modal'
                  }}
                />            
              </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
      </Provider>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  }
})

// Installs
// npm install @react-navigation/native
// expo install react-native-screens react-native-safe-area-context
// npm install @react-navigation/drawer
// expo install react-native-gesture-handler react-native-reanimated
// npm install @react-navigation/native-stack
// npm install @react-navigation/bottom-tabs
// expo install react-native-safe-area-context