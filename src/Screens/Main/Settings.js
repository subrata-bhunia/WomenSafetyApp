import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ContactList from '../../Components/ContactList'
import CustomLoader from '../../Components/CustomLoader'
import Header from '../../Components/Header'

const Settings = () => {
    return (
        <View style={styles.container}>
            <Header backBtn={true} name="Settings" />
             {/* <CustomLoader loaderStyle={{height:100,width:100}} /> */}
             <ContactList />
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
