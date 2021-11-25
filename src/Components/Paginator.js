import React from 'react'
import { StyleSheet, useWindowDimensions,Animated, View } from 'react-native'
import { Colors } from '../Constants/constants'

const Paginator =({data,scrollX}) => {
    const {width}=useWindowDimensions();
    return (
        <View style={{flexDirection:'row',height:64}}>
            {
                data.map((_,i)=>{
                    const inputRange=[(i-1)*width,i*width,(i+1)*width];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange:[10,20,10],
                        extrapolate:'clamp'
                    })
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange:[0.1,1,0.1],
                        extrapolate:'clamp'
                    })
                    return <Animated.View
                     style={[
                         styles.dot,
                         {
                             width:dotWidth,
                             opacity
                            },
                    ]} 
                    key={i.toString()} />
                })
            }
        </View>
    )
}


const styles = StyleSheet.create({
    dot:{
        height:10,
        borderRadius:5,
        marginHorizontal:8,
        backgroundColor:Colors.color1
    }
})

export default Paginator;