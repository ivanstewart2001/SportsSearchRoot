import { Button } from "@rneui/base";
import { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View, Linking } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ArticlesReturnType } from "../../../types/nba/articles";
import LoadingOverlay from "../../UI/LoadingOverlay";

function PlayerArticles() {
    const { data, loading } = useSelector((state:RootState) => state.nba)
    const [playerArticles, setplayerArticles] = useState<ArticlesReturnType[]>()

    useEffect(() => {
        setplayerArticles(data.news)
    }, [loading])

    function renderItem({ source, title, url }:ArticlesReturnType) {
        return (
            <View style={styles.articleContainer}>
                <Text>Source: {source}</Text>
                <Text>Title: {title}</Text>
                <Button 
                    title="Open Link"
                    onPress={() => Linking.openURL(url)}
                />
            </View>
        )
    }

    if (loading) {
        return <LoadingOverlay />
    }

    console.log(data.news)

    return (
        <View>
            <Text>Team Articles</Text>
            {
                playerArticles && playerArticles?.length > 0 ? (
                    <FlatList
                        keyExtractor={(item, index) => 'key'+index}
                        data={playerArticles}
                        renderItem={ ({item}:ListRenderItemInfo<ArticlesReturnType>) => renderItem(item)}
                    />
                ) : (
                    <Text>No Articles! Check Back Later!</Text>
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    articleContainer: {
        borderWidth: 2
    }
})

export default PlayerArticles