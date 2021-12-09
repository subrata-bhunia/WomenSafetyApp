import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../Constants/constants'
import {UIStore} from '../../UIStore';
import DeviceInfo from 'react-native-device-info';
const About = () => {
    
    const brand = UIStore.useState(s=>s.brandName);
    const deviceId = UIStore.useState(s=>s.deviceId);
    console.log(brand)
    return (
        <View style={styles.container}>
            <Text style={{textTransform:'capitalize'}}>
                {DeviceInfo.getBrand()}
            </Text>
            <Text>
                {deviceId}
            </Text>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
