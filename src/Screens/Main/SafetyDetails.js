import React from 'react';
import {Image} from 'react-native-elements';
import Moment from 'react-moment';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../Components/Header';
import {Colors, FontFamily, Sizes} from '../../Constants/constants';

const SafetyDetails = ({route}) => {
  var allDetails = route?.params?.item;

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        backBtn={true}
        headerHeight={allDetails?.image ? 200 : null}
        backImgSource={allDetails?.image ? {uri: allDetails?.image} : null}
        name={allDetails?.title}
        imgBack={allDetails?.image ? true : null}
      />
      {/* Type */}
      <ScrollView style={{padding: 10}}>
        <View style={styles.type}>
          <Text style={styles.typeText}>{allDetails?.type}</Text>
        </View>
        {/* h1 */}
        <View style={styles.h1}>
          <Text style={styles.h1Text}>{allDetails?.title}</Text>
        </View>
        {/* admin */}
        <View>
          <View style={styles.admin}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/logo/app_logo.png')}
                style={{height: 40, width: 40}}
              />
              <Text
                style={{
                  fontFamily: FontFamily.semi_bold,
                  color: Colors.TextColor,
                  opacity: 0.7,
                  textAlign: 'right',
                  marginRight: 5,
                }}>
                {' '}
                Admin
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FontFamily.default,
                color: Colors.TextColor,
                opacity: 0.6,
                textAlign: 'right',
                marginRight: 5,
              }}>
              <Moment element={Text} fromNow>
                {allDetails?.created_at}
              </Moment>
            </Text>
          </View>
        </View>
        {/* des */}
        <View style={{marginVertical: 20}}>
          <Text
            style={{fontFamily: FontFamily.default, color: Colors.TextColor}}>
            {allDetails?.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SafetyDetails;

const styles = StyleSheet.create({
  type: {
    height: 40,
    width: 140,
    borderRadius: 30,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.color1,
  },
  typeText: {
    fontFamily: FontFamily.semi_bold,
    color: Colors.color4,
  },
  h1: {
    marginTop: 20,
  },
  h1Text: {
    fontFamily: FontFamily.bold,
    color: Colors.TextColor,
    fontSize: 18,
  },
  admin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
