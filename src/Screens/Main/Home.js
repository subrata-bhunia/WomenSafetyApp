import React,{useEffect, useState} from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, FontFamily, Sizes } from '../../Constants/constants';
import MapView, { Marker } from 'react-native-maps';
import GetLocation ,{PROVIDER_GOOGLE} from 'react-native-get-location';
import {BallIndicator} from 'react-native-indicators';
import { UIStore } from '../../UIStore';
import { Icon } from 'react-native-elements';
import { NeuButton } from 'neumorphism-ui';
import Button from '../../Components/Button';
const Home = () => {
    const currentLocation = UIStore.useState(s=>s.lastLocation)
    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy:true,
            timeout:15000
        }).then((location)=>{
            UIStore.update(s=>{
                s.lastLocation = location;
            })
            console.log('location')
        })
        .catch((err)=>console.log("err===>",err))
    },[])

    // console.log("currentLocation =>",currentLocation)
    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar hidden /> */}
            {
                currentLocation === null ? <BallIndicator />: (
                    <MapView
                        initialRegion={{
                            latitude:currentLocation.latitude,
                            // latitude:22.572645,
                            longitude: currentLocation.longitude ,
                            // longitud,
                            latitudeDelta: 0.0054,
                            longitudeDelta: 0.0053,
                            }}
                        style={{
                            height:'100%',
                            width:'100%',
                            opacity:0.6
                        }}
                        mapType='standard'
                        showsMyLocationButton={true}
                    >
                        <Marker
                         coordinate={{
                             latitude:currentLocation.latitude,
                             longitudeDelta:0.0014,
                             longitude:currentLocation.longitude,
                             latitudeDelta:0.0014
                             }} 
                         pinColor='green'
                        //  image={require('../../../assets/images/icons/green.png')}
                         title="Your Current Location"
                         description="Good To see you"
                         />
                        <Marker
                         coordinate={{
                             latitude:currentLocation.latitude+0.001,
                             longitudeDelta:0.1,
                             longitude:currentLocation.longitude+0.001,
                             latitudeDelta:0.1
                             }} 
                        //  pinColor='red'
                        //  image={require('../../../assets/images/icons/red.png')}
                         title="Test Title"
                         description="Test Description"
                         />
                        <Marker
                         coordinate={{
                             latitude:currentLocation.latitude+0.0011,
                             longitudeDelta:0.1,
                             longitude:currentLocation.longitude+0.0021,
                             latitudeDelta:0.1
                             }} 
                        //  pinColor='red'
                        //  image={require('../../../assets/images/icons/red.png')}
                         title="Test Title"
                         description="Test Description"
                         />
                        <Marker
                         coordinate={{
                             latitude:currentLocation.latitude+0.0019,
                             longitudeDelta:0.1,
                             longitude:currentLocation.longitude-0.001,
                             latitudeDelta:0.1
                             }} 
                        //  pinColor='red'
                        //  image={require('../../../assets/images/icons/red.png')}
                         title="Test Title"
                         description="Test Description"
                         />
                        <Marker
                         coordinate={{
                             latitude:currentLocation.latitude-0.001,
                             longitudeDelta:0.1,
                             longitude:currentLocation.longitude-0.001,
                             latitudeDelta:0.1
                             }} 
                        //  pinColor='red'
                        //  image={require('../../../assets/images/icons/red.png')}
                         />
                         
                    </MapView>
                )
            }
            <View style={{position:'absolute',top:10}}>
                <View>
                    <TouchableOpacity>
                        <Icon name='menu' type="entypo" size={50} color='grey' style={{alignSelf:'flex-start',margin:20 ,elevation:5}} />
                    </TouchableOpacity>
                </View>
                {/* ------------------------- */}
                <View
                 style={{
                     flexDirection:'row',
                     justifyContent:'space-around',
                     width:'100%',
                     alignSelf:'center',
                     marginTop:20,
                     marginLeft:-10
                     }}>
                    <View>
                        <Button
                    //  onPress={()=>navigation.navigate('Home')} 
                     btnStyle={{
                         height: 50,
                         width:Sizes.ScreenWidth*0.4, 
                         borderRadius: 50,
                         backgroundColor:Colors.color5 
                         }} 
                     textStyle={{
                         fontFamily:FontFamily.semi_bold,
                         color:"#000"
                        }}
                     btnName=" Safety tips"
                     icon= {{
                        name:'profile',
                        type:'ant-design',
                
                        
                    }}
                    />
                    </View>
                    <View>
                    <Button
                    //  onPress={()=>navigation.navigate('Home')} 
                     btnStyle={{
                         height: 50,
                         width:Sizes.ScreenWidth*0.4, 
                         borderRadius: 50,
                         backgroundColor:Colors.color5
                         }} 
                     textStyle={{
                         fontFamily:FontFamily.semi_bold,
                         color:"#000"
                        }}
                     btnName=" Circles"
                     icon= {{
                        name:'account-group-outline',
                        type:'material-community',
                    }}
                    />
                    </View>
                </View>
                {/* ------------------------- */}
                <View
                 style={{
                     flexDirection:'row',
                     justifyContent:'space-around',
                     width:'100%',
                     alignSelf:'center',
                     marginTop:20,
                     marginLeft:-10
                     }}>
                <Button
                    //  onPress={()=>navigation.navigate('Home')} 
                     btnStyle={{
                         height: 50,
                         width:Sizes.ScreenWidth*0.4, 
                         borderRadius: 50,
                         backgroundColor:Colors.color5,
                         flexDirection:'row'
                         }} 
                     textStyle={{
                         fontFamily:FontFamily.semi_bold,
                         color:"#000"
                        }}
                     btnName=" Safe zone"
                     icon= {{
                         name:'Safety',
                         type:'ant-design',
                         
                     }}
                    />
                    <Button
                    //  onPress={()=>navigation.navigate('Home')} 
                     btnStyle={{
                         height: 50,
                         width:Sizes.ScreenWidth*0.4, 
                         borderRadius: 50,
                         backgroundColor:Colors.color5
                         }} 
                     textStyle={{
                         fontFamily:FontFamily.semi_bold,
                         color:"#000"
                        }}
                     btnName=" Step define"
                     icon= {{
                        name:'bell-o',
                        type:'font-awesome',
                        
                    }}
                    />
                </View>
                {/* ---------------------------------- */}
                <View style={{
                    flexDirection:'column',
                    alignSelf:'flex-end',
                    margin:30,
                    justifyContent:'space-around',
                    height:140
                }}
                    >
                    <View>
                        <TouchableOpacity
                         onPress={()=>console.log("Sign in now")} 
                         style={{
                             height: 50,
                             width:50, 
                             borderRadius: 35,
                             backgroundColor:Colors.color5,
                             flexDirection:'row',
                             alignItems:'center',
                             elevation:5,
                             justifyContent:'center'
                             }} noPressedState={true}>
                            <Icon
                             name='dot-circle' 
                             type='font-awesome-5' 
                             size={25} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                         onPress={()=>console.log("Sign in now")} 
                         style={{
                             height: 50,
                             width:50, 
                             borderRadius: 35,
                             backgroundColor:Colors.color5,
                             alignItems:'center',
                             elevation:5,
                             justifyContent:'center'
                             
                             }} noPressedState={true}>
                            <Icon
                             name='map' 
                             type='font-awesome-5' 
                             size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* ---------------------------------- */}
            </View>
            <View style={{position:'absolute',bottom:20,alignSelf:'center'}}>
                <View>
                    <TouchableOpacity
                     onPress={()=>console.log("Sign in now")} 
                     style={{
                         height: 170,
                         width:170, 
                         borderRadius: 85,
                         backgroundColor:Colors.color1,
                         alignItems:'center',
                         elevation:5,
                          justifyContent:'center'
                          }}
                          activeOpacity={0.4}
                          >
                    <Text style={{fontFamily:FontFamily.bold,color:"#fff",fontSize:30}}>SOS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
      flex:1,
    //   justifyContent:"center",
    //   alignItems:"center",
      backgroundColor:Colors.color5
  }
})