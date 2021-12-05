import React,{useState,useRef} from "react";
import {View,Animated,StyleSheet, FlatList,Text, TouchableOpacity} from "react-native";
import { Colors, FontFamily, Sizes } from "../Constants/constants";
import slides from "../Data/slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import { NeuButton } from "neumorphism-ui";
import { useNavigation } from "@react-navigation/core";
import Button from "./Button";

const Onboarding = () =>{
    const navigation=useNavigation();

    const scrollX= useRef(new Animated.Value(10)).current;

    const [currentIndex,setCurrentIndex]=useState(0);

    const viewableItemChanged = useRef(({viewableItems})=>{
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold : 50}).current;
    const slidesRef = useRef(null);
    const gotoPermission=()=>{
        navigation.navigate('Permissions');
    }
    return(
        <View style={styles.container}>
            <View style={{flex:3}}>
                <FlatList
                    data={slides} 
                    renderItem={({item})=> <OnboardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item)=>item.id}
                    onViewableItemsChanged={viewableItemChanged}
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                            contentOffset: {
                              x: scrollX
                            }
                          }
                        }],{
                        useNativeDriver:false
                    })}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={slidesRef}
                    
                    />
            </View>
            <View>
                <Paginator data={slides} scrollX={scrollX} />
                {
                    currentIndex === slides.length-1 ? (
                        <Button
                         onPress={()=>gotoPermission()} 
                         btnStyle={{marginBottom:Sizes.ScreenHeight/12,height: 50, width: 100, borderRadius: 50,backgroundColor:Colors.color4,alignItems:'center',justifyContent:'center',elevation:5 }}
                         textStyle={{fontFamily:FontFamily.semi_bold,color:"#000",textAlign:'center'}}
                         btnName="Done"
                         />
                        
                    ) : (
                        <TouchableOpacity onPress={()=>gotoPermission()} style={{marginBottom:Sizes.ScreenHeight/10}}>
                            <Text style={{textAlign:'center',textDecorationStyle:'dotted',textDecorationLine:'underline',fontFamily:FontFamily.semi_bold,color:"#000"}}>Skip</Text>
                        </TouchableOpacity>
                    )
                }
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
    
})


export default Onboarding;