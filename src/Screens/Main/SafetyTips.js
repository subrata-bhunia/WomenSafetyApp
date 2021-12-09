import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SafetyTips = () => {
    return (
        <View style={styles.container}>
            <Text>SafetyTips</Text>
        </View>
    )
}

export default SafetyTips

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
