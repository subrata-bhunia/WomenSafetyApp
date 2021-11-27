import React from "react";
import { View,StyleSheet, StatusBar } from "react-native";
import Onboarding from './Components/Onboarding';
import Permissions from "./Components/Permissions";
import { Colors } from "./Constants/constants";

const App = () =>{
  return(
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.color5} barStyle="dark-content" />
      {/* <Onboarding /> */}
      <Permissions />
    </View>
  )
}
const styles=StyleSheet.create({
  container:{
      flex:1,
      // justifyContent:"center",
      // alignItems:"center",
      backgroundColor:Colors.color5
  }
})
export default App;