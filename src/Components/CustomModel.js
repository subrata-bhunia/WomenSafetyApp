import Model from 'react-native-modal';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function CustomModel({h1,buttons,open}) {
    var Heading = h1 || "Test Model" ;
    var Buttons = buttons || [];
    var [openM,setopen] = useState( open || false);
  return (
    <View>
       <Model isVisible={openM}>
           <View>
               <Text>{Heading}</Text>
           </View>
       </Model>
    </View>
  );
}

const styles = StyleSheet.create({});




