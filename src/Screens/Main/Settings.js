import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomLoader from '../../Components/CustomLoader'

const Settings = () => {
    return (
        <View style={styles.container}>
             <CustomLoader
              loaderStyle={{height:500,width:500}} 
              source={require('../../Components/json/tips.json')} />
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})
