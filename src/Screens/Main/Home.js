import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../Constants/constants';
import MapView from 'react-native-maps';
import GetLocation ,{PROVIDER_GOOGLE} from 'react-native-get-location';
const Home = () => {
    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy:true,
            timeout:15000
        }).then((location)=>console.log(location))
        .catch((err)=>console.log(err))
    }, [])
    return (
        <View style={styles.container}>
            <MapView
                region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            />
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