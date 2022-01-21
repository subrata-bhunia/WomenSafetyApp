import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../Components/Header'
import { UIStore } from '../../UIStore'

const SafetyTips = () => {
    const url = UIStore.useState(s=> s.localUrl);
    const [SafetyTips,setSafetyTips]=useState([]);
    // ------------- API FOR SAFETY TIPS ---------------- //
    // const apiUrl=url+'/safety-tips'
    // const apiCall = () => {
    //     axios({
    //         method:'GET',
    //         url:apiUrl
    //     }).then(res =>console.log(res.data.data))
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }
    // useEffect(()=>{
    //     apiCall()
    // },[])
    return (
        <View>
           <Header
            name="Safety Tips"
            backBtn={true}
            />
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
