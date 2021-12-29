import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "./Constants/constants";
import AppNav from "./Routers/AppNav";
import AuthStack from "./Routers/AuthStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnBoard from "./Routers/OnBoardStack";
import AnimatedSplash from "react-native-animated-splash-screen";

const App = () =>{
  const [login,setLogin]=useState(false);
  const [onboard,setonboard]=useState(false);
  const [splash,setsplash]=useState(false);
  const checkOnboarding = async()=>{
    try {
     const value = await AsyncStorage.getItem('@viewedOnboarding');

     if(value !== null){
       setonboard(true)
     }

    } catch (error) {
      console.log("CheckOnboarding",error)
    }
  }
  const checkLogin = async()=>{
    try {
     const value = await AsyncStorage.getItem('@login');

     if(value !== null){
       setLogin(true)
     }

    } catch (error) {
      console.log("CheckOnboarding",error)
    }
  }
  useEffect(()=>{
    checkOnboarding();
    checkLogin();
    setsplash(true)
  },[])
  return(
    <NavigationContainer>
      <AnimatedSplash
        // translucent={true}
        isLoaded={splash}
        logoImage={require("../assets/logo/app_logo.png")}
        backgroundColor={"#fff"}
        logoHeight={150}
        logoWidth={150}
        // preload={true}
      >
        {
          onboard ? login ? <AppNav /> : <AuthStack /> : <OnBoard />
        }
      </AnimatedSplash>
    </NavigationContainer>
  )
}
const styles=StyleSheet.create({
  container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:Colors.color1
  }
})
export default App;