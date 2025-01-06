import { API_URL } from "@/constants/api";
import { Colors } from "@/constants/Colors";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";

import * as Location from 'expo-location';
import {Marker} from 'react-native-maps';
import { useNavigation } from "expo-router";
export default function locations() { 
    const nav = useNavigation();  
    useEffect(() => {
        const unsubscribe = nav.addListener("focus", () => {
            Refresh();
        });
    
        return unsubscribe;
      }, [nav]);
    
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    useEffect(() => {
        getCurrentLocation();
    }, [])
    async function getCurrentLocation() {
      
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        setLocation(location);
      }
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
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: 90,
            width: "100%",
            backgroundColor: Colors.light.background
        }}>
            <Text style={{
                fontSize: 50,
                fontFamily: "Ssonder",
                color: "black",
                fontWeight: "bold", 
                zIndex: 10,
            }}>Locations</Text>
            <View style = {{
                padding: 20,
                
                width: "100%",
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                
            }}>
            {location && <MapView
            style = {{
                width: "100%",
                height: "80%",
                marginBottom: "40%",
                borderRadius: 20,
            }}
                initialRegion={{
                    latitude: location?.coords.latitude ||0 ,
                    longitude: location?.coords.longitude || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.042
                }}
            > {
                scoreboard.map((e) => {
                   return  e.locations.map((e: any) => {   
                    return <Marker key = {e} coordinate={{
                        latitude:e.split(",")[0],
                        longitude: e.split(",")[1]
                    }} />
                })
                })
            }</MapView>}
            </View>
        </View>
    )
}