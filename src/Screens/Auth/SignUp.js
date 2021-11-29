import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity} from 'react-native'
import {Input} from 'galio-framework';
import { Colors, FontFamily, Sizes } from '../../Constants/constants';
import { NeuButton } from 'neumorphism-ui';
import { useNavigation } from '@react-navigation/core';
import React, { useRef, useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import validator from 'aadhaar-validator'
import { Icon } from 'react-native-elements';
const SignUp = () => {
    const {width}=useWindowDimensions();
    const navigation = useNavigation();
    const [value,setValue]=useState('');
    const [formattedValue, setFormattedValue] = useState("");
    const [aadhar,setAadhar]=useState("");
    const [vaild_aa,setVaildAadhar]=useState(null);
    const [validMobile,setValidMobile]=useState(null);
    const phoneInput = useRef(null);
    const handleCardNumber = (text) => {
        var txt = validator.isValidNumber(text.split(' ').join(''));
        setVaildAadhar(txt);
        if(text.split(' ').join('').length < 1){
            setVaildAadhar(null)
        }
        let formattedText = text.split(' ').join('');
        if (formattedText.length > 0) {
          formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        setAadhar(formattedText)
        return formattedText;
      }
    const isVaild = (text) =>{
        if(text.length > 9){
            var vaild = phoneInput.current?.isValidNumber(text);
        }
    }
    return (
        <View style={[styles.container]}>
            <Image
               style={[styles.image,{width,resizeMode:'contain'}]} 
               source={require('../../../assets/images/ui-images/signup.png')}
               
               />
            <View style={{flex:1.3}}>
            <View
              style={{flexDirection:'row',justifyContent:'flex-end',width:'100%',alignSelf:'center'}}>
                <TouchableOpacity style={{height:50,width:50,borderWidth:1,alignItems:'center',justifyContent:'center',borderRadius:10,backgroundColor:'#fff',margin:5}}>
                    <Image style={{height:30,width:30,resizeMode:'contain'}} source={require('../../../assets/images/logos/google.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{height:50,width:50,borderWidth:1,alignItems:'center',justifyContent:'center',borderRadius:10,backgroundColor:"#fff",margin:5}}>
                    <Image style={{height:30,width:30,resizeMode:'contain'}} source={require('../../../assets/images/logos/facebook.png')} />
                </TouchableOpacity>
            </View>
            <Text style={{textAlign:'right',margin:5,fontFamily:FontFamily.default}}>Or, register with email </Text>
            <View style={{alignItems:'center'}}>
           <Input
                placeholder="Enter your name" 
                rounded 
                type='email-address' 
                style={[styles.input,{width:width*0.9}]} 
                />
           <Input
                placeholder="Enter your 12 digit Aadhar Card Number" 
                rounded 
                type='number-pad' 
                style={[styles.input,{width:width*0.9}]}
                value={aadhar}
                onChangeText={(number)=>handleCardNumber(number)}
                maxLength={14}
                icon="circle"
                family="font-awesome"
                right
                iconColor= {vaild_aa === false ? 'red' : vaild_aa === true ? '#42ba96' : 'grey'}
                />
            <PhoneInput
                ref={phoneInput}
                maxLength={10}
                defaultValue={value}
                defaultCode="IN"
                layout="second"
                onChangeText={(text) => {
                  setValue(text);
                }}
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                }}
                containerStyle={{
                    // height:50,
                    width:width*0.9,
                    borderRadius:20,
                    borderWidth:0.5
                }}
                textContainerStyle={{
                    height:45,
                    borderTopRightRadius:20,
                    borderBottomRightRadius:20,
                    justifyContent:'center',
                    alignItems:'center'
                }}
                textInputStyle={{
                    alignSelf:"center",
                    // color:'#f00',
                    height:45,
                    fontFamily:FontFamily.default
                }}
                codeTextStyle={{
                    fontSize:14,
                    fontFamily:FontFamily.semi_bold,
                    height:Sizes.ScreenHeight/35
                }}
                // disableArrowIcon
                withDarkTheme
                textInputProps={{
                    maxLength:10,
                    
                }}
                />
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
                </View>
                <View style={{alignItems:'center',alignSelf:'center'}}>
                <NeuButton onPress={()=>console.log("Sign in now")} style={{height: 70,width:Sizes.ScreenWidth*0.5, borderRadius: 50,backgroundColor:Colors.color3 }} noPressedState={true}>
                    <Text style={{fontFamily:FontFamily.semi_bold,color:"#000"}}>Submit now</Text>
                </NeuButton>
                </View>
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        fontFamily:FontFamily.default,
        fontSize:34
    },
    image:{
        flex:0.7,
        justifyContent:'center'
    }
})
