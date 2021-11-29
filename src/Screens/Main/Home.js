import React,{useEffect, useState} from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../Constants/constants';
import MapView, { Marker } from 'react-native-maps';
import GetLocation ,{PROVIDER_GOOGLE} from 'react-native-get-location';
import {BallIndicator} from 'react-native-indicators';
import { UIStore } from '../../UIStore';
const Home = () => {
    const currentLocation = UIStore.useState(s=>s.lastLocation)
    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy:true,
            timeout:15000
        }).then((location)=>{
            UIStore.update(s=>{
                s.lastLocation = location;
            })
        })
        .catch((err)=>console.log(err))
    }, [])
    console.log("currentLocation =>",currentLocation)
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            {
                currentLocation === null ? <BallIndicator />: (
                    <MapView
                        initialRegion={{
                            latitude:currentLocation.latitude,
                            // latitude:22.572645,
                            longitude: currentLocation.longitude ,
                            // longitud,
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2,
                            }}
                        style={{
                            height:'100%',
                            width:'100%'
                        }}
                    >
                        <Marker
                         coordinate={{
                             latitude:currentLocation.latitude,
                             longitudeDelta:0.01,
                             longitude:currentLocation.longitude,
                             latitudeDelta:0.11
                             }} 
                        //  pinColor='red'
                         image={require('../../../assets/images/icons/green.png')}
                         title="Your Current Location"
                         description="Good To see you"
                         />
                        <Marker
                         coordinate={{
                             latitude:currentLocation.latitude+0.022,
                             longitudeDelta:0.1,
                             longitude:currentLocation.longitude+0.022,
                             latitudeDelta:0.1
                             }} 
                        //  pinColor='red'
                         image={require('../../../assets/images/icons/red.png')}
                         title="Test Title"
                         description="Test Description"
                         />
                        <Marker
                         coordinate={{
                             latitude:currentLocation.latitude-0.022,
                             longitudeDelta:0.1,
                             longitude:currentLocation.longitude-0.062,
                             latitudeDelta:0.1
                             }} 
                        //  pinColor='red'
                         image={require('../../../assets/images/icons/red.png')}
                         />
                    </MapView>
                )
            }
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:Colors.color5
  }
})