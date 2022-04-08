import { Button, FlatList, Image, ListRenderItemInfo, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { setFavoritePlayersHandler } from '../../store/nba'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { FavoritesPlayersReturnType } from "../../types/redux/nba";
import { NbaModalScreenProps } from "../../types/screens/names";

function NbaFavoritesScreen() {
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation<NbaModalScreenProps>()
    const dispatch = useDispatch<AppDispatch>()
    const { data, loading } = useSelector((state:RootState) => state.nba)

    let imageSize = 80

    if (width < 380) {
        imageSize = 40
    }

    if (height < 420) {
        imageSize = 20
    }
    
    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

    useEffect(() => {
        dispatch(setFavoritePlayersHandler())
    }, [])

    function renderItem({ id, playerHeadshot, playerName, playerStats }: FavoritesPlayersReturnType) {
        return (
            <Pressable
                onPress={() => navigation.navigate('NbaFavoritesPlayerModal', {id, playerHeadshot, playerName, playerStats})}
            >
                <View style={styles.playerContainer}>
                    <View style={[styles.playerImageContainer, imageStyle]}>
                        <Image style={styles.playerImage} source={{uri: playerHeadshot}} />
                    </View>
                    <Text textBreakStrategy="simple" style={styles.playerText}>{playerName}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles.rootContainer}>
            <FlatList 
                keyExtractor={(item, index) => 'key'+index}
                data={data.favorites}
                renderItem={ ({item}:ListRenderItemInfo<FavoritesPlayersReturnType>) => renderItem(item)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    }, 
    playerImageContainer: {
        overflow: 'hidden',
        borderWidth: 3,
        margin: 36
    },
    playerImage: {
        height: '100%',
        width: '100%'
    },
    playerText: {
        fontSize: 36
    }
})

export default NbaFavoritesScreen