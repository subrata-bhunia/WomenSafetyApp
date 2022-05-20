import Model from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, FontFamily, Sizes} from '../Constants/constants';
import Button from './Button';

export default function CustomModel({h1, yes, no, open, setopen}) {
  var Heading = h1 || '';
  var Yes = yes?.name || 'Yes';
  var No = no?.name || 'No';
  var YesPress = yes?.onPress || console.log('Yes');
  var NoPress = () => no?.onPress || setopen(!open);

  return (
    <View>
      <Model
        isVisible={open}
        // onBackdropPress={() => setopen(!open)}
        statusBarTranslucent
        animationIn="slideInUp"
        animationOut="slideOutUp"
        // animationInTiming={600}
        // animationOutTiming={600}
        backdropOpacity={0.6}>
        <View style={styles.Model}>
          <Text style={styles.text}>{Heading}</Text>
          <View style={styles.Buttons}>
            <View>
              <Button
                btnName={Yes}
                onPress={YesPress}
                textStyle={styles.text1}
                btnStyle={{
                  height: 40,
                  width: Sizes.ScreenWidth / 4,
                  padding: 5,
                  backgroundColor: Colors.color3,
                  borderRadius: 5,
                }}
              />
            </View>
            <View>
              <Button
                btnName={No}
                onPress={NoPress}
                textStyle={styles.text1}
                btnStyle={{
                  height: 40,
                  width: Sizes.ScreenWidth / 4,
                  padding: 5,
                  backgroundColor: Colors.color1,
                  borderRadius: 5,
                }}
              />
            </View>
          </View>
        </View>
      </Model>
    </View>
  );
}

const styles = StyleSheet.create({
  Model: {
    backgroundColor: Colors.color5,
    borderRadius: 10,
    padding: 15,
    paddingVertical: 20,
  },
  text: {
    fontFamily: FontFamily.default,
    textAlign: 'center',
    fontSize: 18,
    color: Colors.TextColor,
  },
  text1: {
    fontFamily: FontFamily.semi_bold,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.TextColor,
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});
