import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    FlatList
  } from 'react-native';
import { Icon } from 'react-native-elements';
import { Card } from 'react-native-paper';
import Button from '../../Components/Button';
import { Colors, FontFamily, Sizes as SIZES } from '../../Constants/constants';
import dummyData from '../../Data/dummy.data';
import { UIStore } from '../../UIStore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BallIndicator } from 'react-native-indicators';

const IconType = 'ionicon'
// -------------------- //
export const Top=()=>{
    return(
        <View style={styles.TOP_VIEW} />
    )
}
// ---------------------- //
export const CustomHeader2=()=>{
    return(
        <View style={styles.Header}>
            <TouchableOpacity style={{padding:5,marginLeft:10}}>
                <Icon
                 name="edit"
                 type="feather"
                 size={SIZES.iconSize-15}
                 color={Colors.color1}
                 raised
                 reverseColor={Colors.color1}
                 />
            </TouchableOpacity>
        </View>
    )
}
// -------------------- //
const ProfilePic=({imgUrl})=>{
    return(
        <View style={styles.ProfilePicView}>
            <ImageBackground
             style={styles.ProfilePic}
             source={{uri:imgUrl}}
             imageStyle={styles.ProfilePic}
             >
                 <View style={styles.EDIT_PROFILEPIC}>
                    <TouchableOpacity style={styles.EDIT_PROFILEPIC} activeOpacity={0.5}>
                    <Icon
                    name="camera-outline"
                    type={IconType}
                    size={15}
                    reverse
                    color="#eee"
                    reverseColor={Colors.TextColor}
                    />
                    </TouchableOpacity>
                 </View>
            </ImageBackground>
        </View>
    )
}
// -------------------- //
const CountSessions=({userDetail})=>{
    console.log("userDetail/72",userDetail)
    return(
        <View>
            <Text style={{fontFamily:FontFamily.semi_bold,color:Colors.TextColor,textAlign:'center',fontSize:17}}>
                {userDetail !== null ? userDetail.full_name : ""}
            </Text>
            <Text style={{fontFamily:FontFamily.default,color:Colors.TextColor,textAlign:'center',fontSize:14}}>
            {userDetail !== null ? userDetail.email : ""}
            </Text>
        </View>
    )
}
// ---------------------- //
const CardView=({item,index})=>{
    return(
        <Card style={[styles.CARDVIEW1]} key={index}>
            <ImageBackground style={{height:'100%',width:'100%'}} imageStyle={[styles.ImageView]} source={{uri:"https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"}}>
            <View style={{padding:10}}>
                <Icon
                 name="wrong-location"
                 type={"material"}
                 size={SIZES.iconSize-10}
                 raised
                 color={item.backgroundColor}
                 style={{elevation:5}}
                 />
                 <Text style={styles.COUNT_H1}>
                     {item.H1}
                 </Text>
                 <Text style={[styles.COUNT_H2,{marginTop:10}]}>
                     {item.step} Steps{"\n"}Left
                 </Text>
                 <View style={styles.DIVIDER} />
                 <View style={styles.CARDVIEW_ICON}>
                     <TouchableOpacity>
                         <Icon
                          name="arrow-forward-outline"
                          type={IconType}
                          size={SIZES.iconSize-6}
                          color={Colors.TextColor}
                          />
                     </TouchableOpacity>
                 </View>
            </View>
            </ImageBackground>
        </Card>
    )
}

const Profile1 =()=>{
    const userId= UIStore.useState(s=>s.userId);
    const url = UIStore.useState(s=>s.localUrl);
    const [userDetail,setuserDetail]=useState(null);
    const navigation =useNavigation();
    // ----------- USER DETAILS  ------------- //
    const apiUrl =url+'/users/'+userId;
    const userDetails=()=>{
        if(userId){
            axios({
                method: 'get',
                url: apiUrl,
              }).then(res=>setuserDetail(res.data.data))
        }
    }
    // --------------------- LOG OUT ------------- //
    const LogOut = async() =>{
        try{
            await AsyncStorage.removeItem('@login');
            await AsyncStorage.removeItem('@userId');
            const val = await AsyncStorage.getItem('@login');
            if(val === null){
                navigation.navigate("Login")
            }
        }catch(err){
            console.log("ERROR/PROFILE/142",err);
        }
    }
    useEffect(()=>{
        userDetails();
    },[])
    return(
        <View style={styles.Main}>
            {
                userDetail === null ? <BallIndicator  /> :(
                    <>
                        <CustomHeader2 />
                        <View>
                            <Top />
                            <ProfilePic imgUrl="https://i.pinimg.com/originals/73/16/f5/7316f550de9ca0045e3d8d98a5bb5e44.png" />
                        </View>
                        <View style={styles.SEC2}>
                            <CountSessions userDetail={userDetail}  />
                            <View style={styles.COMPLETEVIEW}>
                                <Text style={[styles.COMPLETETEXT,{fontFamily:FontFamily.semi_bold}]}>
                                    Unsecure Places
                                </Text>
                            </View>
                            <View>
                                <FlatList
                                renderItem={CardView}
                                data={dummyData}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(index)=>index.navigate}
                                />
                            </View>
                            <View>
                            <Button
                                onPress={()=>LogOut()} 
                                btnStyle={{
                                    height: 50,
                                    width:SIZES.ScreenWidth*0.4, 
                                    borderRadius: 50,
                                    backgroundColor:Colors.color5,
                                    marginTop:10
                                    }} 
                                textStyle={{
                                    fontFamily:FontFamily.semi_bold,
                                    color:"#000"
                                    }}
                                btnName=" Log Out"
                                icon= {{
                                    name:'logout',
                                    type:'antdesign',
                                    color:Colors.color1
                                }}
                                />
                            </View>
                        </View>
                    </>
                )
            }
            
        </View>
    )
}

const styles=StyleSheet.create({
    Main:{
        flex:1,
        backgroundColor:Colors.backgroundColor
    },
    Header:{
        marginHorizontal:10,
        marginVertical:20,
        alignItems:'flex-end',
        width:"98%",
    },
    TOP_VIEW:{
        backgroundColor:Colors.color3,
        height:SIZES.ScreenHeight/6,
        transform:[{skewY:"-12deg"}],
        width:SIZES.ScreenWidth+100,
        marginTop:40,
        marginStart:-30
    },
    ProfilePic:{
        height:100,
        width:100,
        borderRadius:30
    },
    EDIT_PROFILEPIC:{
        position:"absolute",
        right:-10
    },
    ProfilePicView:{
        position:"absolute",
        alignSelf:"center",
        top:100
    },
    SEC2:{
        paddingHorizontal:30,
        marginTop:SIZES.ScreenHeight/13
    },
    COUNTVIEW:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    COUNT:{
        alignItems:"center"
    },
    COUNT_H1:{
        letterSpacing:0.6,
        fontSize:15,
        fontWeight:"bold",
        color:Colors.TextColor,
        opacity:0.4
    },
    COUNT_H2:{
        letterSpacing:1.3,
        fontWeight:"bold",
        fontSize:17,
        color:Colors.TextColor
    },
    COMPLETETEXT:{
        fontSize:20,
        // fontWeight:"bold",
        color:Colors.TextColor
    },
    COMPLETEVIEW:{
        marginVertical:15
    },
    CARDVIEW1:{
        height:SIZES.ScreenHeight/4,
        width:SIZES.ScreenWidth/2.6,
        margin:10,
        borderRadius:20
    },
    ImageView:{
        height:SIZES.ScreenHeight/4,
        width:SIZES.ScreenWidth/2.6,
        borderRadius:20
    },
    DIVIDER:{
        height:2,
        width:42,
        backgroundColor:Colors.TextColor,
        marginVertical:3
    },
    CARDVIEW_ICON:{
        position:"absolute",
        bottom:5,
        right:30,
    }

})

export default Profile1;