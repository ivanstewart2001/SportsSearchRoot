import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker"
import { useState } from "react";
import AllArticles from "../../components/nba/news/AllArticles";
import TeamArticles from "../../components/nba/news/TeamArticles";
import SourceArticles from "../../components/nba/news/SourceArticles";
import PlayerArticles from "../../components/nba/news/PlayerArticles";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { nbaTeamArticlesHandler, nbaPlayerArticlesHandler, nbaSourceArticlesHandler, nbaArticlesHandler } from "../../store/nba";

function NbaNewsScreen() {
    const dispatch = useDispatch<AppDispatch>()

    const [option, setOption] = useState('ALL_ARTICLES')
    const [selectedOption, setSelectedOption] = useState(false)

    const [team, selectTeam] = useState('ATL')
    const [selectedTeam, setSelectedTeam] = useState(false)
    
    const [playerName, setPlayerName] = useState('')
    const [selectedPlayer, setSelectedPlayer] = useState(false)

    const [source, setSource] = useState('nba')
    const [selectedSource, setSelectedSource] = useState(false)

    return (
        <View>
            {
                !selectedOption && (
                    <View>
                            <Picker
                                selectedValue={option}
                                onValueChange={(itemValue, itemIndex) => setOption(itemValue)}
                            >
                                <Picker.Item label='ALL ARTICLES' value='ALL_ARTICLES' />
                                <Picker.Item label='ARTICLES BY TEAM' value='ARTICLES_BY_TEAM' />
                                <Picker.Item label='ARTICLES BY PLAYER' value='ARTICLES_BY_PLAYER' />
                                <Picker.Item label='ARTICLES BY SOURCE' value='ARTICLES_BY_SOURCE' />
                            </Picker>
                            <Button title="Submit" onPress={() => {
                                dispatch(nbaArticlesHandler())
                                setSelectedOption(true)
                            }}/>
                    </View>
                )
            }
            {
                ((selectedOption) && (option === 'ALL_ARTICLES')) && (
                    <AllArticles />
                )
            }
            {
                ((selectedOption) && (option === 'ARTICLES_BY_TEAM') && (!selectedTeam)) && (
                    <View>
                        <Picker
                            selectedValue={team}
                            onValueChange={(itemValue, itemIndex) => selectTeam(itemValue)}
                        >
                            <Picker.Item label='ATLANTA HAWKS' value='hawks' />
                            <Picker.Item label='BOSTON CELTICS' value='celtics' />
                            <Picker.Item label='BROOKLYN NETS' value='nets' />
                            <Picker.Item label='CHICAGO BULLS' value='bulls' />
                            <Picker.Item label='CHARLOTTE HORNETS' value='hornets' />
                            <Picker.Item label='CLEVELAND CAVALIERS' value='cavaliers' />
                            <Picker.Item label='DALLAS MAVERICKS' value='mavericks' />
                            <Picker.Item label='DENVER NUGGETS' value='nuggets' />
                            <Picker.Item label='DETROIT PISTONS' value='pistons' />
                            <Picker.Item label='GOLDEN STATE WARRIORS' value='warriors' />
                            <Picker.Item label='HOUSTON ROCKETS' value='rockets' />
                            <Picker.Item label='INDIANA PACERS' value='pacers' />
                            <Picker.Item label='LOS ANGELES CLIPPERS' value='clippers' />
                            <Picker.Item label='LOS ANGELES LAKERS' value='lakers' />
                            <Picker.Item label='MEMPHIS GRIZZLIES' value='grizzlies' />
                            <Picker.Item label='MIAMI HEAT' value='heat' />
                            <Picker.Item label='MILWAUKEE BUCKS' value='bucks' />
                            <Picker.Item label='MINNESOTA TIMBERWOLVES' value='timberwolves' />
                            <Picker.Item label='NEW ORLEANS PELICANS' value='pelicans' />
                            <Picker.Item label='NEW YORK KNICKS' value='knicks' />
                            <Picker.Item label='OKLAHOMA CITY THUNDER' value='thunder' />
                            <Picker.Item label='ORLANDO MAGIC' value='magic' />
                            <Picker.Item label='PHILADELPHIA 76ERS' value='76ers' />
                            <Picker.Item label='PHOENIX SUNS' value='suns' />
                            <Picker.Item label='PORTLAND TRAIL BLAZERS' value='blazers' />
                            <Picker.Item label='SACRAMENTO KINGS' value='kings' />
                            <Picker.Item label='SAN ANTONIO SPURS' value='spurs' />
                            <Picker.Item label='TORONTO RAPTORS' value='raptors' />
                            <Picker.Item label='UTAH JAZZ' value='jazz' />
                            <Picker.Item label='WASHINGTON WIZARDS' value='wizards' />
                        </Picker>
                        <Button title="Submit" onPress={() => {
                            dispatch(nbaTeamArticlesHandler(team))
                            setSelectedTeam(true)
                        }}/>
                    </View>
                )
            }
            {
                ((selectedTeam) && (option === 'ARTICLES_BY_TEAM')) && (
                    <View>
                        <Text>{team}</Text>
                        <TeamArticles />
                    </View>
                )
            }
            {
                ((selectedOption) && (option === 'ARTICLES_BY_PLAYER') && (!selectedPlayer)) && (
                    <View>
                            <TextInput placeholder="Player Name" onChangeText={setPlayerName} value={playerName} />
                            <Button title="Submit" onPress={() => {
                                dispatch(nbaPlayerArticlesHandler(playerName))
                                setSelectedTeam(true)
                            }}/>
                    </View>
                )
            }
            {
                ((selectedPlayer) && (option === 'ARTICLES_BY_PLAYER')) && (
                    <PlayerArticles />
                )
            }
            {
                ((selectedOption) && (option === 'ARTICLES_BY_SOURCE') && (!selectedSource)) && (
                    <View>
                            <Picker
                                selectedValue={source}
                                onValueChange={(itemValue, itemIndex) => setSource(itemValue)}
                            >
                                <Picker.Item label='NBA' value='nba' />
                                <Picker.Item label='NBA CANADA' value='nbacanada' />
                                <Picker.Item label='BLEACHER REPORT' value='bleacherreport' />
                                <Picker.Item label='ESPN' value='espn' />
                                <Picker.Item label='YAHOO' value='yahoo' />
                                <Picker.Item label='SLAM' value='slam' />
                            </Picker>
                            <Button title="Submit" onPress={() => {
                                dispatch(nbaSourceArticlesHandler(source))
                                setSelectedSource(true)
                            }}/>
                    </View>
                )
            }
            {
                ((selectedSource) && (option === 'ARTICLES_BY_SOURCE')) && (
                    <SourceArticles />
                )
            }
            <Button title="Reset" onPress={() => {
                setOption('ALL_ARTICLES')
                setSelectedOption(false)
                setSelectedTeam(false)
                setSelectedPlayer(false)
                setSelectedSource(false)
            }}/>
        </View>
    )
}

export default NbaNewsScreen