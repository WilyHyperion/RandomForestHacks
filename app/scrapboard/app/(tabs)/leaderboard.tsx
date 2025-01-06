import { ThemedText } from '@/components/ThemedText';
import { API_URL } from '@/constants/api';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Text, View, FlatList, Button } from 'react-native';
import { Colors } from '@/constants/Colors';
import { catagories, catagoryEmojis } from '@/constants/Trash';
import * as Font from 'expo-font';
import { useNavigation } from 'expo-router';

export default function Leaderboard() {
    const nav = useNavigation();  
    useEffect(() => {
        const unsubscribe = nav.addListener("focus", () => {
            Refresh();
        });
    
        return unsubscribe;
      }, [nav]);
    const [scoreboard, setScoreboard] = useState([] as any[]);
    function Refresh() {
        fetch(API_URL + "api/getScoreboard").then((e) => {
            return e.json();
        }).then((e) => {
            setScoreboard(e)
        })
    }
    useEffect(() => {
        fetch(API_URL + "api/getScoreboard").then((e) => {
            return e.json();
        }).then((e) => {
            setScoreboard(e)
        })
    }, [])
    return (<View style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 90,
        backgroundColor: Colors.light.background,
        width: "100%",
    }}>

        <View><ThemedText type="title" style={{fontFamily: "Ssonder", fontSize: 35}}>Leaderboard</ThemedText><Button title='Refresh' onPress={
            Refresh
        } ></Button></View>
        <FlatList style = {{
            width: "100%",
            height: "100%",
            padding: 10,
        }} data={[null, ...scoreboard]} renderItem={(e) => {
            if(e.item == null ){
                return <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.light.highlight
        
                }}>
                    <ThemedText style={{    
                        fontSize: 20,
                        width: "30%",
                        height: 30,
                        fontFamily: "Ssonder"
                    }}>Username </ThemedText>  <Text style = {{
                        width: "10%",
                        height: 30,
                        fontFamily: "Ssonder"
                    }}>Score </Text> {catagories.map((e) => {
                        return <Text style = {{
                            width: "10%"
                            //@ts-ignore
                        }}>{catagoryEmojis[e as any] as any} </Text>
                    })}
                </View>
            }
            let scores = {} as any;
            for (let v of e.item.type) {
                if (scores[v]) {
                    scores[v] += 1;
                }
                else {
                    scores[v] = 1;
                }
            }
            console.log(e.item)
            return <View style={{
                width: "100%",
                height: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: Colors.light.highlight,
            }}>
                <ThemedText style={{    
                    fontSize: 15,
                    width: "30%",
                }}>{e.item.username} </ThemedText>  <Text style = {{
                    width: "10%"
                }}>{e.item.score} </Text> {catagories.map((e) => {
                    console.log(e)
                    return <Text style = {{
                        width: "10%"
                    }}>{scores[e] || 0} </Text>
                })}
            </View>
        }}>

        </FlatList>
    </View>
    )
}