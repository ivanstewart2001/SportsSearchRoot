import { useLayoutEffect } from 'react'
import { Alert, FlatList, Image, ListRenderItemInfo, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import PlayerStats from '../../components/nba/PlayerStats'
import IconButton from '../../components/UI/IconButton'
import { NbaPlayerStatsType } from '../../types/nba/playerStats'
import { NbaFavoritePlayerModalProp } from '../../types/screens/names'
import { removePlayerFromFavoritesHandler } from '../../store/nba'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'

function NbaFavoritesPlayerModal({ route, navigation }:NbaFavoritePlayerModalProp) {
    const { 
        id,
        playerHeadshot,
        playerName,
        playerStats
    } = route.params

    const { width, height } = useWindowDimensions()
    const dispatch = useDispatch<AppDispatch>()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: playerName,
            headerRight: () => (
                <IconButton
                    icon='close-outline'
                    title='Remove'
                    componentStyles={{borderRadius:0}}
                    containerStyles={{borderRadius:0}}
                    onPressProp={() => {
                        dispatch(removePlayerFromFavoritesHandler({id:id?id:'break'}))
                        navigation.goBack()
                    }}
                    size={24}
                    titleStyles={{borderRadius:0}}
                    color='red'
                />
            )
        })
    }, [])

    let imageSize = 300

    if (width < 380) {
        imageSize = 150
    }

    if (height < 420) {
        imageSize = 80
    }
    
    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

    function convertToPercent(value:string|undefined) {
        if (value) {
            const converted = Number(value) * 100
            return Math.round(converted).toString() + '%'
        } else {
            return 'No Value'
        }
    }

    function renderItem(item:NbaPlayerStatsType) {
        const { SEASON, TEAM, G, MP, FG, FGA, FT, FTA, BLK, AST, STL, TOV, TRB, PTS } = item
        return (
            <View style={styles.container}>
                <Text>Season: {SEASON || 'No value'}</Text>
                <Text>Team: {TEAM || 'No value'}</Text>
                <Text>Games Played: {G || 'No value'}</Text>
                <Text>Field Goals: {FG || 'No value'}</Text>
                <Text>Field Goals Attempted: {FGA || 'No value'}</Text>
                <Text>Field Goal Percentage: {item['FG%'] || 'No value'}</Text>
                <Text>Minutes Played: {MP || 'No value'}</Text>
                <Text>3 Points: {item['3P'] || 'No value'}</Text>
                <Text>3 Points Attempted: {item['3PA'] || 'No value'}</Text>
                <Text>3 Point Percentage: {convertToPercent(item['3P%'].toString())}</Text>
                <Text>2 Points: {item['2P'] || 'No value'}</Text>
                <Text>2 Points Attempted: {item['2PA'] || 'No value'}</Text>
                <Text>2 Point Percentage: {convertToPercent(item['2P%'].toString())}</Text>
                <Text>Free Throws: {FT || 'No value'}</Text>
                <Text>Free Throws Attempted: {FTA || 'No value'}</Text>
                <Text>Free Throw Percentage: {convertToPercent(item['FT%'].toString())}</Text>
                <Text>Points: {PTS || 'No value'}</Text>
                <Text>Total Rebounds: {TRB || 'No value'}</Text>
                <Text>Assists: {AST || 'No value'}</Text>
                <Text>Steals: {STL || 'No value'}</Text>
                <Text>Blocks: {BLK || 'No value'}</Text>
                <Text>Turnovers: {TOV || 'No value'}</Text>
                <Text></Text>
            </View>
        )
    }

    return (
        <View style={styles.rootContainer}>
            <View style={[styles.imageContainer, imageStyle]}>
                <Image source={{uri:playerHeadshot}} style={styles.image} />
            </View>
            <FlatList 
                keyExtractor={(item, index) => 'key'+index}
                data={playerStats}
                renderItem={ ({item}:ListRenderItemInfo<NbaPlayerStatsType>) => renderItem(item)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    image: {
        height: '100%',
        width: '100%'
    },
    imageContainer: {
        overflow: 'hidden',
        borderWidth: 3,
        margin: 36
    },
    container: {
        borderWidth: 2,
        margin: 10
    }
})

export default NbaFavoritesPlayerModal