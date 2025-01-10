import { Image, StyleSheet, Platform, View, Button, TextInput, Text, Touchable, TouchableOpacity } from 'react-native';
import { API_URL } from '@/constants/api';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol.ios';


export default function HomeScreen() {
  const navigation = useNavigation();
  const [username, setName] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('username').then((e) => {
      setName
    })
  }, [])
  const [model, setModel] = useState(false);

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
    
    console.log(scoreboard)
  return (
    <View style={{
      backgroundColor: Colors.light.background,
      width: "100%",
      height: "100%",
    }}>
      {
        model && <View style={{
          position: 'absolute',
          zIndex: 9000,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            width: "80%",
            height: "40%",
            backgroundColor: 'white',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            padding: 20,
          }}>
            <ThemedText
            style={{
              fontSize: 20,
              fontFamily: 'ZTFormom',
            }}
            > Enter your name</ThemedText>
            <TextInput onChangeText={(e) => {
              setName(e);
            }} style={{
              width: "100%",
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 10,
              textAlign: 'center',
            }}></TextInput>
            <Button title='Submit' onPress={(e) => {
              setModel(false);
              AsyncStorage.setItem('username', username);

            }}></Button>
          </View>
        </View>
      }
      <View style={{
        position: 'absolute',
        left: 0,
        top: 300,
        zIndex: 10,
        width: "100%",
      }}>{username != '' ? <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}><ThemedText
      style={{
        fontFamily: 'ZTFormom',
        fontSize: 20,
        textAlign: 'center',
        width: "100%"
      }}
      > Hi {username}</ThemedText> </View> : <View style = {{
        
      }}><TouchableOpacity  onPress={(e) => {
        setModel(true);
      }}> <Text style = {{
        fontFamily: 'Ssonder',
        fontSize: 25,
        color: Colors.light.highlight,
        textAlign: 'center',
      }}>Sign Up</Text></TouchableOpacity> </View>}</View>
      <View style={{
        width: "100%",
        height: "100%",
        alignItems: 'center',
        
        justifyContent: 'space-between',
        marginTop: 50,
        marginBottom: 200,
      }}> <View>

          <View  style = {{
            marginBottom: 230,
          }}> <Text style={{
            marginTop: 120,
            width: 300,
            height: 130,
            left: -10,
            fontFamily: 'Bomeffa',
            fontSize: 80,
            color: '#5A3400',
          }}> SCRAP
            </Text>
          <Text style={{
            width: 300,
            marginTop: -85,
            left: 100,
            height: 130,
            fontFamily: 'ZTFormom',
            fontSize: 80,
          }}> BOARD</Text>
          </View>
          <View style={{
            width: "100%",
            flexDirection: 'row',
            gap: 20,
            paddingTop: 10,
          }}>
              <TouchableOpacity 
              onPress={
                (e) => {
                  navigation.navigate('submit')
                }
              }
              style={
                {
                  width: "40%",
                  backgroundColor: Colors.light.background,
                  minHeight: 90,
                  borderRadius: 20,
                  paddingBottom: 30,
                  shadowColor: Colors.light.highlight,
                  shadowOpacity: 0.25,
                  shadowRadius: 30,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                }
              }><View style={{ width: "100%", left:0, top:0 , borderRadius: 20, position: "absolute", height: "150%", overflow:'hidden' }}>
              <Text style={{overflow:'hidden',
              position: "absolute",
              borderRadius: 20,
              left: -4,
              top: -6,
              width: "400%",
              fontFamily:'PromisedFreyna',
              color:'#5A3400', 
              fontSize: 25,
              
              }}>
                COLLECTED TRASH COLLECTED TRASH
              </Text>
              <IconSymbol size={80} name="trash" color={"#E7D4BD"} 
                style={{
                  position: 'absolute',
                  bottom: -20,
                  left: -7,
                  transform: [{ rotate: '-24deg' }]

                }}
                />
          </View></TouchableOpacity>

            <TouchableOpacity onPress = {
              (e) => {
                
                
              }
              }
              
              style={
              {
                width: "40%",
                  backgroundColor: Colors.light.background,
                  minHeight: 90,
                  borderRadius: 20,
                  paddingBottom: 30,
                  shadowColor: Colors.light.highlight,
                  shadowOpacity: 0.25,
                  shadowRadius: 30,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  
              }
            }>
              <View style={{ width: "100%", left:0,  borderRadius: 20, position: "absolute", height: "150%", overflow:'hidden'}}>
                <Text style={{overflow:'hidden',
                position: "absolute",
                borderRadius: 20,
                left: -4,
                bottom: -10,
                width: "200%",
                fontFamily:'PromisedFreyna',
                color:'#5A3400', 
                fontSize: 25,
                }}>
                  LEADERBOARD LEADERBOARD
                </Text>
                <IconSymbol size={80} name="scroll" color={"#E7D4BD"} 
                style={{
                  position: 'absolute',
                  top: -20,
                  left: 0,
                  transform: [{ rotate: '-17deg' }]

                }}
                />
                <View 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  height: '100%',
                  padding: 20,
                  
                }}
                >
                {scoreboard.map((e, i) => {
                  if (e.username == username) {
                    let suffix = ''

                    if (i == 0) {
                      suffix = 'st'
                    } else if (i == 1) {
                      suffix = 'nd'
                    } else if (i == 2) {
                      suffix = 'rd'
                    } else {
                      suffix = 'th'
                    }

                    return <Text 
                    style={{
                      textAlign: 'right',
                      fontSize: 20,
                      fontFamily: 'ZTFormom',
                      color: '#5A3400',
                    }}
                  
                    key={i}>{i+1}{suffix}</Text>
                  }
                  return<></>
                })}
                </View>

            </View>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
