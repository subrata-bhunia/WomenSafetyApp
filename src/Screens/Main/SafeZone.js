import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SafeZone = () => {
  return (
    <View style={styles.container}>
      <Text>SafeZone</Text>
    </View>
  );
};

export default SafeZone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
