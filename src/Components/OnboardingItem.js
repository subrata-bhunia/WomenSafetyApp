import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    useWindowDimensions
} from 'react-native';
import { FontFamily } from "../Constants/constants";

const OnboardingItem = ({item}) =>{
    const {width}=useWindowDimensions();
    return(
        <View style={[styles.container,{width}]}>
            <Image source={item.image} style={[styles.image,{width,resizeMode:'contain'}]} />
            <View style={{flex:0.3}}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        flex:0.7,
        justifyContent:'center'
    },
    title:{
        fontFamily:FontFamily.bold,
        textAlign:'center',
        fontSize:20,
        marginBottom:10,
        color:"#000",
        paddingHorizontal:50
    }
})
export default OnboardingItem;