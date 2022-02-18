import React from 'react';
import {Dimensions} from 'react-native';

//--------------- Colors -------------//
export const Colors = {
  color1: '#F44A61',
  color2: '#4A97FF',
  color3: '#CCE1FF',
  color4: '#EBEBEB',
  color5: '#F3F3F3',
  TextColor: '#000',
};
//----------------- Fonts --------------//
export const FontFamily = {
  default: 'Montserrat-Regular',
  bold: 'Montserrat-Bold',
  semi_bold: 'Montserrat-SemiBold',
};
// ---------------Sizes-------------------//
export const Sizes = {
  ScreenHeight: Dimensions.get('window').height,
  ScreenWidth: Dimensions.get('window').width,
  iconSize: 30,
};
