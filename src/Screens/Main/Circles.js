import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Circles = () => {
    return (
        <View style={styles.container}>
            <Text>Circles</Text>
        </View>
    )
}

export default Circles

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
