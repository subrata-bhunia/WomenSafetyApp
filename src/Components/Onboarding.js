import React,{useState,useRef} from "react";
import {View,Animated,StyleSheet, FlatList,Text, TouchableOpacity} from "react-native";
import { Colors, Sizes } from "../Constants/constants";
import slides from "../Data/slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";


const Onboarding = () =>{
    const scrollX= useRef(new Animated.Value(10)).current;

    const [currentIndex,setCurrentIndex]=useState(0);

    const viewableItemChanged = useRef(({viewableItems})=>{
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold : 50}).current;
    const slidesRef = useRef(null)
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
                        <TouchableOpacity style={{marginBottom:Sizes.ScreenHeight/10}}>
                            <Text style={{textAlign:'center',textDecorationStyle:'dotted',textDecorationLine:'underline'}}>Done</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{marginBottom:Sizes.ScreenHeight/10}}>
                            <Text style={{textAlign:'center',textDecorationStyle:'dotted',textDecorationLine:'underline'}}>Skip</Text>
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
    }
})


export default Onboarding;