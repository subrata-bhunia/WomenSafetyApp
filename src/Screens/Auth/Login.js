import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity} from 'react-native'
import {Input} from 'galio-framework';
import { Colors, FontFamily, Sizes } from '../../Constants/constants';
import { NeuButton } from 'neumorphism-ui';
import { useNavigation } from '@react-navigation/core';
import Button from '../../Components/Button';
const Login = () => {
    const {width}=useWindowDimensions();
    const navigation = useNavigation();
    return (
        <View style={[styles.container,{width}]}>
            <Image source={require('../../../assets/images/ui-images/login.png')} style={[styles.image,{width,resizeMode:'contain'}]} />
            <View style={{flex:0.7}}>
                <Input
                 placeholder="Enter your email address" 
                 rounded 
                 type='email-address' 
                 style={[styles.input,{width:width*0.9}]} 
                 />
                <Input
                 placeholder="Enter your Password" 
                 password 
                 viewPass 
                 rounded 
                 type='numbers-and-punctuation'
                 style={[styles.input,{width:width*0.9}]}
                 iconColor="#999"
                 />
                <View style={{alignItems:"center",alignSelf:"center",marginTop:10}}>
                    <Button
                     onPress={()=>navigation.navigate('Home')} 
                     btnStyle={{
                         height: 55,
                         width:Sizes.ScreenWidth*0.5, 
                         borderRadius: 50,
                         backgroundColor:Colors.color4 
                         }} 
                     textStyle={{
                         fontFamily:FontFamily.semi_bold,
                         color:"#000"
                        }}
                     btnName="Sign in now"
                    />
                    <TouchableOpacity style={{}} onPress={()=>console.log('Forget Pass')}>
                        <Text style={{textAlign:'center',textDecorationStyle:'dotted',textDecorationLine:'underline',fontFamily:FontFamily.semi_bold,padding:20}}>Forget Password ?</Text>
                    </TouchableOpacity>
                    <View style={{marginTop:-10}}>
                        <Text style={{textAlign:'center',fontFamily:FontFamily.semi_bold,padding:20}}>Don't have account ?</Text>
                        <View style={{}}>
                        <Button
                     onPress={()=>navigation.navigate('SignUp')} 
                     btnStyle={{
                         height: 50,
                         width:Sizes.ScreenWidth*0.5, 
                         borderRadius: 50,
                         backgroundColor:Colors.color4 
                         }} 
                     textStyle={{
                         fontFamily:FontFamily.semi_bold,
                         color:"#000"
                        }}
                     btnName="Sign up now"
                    />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        
    },
    image:{
        flex:0.7,
        justifyContent:'center'
    }
})
