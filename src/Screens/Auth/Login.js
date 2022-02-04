import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, StatusBar, Alert, BackHandler} from 'react-native'
import {Input} from 'galio-framework';
import { Colors, FontFamily, Sizes } from '../../Constants/constants';
import { NeuButton } from 'neumorphism-ui';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import Button from '../../Components/Button';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UIStore } from '../../UIStore';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { AuthContext } from '../../Components/context';

const Login = () => {
    const {width}=useWindowDimensions();
    const navigation = useNavigation();
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const url = UIStore.useState(s=>s.localUrl);
    const {signIn}=React.useContext(AuthContext)
    // ------------------ LOGIN API ------------ //
    const apiUrl=url+'/users/login';
    const SignIn = ()=>{
        if(email < 2 || password < 6){
            alert(`🔸 Please Check email \n🔸 Please Check Password [>6] \n`)
        }else{
            axios({
                method: 'post',
                url: apiUrl,
                data:{
                    full_name:email,
                    password:password
                }
              })
                .then(function (response) {
                  if(response.data.success === 0){
                      alert(response.data.data)
                  } else{
                    try{
                        AsyncStorage.setItem('@login','true');
                        navigation.navigate('HomeNav');
                        UIStore.update(s=>{
                            s.user_token=response.data.token,
                            s.login=true
                        })
                        var user_data= jwt_decode(response.data.token)
                        if(user_data !== undefined){
                            UIStore.update(s=>{
                                s.userId=user_data.result.user_id
                            });
                            var userId=user_data.result.user_id
                            try{
                                AsyncStorage.setItem('@userId',`${userId}`)
                            }catch(err){
                                console.log(err)
                            }
                        }
                        // console.log("user_data",`${userId}`)
                    }catch(err){
                        if(err){
                            console.log("Login/60",err)
                        }
                    }
                  }
                }).catch(err =>{
                    if(err){
                        SignIn()
                    }
                });
        }
        
    }
    // console.log(UIStore.useState(s=>s.user_token))
    const route = useRoute();
    console.log(route)

    return (
        <View style={[styles.container,{width}]}>
            <StatusBar translucent backgroundColor={"transparent"} barStyle='dark-content' />
            <Image source={require('../../../assets/images/ui-images/login.png')} style={[styles.image,{width,resizeMode:'contain'}]} />
            <View style={{flex:0.7}}>
                <Input
                 placeholder="Enter your email address || Name"  // Backend will change
                 rounded 
                 type='email-address' 
                 style={[styles.input,{width:width*0.9}]} 
                 value={email}
                 onChangeText={text=>setemail(text)}
                 placeholderTextColor="#999"
                 />
                <Input
                 placeholder="Enter your Password" 
                 password 
                 viewPass 
                 rounded 
                 type='numbers-and-punctuation'
                 style={[styles.input,{width:width*0.9}]}
                 iconColor="#999"
                 value={password}
                 onChangeText={text=>setpassword(text)}
                 placeholderTextColor="#999"
                 />
                <View style={{alignItems:"center",alignSelf:"center",marginTop:10}}>
                    <Button
                     onPress={()=>signIn(email,password)} 
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
                        <Text style={{textAlign:'center',textDecorationStyle:'dotted',textDecorationLine:'underline',fontFamily:FontFamily.semi_bold,padding:20,color:Colors.TextColor}}>Forget Password ?</Text>
                    </TouchableOpacity>
                    <View style={{marginTop:-10}}>
                        <Text style={{textAlign:'center',fontFamily:FontFamily.semi_bold,padding:20,color:Colors.TextColor}}>Don't have account ?</Text>
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
