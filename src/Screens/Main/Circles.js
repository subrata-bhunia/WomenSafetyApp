import React from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import Header from '../../Components/Header';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Colors, FontFamily, Sizes} from '../../Constants/constants';
import Button from '../../Components/Button';
const data = [
  {
    h1: 'Cillum nostrud',
    sub: 'Eiusmod anim quis fugiat aliquip fugiat aute irure pariatur.',
    image: 'https://cdn-icons-png.flaticon.com/512/6531/6531475.png',
  },
  {
    h1: 'desert secret bow army',
    sub: 'offer cry hundred stone foot angle stomach market direction star pond fireplace press yourself wa',
    image: 'https://cdn-icons-png.flaticon.com/512/488/488716.png',
  },
  {
    h1: 'catch off theory rubbed',
    sub: 'swim tell obtain chance week welcome complex white basic here fact instrument handle.',
    image:
      'https://cdn-icons.flaticon.com/png/512/1165/premium/1165725.png?token=exp=1649043447~hmac=353db4b90d97243aea82ef13763e32d4',
  },
];
// const CirclesData = [];
const CirclesData = [
  {
    id: '0266a0e0-50d7-5242-b1a0-7e1c8d2f00d47',
    circleName: 'Friends',
    count: 62,
  },
  {
    id: '677178ad8-84c3-5d36-9fcb-48c7d857654b7',
    circleName: 'ABC',
    count: 5,
  },
  {
    id: 'fb3be75f-d34b7-5abe-ae4a-701a8a889185c297',
    circleName: 'Birdie',
    count: 5,
  },
];
const Circles = () => {
  const renderItems = ({item}) => {
    // console.log(item);
    return (
      <View
        style={{
          height: Sizes.ScreenHeight * 0.23,
          width: Sizes.ScreenWidth * 1,
        }}>
        <View
          style={{
            // flex: 0.1,
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 10,
            flexDirection: 'row',
            padding: 20,
            alignItems: 'center',
            // height: '100%',
            width: '90%',
          }}>
          <Image
            style={{resizeMode: 'contain', height: 50, width: 70}}
            source={{uri: item.image}}
          />
          <View style={{width: '73%', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: FontFamily.semi_bold,
                color: '#000',
                // textAlign: 'center',
                textTransform: 'capitalize',
              }}>
              {item.h1}
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.default,
                color: '#000',
                // textAlign: 'center',
                textTransform: 'capitalize',
              }}>
              {item.sub}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header backBtn={true} name="Circles" />
      <View>
        <SwiperFlatList
          autoplay
          autoplayDelay={7}
          autoplayLoop
          index={0}
          showPagination
          renderItem={renderItems}
          data={data}
          paginationActiveColor={Colors.color1}
          paginationDefaultColor={'rgba(0,0,0,0.2)'} // rgb(2, 20, 100)
          paginationStyle={{
            // bottom: -35,
            bottom: 0,
          }}
          directionalLockEnabled
        />
      </View>
      <Text
        style={{
          padding: 10,
          fontFamily: FontFamily.bold,
          color: '#000',
          fontSize: 18,
        }}>
        My Circle
      </Text>
      <FlatList
        data={CirclesData}
        renderItem={({item}) => {
          const randomBetween = (min, max) =>
            min + Math.floor(Math.random() * (max - min + 1));
          var r = randomBetween(0, 255);
          var g = randomBetween(0, 255);
          var b = randomBetween(0, 255);
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '90%',
                alignSelf: 'center',
                marginVertical: 5,
              }}>
              {/* Letter */}
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 60,
                  backgroundColor: `rgba(${r},${g},${b},0.3)`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: '#fff',
                }}>
                <Text
                  style={{
                    fontFamily: FontFamily.bold,
                    fontSize: 20,
                    color: `rgba(${r},${g},${b},1)`,
                  }}>
                  {item.circleName.charAt(0)}
                </Text>
              </View>
              {/* Name & Count */}
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{fontFamily: FontFamily.semi_bold, marginBottom: 7}}>
                  {item.circleName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderRadius: 20,
                    width: 80,
                    height: 35,
                    padding: 3,
                    borderColor: '#999',
                    // justifyContent: 'space-between',
                  }}>
                  <Icon name="addusergroup" type="antdesign" size={20} />
                  <Text
                    style={{
                      fontFamily: FontFamily.semi_bold,
                      fontSize: 17,
                      marginHorizontal: 2,
                    }}>
                    {item.count}
                  </Text>
                </View>
                <Pressable
                  style={{
                    position: 'absolute',
                    right: -15,
                    top: 16,
                  }}>
                  <Icon
                    name="plus"
                    type="antdesign"
                    color={'#000'}
                    raised
                    size={18}
                  />
                </Pressable>
              </View>
              {/* Cross */}
              <Pressable style={{elevation: 5}}>
                <Icon
                  name="cross"
                  type="entypo"
                  reverse
                  reverseColor="#000"
                  color={'white'}
                  style={{
                    elevation: 2,
                  }}
                />
              </Pressable>
            </View>
          );
        }}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                height: 50,
                justifyContent: 'center',
              }}>
              <Text
                style={{fontFamily: FontFamily.semi_bold, textAlign: 'center'}}>
                No Circle Found
              </Text>
            </View>
          );
        }}
      />
      <Button
        //  onPress={()=>signUpUser()}
        btnStyle={{
          height: 60,
          width: Sizes.ScreenWidth * 0.7,
          borderRadius: 50,
          backgroundColor: Colors.color4,
          marginBottom: 20,
        }}
        textStyle={{
          fontFamily: FontFamily.semi_bold,
          color: Colors.TextColor,
        }}
        btnName="Add Circle"
      />
    </View>
  );
};

export default Circles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: {width: Sizes.ScreenWidth, justifyContent: 'center'},
  text: {fontSize: Sizes.ScreenWidth * 0.1, textAlign: 'center'},
});
