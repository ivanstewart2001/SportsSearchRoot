import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { AllStatsType, NbaCompareFullProps } from "../../types/nba/compare";
import { NbaPlayerStatsType } from "../../types/nba/playerStats";
import formatStats from "../../util/nba/compare";



function NbaCompare(data:NbaCompareFullProps) {
    const { player1, player2 } = data
    const [player1Stats, setPlayer1Stats] = useState<AllStatsType>()
    const [player2Stats, setPlayer2Stats] = useState<AllStatsType>()

    useEffect(() => {
        console.log('running again')
        if (player1 && player2) {
            setPlayer1Stats(formatStats(player1.stats))
            setPlayer2Stats(formatStats(player2.stats))
        }
    }, [])

    const { width, height } = useWindowDimensions()

    let imageSize = 120

    if (width < 380) {
        imageSize = 70
    }

    if (height < 420) {
        imageSize = 45
    }
    
    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

    function compareCategory(player1Stat:number|undefined, player2Stat:number|undefined, negative:boolean) {
        if (negative) {
            if (player1Stat && player2Stat) {
                if (player1Stat < player2Stat) {
                    return 'p1'
                } else if (player2Stat < player1Stat) {
                    return 'p2'
                } else if (player1Stat === player2Stat) {
                    return 'both'
                }
            } else if (!player1Stat && player2Stat) {
                return 'p1'
            } else if (player1Stat && !player2Stat) {
                return 'p2'
            } else if (!player1Stat && !player2Stat) {
                return 'both'
            }
        } else {
            if (player1Stat && player2Stat) {
                if (player1Stat > player2Stat) {
                    return 'p1'
                } else if (player2Stat > player1Stat) {
                    return 'p2'
                } else if (player1Stat === player2Stat) {
                    return 'both'
                }
            } else if (!player1Stat && player2Stat) {
                return 'p2'
            } else if (player1Stat && !player2Stat) {
                return 'p1'
            } else if (!player1Stat && !player2Stat) {
                return 'both'
            }
        }
    }

    function determineStyle(type:string|undefined, current:string) {
        if (type === current) {
            return 'green'
        } else if ( (type !== current) && (type !== 'both') ) {
            return 'red'
        } else if ( type === 'both' ) {
            return 'orange'
        }
    }

    function category(categoryName:string, color: string|undefined, value: number|undefined, percent:boolean) {
        return (
            <View style={[{backgroundColor: color}]}>
                <Text>{categoryName}: {value ? value : 'No value'} {percent ? '%' : null}</Text>
            </View>
        )
    }

    function formatNumber(num:number|undefined, percent: boolean) {
        if (percent) {
            return Number((Number(num?.toFixed(4)) * 100).toFixed(2))
        }
        return Number(num?.toFixed(2))
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.indidualContainer}>
                    <View style={[styles.imageContainer, imageStyle]}>
                        <Image source={{uri:player1?.headshot}} style={styles.image} />
                    </View>
                    <Text>Career Categories</Text>
                    {category('Seasons Played', determineStyle(compareCategory(player1Stats?.SEASON, player2Stats?.SEASON, false), 'p1'), player1Stats?.SEASON, false)}
                    {category('Games Played', determineStyle(compareCategory(player1Stats?.G, player2Stats?.G, false), 'p1'), player1Stats?.G, false)}
                    {category('Games Starting', determineStyle(compareCategory(player1Stats?.GS, player2Stats?.GS, false), 'p1'), player1Stats?.GS, false)}
                    <Text>Per Game Categories</Text>
                    {category('Minutes Played', determineStyle(compareCategory(player1Stats?.MP, player2Stats?.MP, false), 'p1'), formatNumber(player1Stats?.MP, false), false)}
                    {category('Field Goals Made', determineStyle(compareCategory(player1Stats?.FG, player2Stats?.FG, false), 'p1'), formatNumber(player1Stats?.FG, false), false)}
                    {category('FG Attempted', determineStyle(compareCategory(player1Stats?.FGA, player2Stats?.FGA, false), 'p1'), formatNumber(player1Stats?.FGA, false), false)}
                    {category('FG Percentage', determineStyle(compareCategory(player1Stats?.["FG%"], player2Stats?.["FG%"], false), 'p1'), formatNumber(player1Stats?.["FG%"], true), true)}
                    {category('Three Points Made', determineStyle(compareCategory(player1Stats?.["3P"], player2Stats?.["3P"], false), 'p1'), formatNumber(player1Stats?.["3P"], false), false)}
                    {category('3P Attempted', determineStyle(compareCategory(player1Stats?.["3PA"], player2Stats?.["3PA"], false), 'p1'), formatNumber(player1Stats?.["3PA"], false), false)}
                    {category('3P Percentage', determineStyle(compareCategory(player1Stats?.["3P%"], player2Stats?.["3P%"], false), 'p1'), formatNumber(player1Stats?.["3P%"], true), true)}
                    {category('Two Points Made', determineStyle(compareCategory(player1Stats?.["2P"], player2Stats?.["2P"], false), 'p1'), formatNumber(player1Stats?.["2P"], false), false)}
                    {category('2P Attempted', determineStyle(compareCategory(player1Stats?.["2PA"], player2Stats?.["2PA"], false), 'p1'), formatNumber(player1Stats?.["2PA"], false), false)}
                    {category('2P Percentage', determineStyle(compareCategory(player1Stats?.["2P%"], player2Stats?.["2P%"], false), 'p1'), formatNumber(player1Stats?.["2P%"], true), true)}
                    {category('Free Throws Made', determineStyle(compareCategory(player1Stats?.["FT"], player2Stats?.["FT"], false), 'p1'), formatNumber(player1Stats?.["FT"], false), false)}
                    {category('FT Attempted', determineStyle(compareCategory(player1Stats?.["FTA"], player2Stats?.["FTA"], false), 'p1'), formatNumber(player1Stats?.["FTA"], false), false)}
                    {category('FT Percentage', determineStyle(compareCategory(player1Stats?.["FT%"], player2Stats?.["FT%"], false), 'p1'), formatNumber(player1Stats?.["FT%"], true), true)}
                    {category('Offensive Rebounds', determineStyle(compareCategory(player1Stats?.["ORB"], player2Stats?.["ORB"], false), 'p1'), formatNumber(player1Stats?.["ORB"], false), false)}
                    {category('Defensive Rebounds', determineStyle(compareCategory(player1Stats?.["DRB"], player2Stats?.["DRB"], false), 'p1'), formatNumber(player1Stats?.["DRB"], false), false)}
                    {category('Total Rebounds', determineStyle(compareCategory(player1Stats?.["TRB"], player2Stats?.["TRB"], false), 'p1'), formatNumber(player1Stats?.["TRB"], false), false)}
                    {category('Assists', determineStyle(compareCategory(player1Stats?.["AST"], player2Stats?.["AST"], false), 'p1'), formatNumber(player1Stats?.["AST"], false), false)}
                    {category('Steals', determineStyle(compareCategory(player1Stats?.["STL"], player2Stats?.["STL"], false), 'p1'), formatNumber(player1Stats?.["STL"], false), false)}
                    {category('Blocks', determineStyle(compareCategory(player1Stats?.["BLK"], player2Stats?.["BLK"], false), 'p1'), formatNumber(player1Stats?.["BLK"], false), false)}
                    {category('Turnovers', determineStyle(compareCategory(player1Stats?.["TOV"], player2Stats?.["TOV"], true), 'p1'), formatNumber(player1Stats?.["TOV"], false), false)}
                    {category('Points', determineStyle(compareCategory(player1Stats?.["PTS"], player2Stats?.["PTS"], false), 'p1'), formatNumber(player1Stats?.["PTS"], false), false)}
                </View>

                <View style={styles.indidualContainer}>
                    <View style={[styles.imageContainer, imageStyle]}>
                        <Image source={{uri:player2?.headshot}} style={styles.image} />
                    </View>
                    <Text>Career Categories</Text>
                    {category('Seasons Played', determineStyle(compareCategory(player1Stats?.SEASON, player2Stats?.SEASON, false), 'p2'), player2Stats?.SEASON, false)}
                    {category('Games Played', determineStyle(compareCategory(player1Stats?.G, player2Stats?.G, false), 'p2'), player2Stats?.G, false)}
                    {category('Games Starting', determineStyle(compareCategory(player1Stats?.GS, player2Stats?.GS, false), 'p2'), player2Stats?.GS, false)}
                    <Text>Per Game Categories</Text>
                    {category('Minutes Played', determineStyle(compareCategory(player1Stats?.MP, player2Stats?.MP, false), 'p2'), formatNumber(player2Stats?.MP, false), false)}
                    {category('Field Goals Made', determineStyle(compareCategory(player1Stats?.FG, player2Stats?.FG, false), 'p2'), formatNumber(player2Stats?.FG, false), false)}
                    {category('FG Attempted', determineStyle(compareCategory(player1Stats?.FGA, player2Stats?.FGA, false), 'p2'), formatNumber(player2Stats?.FGA, false), false)}
                    {category('FG Percentage', determineStyle(compareCategory(player1Stats?.["FG%"], player2Stats?.["FG%"], false), 'p2'), formatNumber(player2Stats?.["FG%"], true), true)}
                    {category('Three Points Made', determineStyle(compareCategory(player1Stats?.["3P"], player2Stats?.["3P"], false), 'p2'), formatNumber(player2Stats?.["3P"], false), false)}
                    {category('3P Attempted', determineStyle(compareCategory(player1Stats?.["3PA"], player2Stats?.["3PA"], false), 'p2'), formatNumber(player2Stats?.["3PA"], false), false)}
                    {category('3P Percentage', determineStyle(compareCategory(player1Stats?.["3P%"], player2Stats?.["3P%"], false), 'p2'), formatNumber(player2Stats?.["3P%"], true), true)}
                    {category('Two Points Made', determineStyle(compareCategory(player1Stats?.["2P"], player2Stats?.["2P"], false), 'p2'), formatNumber(player2Stats?.["2P"], false), false)}
                    {category('2P Attempted', determineStyle(compareCategory(player1Stats?.["2PA"], player2Stats?.["2PA"], false), 'p2'), formatNumber(player2Stats?.["2PA"], false), false)}
                    {category('2P Percentage', determineStyle(compareCategory(player1Stats?.["2P%"], player2Stats?.["2P%"], false), 'p2'), formatNumber(player2Stats?.["2P%"], true), true)}
                    {category('Free Throws Made', determineStyle(compareCategory(player1Stats?.["FT"], player2Stats?.["FT"], false), 'p2'), formatNumber(player2Stats?.["FT"], false), false)}
                    {category('FT Attempted', determineStyle(compareCategory(player1Stats?.["FTA"], player2Stats?.["FTA"], false), 'p2'), formatNumber(player2Stats?.["FTA"], false), false)}
                    {category('FT Percentage', determineStyle(compareCategory(player1Stats?.["FT%"], player2Stats?.["FT%"], false), 'p2'), formatNumber(player2Stats?.["FT%"], true), true)}
                    {category('Offensive Rebounds', determineStyle(compareCategory(player1Stats?.["ORB"], player2Stats?.["ORB"], false), 'p2'), formatNumber(player2Stats?.["ORB"], false), false)}
                    {category('Defensive Rebounds', determineStyle(compareCategory(player1Stats?.["DRB"], player2Stats?.["DRB"], false), 'p2'), formatNumber(player2Stats?.["DRB"], false), false)}
                    {category('Total Rebounds', determineStyle(compareCategory(player1Stats?.["TRB"], player2Stats?.["TRB"], false), 'p2'), formatNumber(player2Stats?.["TRB"], false), false)}
                    {category('Assists', determineStyle(compareCategory(player1Stats?.["AST"], player2Stats?.["AST"], false), 'p2'), formatNumber(player2Stats?.["AST"], false), false)}
                    {category('Steals', determineStyle(compareCategory(player1Stats?.["STL"], player2Stats?.["STL"], false), 'p2'), formatNumber(player2Stats?.["STL"], false), false)}
                    {category('Blocks', determineStyle(compareCategory(player1Stats?.["BLK"], player2Stats?.["BLK"], false), 'p2'), formatNumber(player2Stats?.["BLK"], false), false)}
                    {category('Turnovers', determineStyle(compareCategory(player1Stats?.["TOV"], player2Stats?.["TOV"], true), 'p2'), formatNumber(player2Stats?.["TOV"], false), false)}
                    {category('Points', determineStyle(compareCategory(player1Stats?.["PTS"], player2Stats?.["PTS"], false), 'p2'), formatNumber(player2Stats?.["PTS"], false), false)}
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    indidualContainer: {
        borderWidth: 1,
    },
    image: {
        height: '100%',
        width: '100%'
    },
    imageContainer: {
        overflow: 'hidden',
        borderWidth: 3,
        margin: 30
    }
})

export default NbaCompare

