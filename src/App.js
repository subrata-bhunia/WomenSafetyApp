import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View,StyleSheet, StatusBar } from "react-native";
import Onboarding from './Components/Onboarding';
import Permissions from "./Components/Permissions";
import { Colors } from "./Constants/constants";
import AuthStack from "./Routers/AuthStack";
import Login from "./Screens/Auth/Login";
import Home from "./Screens/Main/Home";
import StaticMap from "./Screens/Main/Home1";

const App = () =>{
  return(
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <AuthStack />
      {/* <Home /> */}
      {/* <StaticMap /> */}
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