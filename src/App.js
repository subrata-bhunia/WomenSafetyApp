import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "./Constants/constants";
import AppNav from "./Routers/AppNav";
import AuthStack from "./Routers/AuthStack";


const App = () =>{
  const [login,setLogin]=useState(true);
  return(
    <NavigationContainer>
      
      {
        login ? <AppNav /> : <AuthStack />
      }
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