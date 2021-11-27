import { NeuButton } from 'neumorphism-ui';
import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
import { Colors, FontFamily, Sizes } from "../Constants/constants";
const Permissions = () => {
    return (
        <View>
            <View>
                <TouchableOpacity style={{}}>
                    <Text style={{textAlign:'right',textDecorationStyle:'dotted',textDecorationLine:'underline',fontFamily:FontFamily.semi_bold,padding:20}}>Deny Permissions</Text>
                </TouchableOpacity>
                <View style={{marginTop:20,padding:40}}>
                    <Text style={{fontFamily:FontFamily.default,color:'#000',fontSize:17}}>
                        We take the following Permissions{"\n"} just for your safety.
                    </Text>
                    <View style={{padding:20}}>
                        <Text style={{fontFamily:FontFamily.semi_bold,fontSize:20}}>
                            <Icon type="material-community" name="face-woman-outline" />
                            {" "}Identity
                        </Text>
                        <View style={{padding:14}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="target" type="simple-line-icon" size={15} />
                                <Text>
                                    {" "}Your contact informations
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="target" type="simple-line-icon" size={15} />
                                <Text>
                                    {" "}Your contact informations
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:20,paddingBottom:20}}>
                        <Text style={{fontFamily:FontFamily.semi_bold,fontSize:20}}>
                            <Icon type="material-community" name="face-woman-outline" />
                            {" "}Identity
                        </Text>
                        <View style={{padding:14}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="target" type="simple-line-icon" size={15} />
                                <Text>
                                    {" "}Your contact informations
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="target" type="simple-line-icon" size={15} />
                                <Text>
                                    {" "}Your contact informations
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:20,paddingBottom:20}}>
                        <Text style={{fontFamily:FontFamily.semi_bold,fontSize:20}}>
                            <Icon type="material-community" name="face-woman-outline" />
                            {" "}Identity
                        </Text>
                        <View style={{padding:14}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="target" type="simple-line-icon" size={15} />
                                <Text>
                                    {" "}Your contact informations
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="target" type="simple-line-icon" size={15} />
                                <Text>
                                    {" "}Your contact informations
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:20}}>
                        <Text style={{fontFamily:FontFamily.semi_bold,fontSize:20}}>
                            <Icon type="material-community" name="face-woman-outline" />
                            {" "}Identity
                        </Text>
                        <View style={{padding:14}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="target" type="simple-line-icon" size={15} />
                                <Text>
                                    {" "}Your contact informations
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="target" type="simple-line-icon" size={15} />
                                <Text>
                                    {" "}Your contact informations
                                </Text>
                            </View>
                        </View>
                    </View>
                    <NeuButton onPress={()=>console.log("Done")} style={{height: 70, borderRadius: 50,backgroundColor:Colors.color3 }} noPressedState={true}>
                        <Text style={{fontFamily:FontFamily.semi_bold,color:"#000"}}>Grant Permissions</Text>
                    </NeuButton>
                </View>
                
            </View>
        </View>
    )
}

export default Permissions

const styles = StyleSheet.create({
    container:{
        flex:1,
        // alignItems:"center",
        // justifyContent:"center"
    }
})
