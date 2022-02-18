import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
const CustomLoader = ({loaderStyle, source, header, hdhg, loop}) => {
  const style = loaderStyle || {};
  const json = source || require('./json/loader-default.json');
  const isHeader = header || false;
  const headerHeight = hdhg || 170;
  const _loop = loop || true;
  return (
    <View
      style={[
        styles.container,
        {
          height: isHeader
            ? Dimensions.get('screen').height - headerHeight
            : Dimensions.get('screen').height,
        },
      ]}>
      <AnimatedLottieView
        style={style}
        loop={_loop}
        autoPlay={_loop}
        source={json}
      />
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
