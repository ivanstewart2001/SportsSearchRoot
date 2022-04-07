import { Button } from "@rneui/base";
import { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View, Linking } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ArticlesReturnType } from "../../../types/nba/articles";
import LoadingOverlay from "../../UI/LoadingOverlay";

function TeamArticles() {
    const { data, loading } = useSelector((state:RootState) => state.nba)
    const [teamArticles, setTeamArticles] = useState<ArticlesReturnType[]>()

    useEffect(() => {
        setTeamArticles(data.news)
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

    return (
        <View>
            <Text>Team Articles</Text>
            {
                teamArticles && teamArticles?.length > 0 ? (
                    <FlatList
                        keyExtractor={(item, index) => 'key'+index}
                        data={teamArticles}
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

export default TeamArticles