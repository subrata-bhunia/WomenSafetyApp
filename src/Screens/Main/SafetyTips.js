import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Image } from 'react-native-elements'
import CustomLoader from '../../Components/CustomLoader'
import Header from '../../Components/Header'
import { Colors, FontFamily } from '../../Constants/constants';
import { UIStore } from '../../UIStore';
const SafetyTips = () => {
    const url = UIStore.useState(s=> s.localUrl);
    const [SafetyTips,setSafetyTips]=useState(null);
    // ------------- API FOR SAFETY TIPS ---------------- //
    const apiUrl=url+'/safety-tips'
    const apiCall = () => {
        axios({
            method:'GET',
            url:apiUrl
        }).then(res =>setSafetyTips(res?.data?.data))
        .catch(err=>{
            console.log("errSafety",err)
        })
    }
    useEffect(()=>{
        apiCall()
    },[])
    const navigation = useNavigation();
    const renderItem=({item})=>{
        const gotoDetails = ()=>{
            navigation.navigate("SafetyTipsDetails",{item})
        }
        return(
            <Card containerStyle={{borderRadius:10,elevation:5}}>
                <TouchableOpacity onPress={()=>gotoDetails()}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View>
                            <Image
                             source={item?.image === null ? require('../../../assets/logo/logo.png') : {uri:item?.image}} 
                             style={{height:100,width:100,resizeMode:'stretch',borderRadius:6}}
                             defaultSource={require('../../../assets/logo/logo.png')} />
                        </View>
                        <View style={{marginLeft:13,width:"70%"}}>
                            <Text style={{fontFamily:FontFamily.bold,color:Colors.TextColor,opacity:0.7}}>
                                {item?.type}
                            </Text>
                            <Text style={{fontFamily:FontFamily.semi_bold,color:Colors.TextColor,marginVertical:5}}>
                                {item?.title}
                            </Text>
                            <Text style={{fontFamily:FontFamily.default,color:Colors.TextColor,opacity:0.7,textAlign:'right',marginRight:5,marginTop:10}}>
                                <Moment element={Text} fromNow>
                                    {item?.created_at}  
                                </Moment>
                            </Text>
                            
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    }
    return (
        <View style={{flex:1}}>
            <Header
            name="Safety Tips"
            backBtn={true}
            />
            {
                SafetyTips === null ? (<CustomLoader
                     header={true} 
                     loaderStyle={{height:200,width:200}}
                     source={require('../../Components/json/tips.json')}
                     />): (
                         <FlatList
                          renderItem={renderItem}
                          data={SafetyTips === null ? [] : SafetyTips }
                          contentInsetAdjustmentBehavior="automatic"
                          ListFooterComponentStyle={{marginBottom:30}}
                          contentContainerStyle={{ 
                               paddingBottom: 15,
                            //    height:"100%"
                            }}
                          />
                     )
            }
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
