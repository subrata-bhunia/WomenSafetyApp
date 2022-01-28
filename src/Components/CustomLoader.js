import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import AnimatedLottieView from "lottie-react-native";
const CustomLoader = ({loaderStyle,source,header}) => {
    const style = loaderStyle || {};
    const json = source || require('./json/loader-default.json')
    const isHeader = header || false
  return (
      <View style={[styles.container,{height: isHeader ? Dimensions.get("screen").height-170 :Dimensions.get("screen").height}]}>
          <AnimatedLottieView style={style} loop autoPlay source={json} />
      </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
    container:{
        height:Dimensions.get("screen").height,
        width:Dimensions.get('screen').width,
        justifyContent:'center',
        alignItems:'center'
    }
});
