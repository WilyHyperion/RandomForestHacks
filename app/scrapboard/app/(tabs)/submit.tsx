import { ThemedText } from "@/components/ThemedText";
import { Button, Text, View, TouchableOpacity } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from "react";
import { API_URL, CLASSIFIER_URL } from "@/constants/api";
import { Colors } from "@/constants/Colors";
import * as Font from 'expo-font';
import * as FileSystem from 'expo-file-system';

import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLoadedFonts } from "expo-font";

export default function submit() {
    const [type, setType] = useState("");
    async function getCurrentLocation() {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        return location;
    }
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef(null as any);
    console.log(getLoadedFonts());
    return (<View style={{
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: 'center',
        paddingTop: 90,
        backgroundColor: Colors.light.background
    }}>
        {type!= "" && <View style = {{
            position: 'absolute',
            width: "100%",
            height: "100%",
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
        }}>
            <View style = {{
                width: "80%",
                height: "50%",
                backgroundColor: Colors.light.background,
                borderRadius: 20,
                marginTop: 100,
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
               <TouchableOpacity onPress={
                 (e) => {
                        setType("");
                 }
               } style = {{
                     position: 'absolute',
                     top: 10,
                     left: 10
               }}>
                <Text style = {{
                    fontFamily: 'Ssonder',
                    fontSize: 25
                }}>X</Text>
               </TouchableOpacity>
                <Text style = {{
                    fontFamily: 'Ssonder',
                    fontSize: 50
                }}>You found {type}!</Text> </View>
            </View>}
        {!permission && <Button onPress={requestPermission} title="grant permission" />}
        <Text style={{ fontFamily: 'Ssonder', fontSize: 50 }}>SCAN</Text>
        <View style={{ width: 400, height: 400, borderRadius: 20, overflow: 'hidden', marginTop: 20 }}>
            <CameraView style={{ width: 400, height: 400 }} facing="back" ref={ref}><View>
            </View></CameraView>
        </View>
        <TouchableOpacity style={{
            width: "30%",
            height: "5%",
            backgroundColor: Colors.light.highlight,
            borderRadius: 40,
            marginTop: 15,
            shadowColor: Colors.light.highlight,
            shadowOpacity: 0.55,
            shadowRadius: 30,
            shadowOffset: {
                width: 0,
                height: 0,
            }

        }}>
            <Button title="Click!"
                color={Colors.light.background}
                onPress={() => {
                    if (ref.current) {
                        ref.current.takePictureAsync().then(async (e: { uri?: any; height?: any; width?: any; exif : any,   base64 : any }) => {
                            const base64 = await FileSystem.readAsStringAsync(e.uri, { encoding: 'base64' });
                            const location = await getCurrentLocation();
                           let v = await (fetch(CLASSIFIER_URL, {
                                method: "POST",
                                body: JSON.stringify({
                                    image: base64
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then((e) => {
                                return e.json();
                            }))
                            console.log("ran", v)
                            setType(v.predicted_class);
                            fetch(API_URL + "api/addTrash", {
                                method: "POST",
                                body: JSON.stringify({
                                    username: await AsyncStorage.getItem("username"),
                                    //@ts-ignore
                                    location: (location?.coords.latitude + Math.random() * 10 - 5) + "," + (location?.coords.longitude + Math.random() * 10 - 5),
                                    type: v.predicted_class
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then((e) => {
                                return e.json();
                            }).then((e) => {
                                console.log(e)
                            })
                            console.log("done");
                        })
                    }

                }}></Button>
        </TouchableOpacity>
    </View>

    )
}