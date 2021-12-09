import React from 'react'
import { StyleSheet, Text, View,StatusBar } from 'react-native'
import { Colors } from '../../Constants/constants'

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
