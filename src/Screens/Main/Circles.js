import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import Header from '../../Components/Header';
const data = [
  {
    h1: 'Cillum nostrud',
    sub: 'Eiusmod anim quis fugiat aliquip fugiat aute irure pariatur.',
    image: 'https://cdn-icons-png.flaticon.com/512/6531/6531475.png',
  },
  {
    h1: 'desert secret bow army',
    sub: 'offer cry hundred stone foot angle stomach market direction star pond fireplace press yourself warn afraid church tool wrapped habit bet supper nor shout.',
    image: 'https://cdn-icons-png.flaticon.com/512/488/488716.png',
  },
  {
    h1: 'catch off theory rubbed',
    sub: 'swim tell obtain chance week welcome complex white basic here fact instrument handle include reach pie hang only grabbed shirt push somehow track empty.',
    image:
      'https://cdn-icons.flaticon.com/png/512/1165/premium/1165725.png?token=exp=1649043447~hmac=353db4b90d97243aea82ef13763e32d4',
  },
];
const Circles = () => {
  const renderItems = ({item}) => {
    // console.log(item);
    return (
      <View
        style={{
          // flex: 0.1,
          backgroundColor: 'white',
          // alignSelf: 'center',
          borderRadius: 10,
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          height: 120,
          width: 240,
        }}>
        <Image
          style={{resizeMode: 'contain', height: 50, width: 100}}
          source={{uri: item.image}}
        />
        <View>
          <Text>{item.h1}</Text>
          <Text>{item.sub}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header backBtn={true} name="Circles" />
      <FlatList horizontal data={data} renderItem={renderItems} />
      <ScrollView></ScrollView>
    </View>
  );
};

export default Circles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
