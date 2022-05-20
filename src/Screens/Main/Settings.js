import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
import {Colors, FontFamily, Sizes} from '../../Constants/constants';
import ProgressCircle from 'react-native-progress-circle';
import Button from '../../Components/Button';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import CustomLoader from '../../Components/CustomLoader';
import {useNavigation} from '@react-navigation/native';

const Settings = ({route}) => {
  var userDetail = route.params;
  var menuItems = [
    {
      h1: 'Account Settings',
      sub: 'Personal Informations,Email',
      iconName: 'person',
      iconType: 'fontisto',
      navigate: 'AccountSettings',
      iconColor: 'orange',
    },
    // {
    //   h1: 'Security',
    //   sub: 'Change Password,2FA',
    //   iconName: 'lock',
    //   iconType: 'entypo',
    //   navigate: 'Contacts',
    //   iconColor: Colors.color1,
    // },
    // {
    //   h1: 'Appereances',
    //   sub: 'Color,Font Size',
    //   iconName: 'heart',
    //   iconType: 'antdesign',
    //   navigate: 'Contacts',
    //   iconColor: Colors.color2,
    // },
    // {
    //   h1: 'Security',
    //   sub: 'Change Password,2FA',
    //   iconName: 'lock',
    //   iconType: 'entypo',
    //   navigate: 'Contacts',
    //   iconColor: '#31ebe8',
    // },
    // {
    //   h1: 'Appereances',
    //   sub: 'Color,Font Size',
    //   iconName: 'heart',
    //   iconType: 'antdesign',
    //   navigate: 'Contacts',
    //   iconColor: 'red',
    // },
  ];
  const navigation = useNavigation();
  var [profile, setprofile] = useState(Math.floor(Math.random() * 101)); //Math.floor(Math.random()*101)
  return (
    <View style={styles.container}>
      <Header backBtn={true} name="Settings" />
      <View>
        <View>
          <LinearGradient
            colors={[Colors.color2, Colors.color2, Colors.color3]}
            style={{
              width: '90%',
              borderRadius: 20,
              alignSelf: 'center',
              padding: 20,
              elevation: 5,
              paddingBottom: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <View style={{}}>
                <ProgressCircle
                  percent={profile}
                  radius={40}
                  borderWidth={4}
                  color="#fff"
                  shadowColor="#5d96e3"
                  containerStyle={{
                    backgroundColor: '#5d96e3',
                  }}
                  outerCircleStyle={{}}>
                  {profile < 100 ? (
                    <Text
                      style={{
                        fontFamily: FontFamily.semi_bold,
                        color: 'white',
                      }}>
                      {profile}%
                    </Text>
                  ) : (
                    <CustomLoader
                      source={require('../../Components/json/complete.json')}
                      loop={false}
                      loaderStyle={{
                        height: 200,
                        width: 200,
                      }}
                    />
                  )}
                </ProgressCircle>
              </View>
              <View
                style={{
                  width: '70%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: FontFamily.bold,
                    fontSize: 18,
                    color: 'white',
                    marginVertical: 8,
                  }}>
                  Profile Informations
                </Text>
                <Text
                  style={{
                    fontFamily: FontFamily.default,
                    fontSize: 14,
                    color: Colors.color4,
                    //  textAlign:'left'
                  }}>
                  Please verify your account within 10 days. Otherwise we are
                  disable your account.
                </Text>
              </View>
            </View>
            <View style={{marginVertical: 20}}>
              <Button
                //  onPress={()=>signUpUser()}
                btnStyle={{
                  height: 40,
                  width: Sizes.ScreenWidth * 0.7,
                  borderRadius: 50,
                  backgroundColor: Colors.color5,
                }}
                textStyle={{
                  fontFamily: FontFamily.semi_bold,
                  color: Colors.color2,
                }}
                btnName="Complete My Profile"
              />
            </View>
          </LinearGradient>
        </View>
        <View style={{marginTop: 20}}>
          {menuItems.map((item, ind) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  item?.navigate
                    ? navigation.navigate(`${item.navigate}`, userDetail)
                    : setModal(true)
                }
                key={ind}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    padding: 5,
                    marginVertical: 5,
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name={item?.iconName}
                      type={item?.iconType}
                      color={item?.iconColor}
                      size={20}
                      reverse
                    />
                    <View>
                      <Text
                        style={{
                          fontFamily: FontFamily.semi_bold,
                          marginLeft: 10,
                          color: Colors.TextColor,
                        }}>
                        {item?.h1}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FontFamily.default,
                          marginLeft: 10,
                        }}>
                        {item?.sub}
                      </Text>
                    </View>
                  </View>
                  <View style={{}}>
                    <Icon
                      name="right"
                      type="antdesign"
                      style={{alignSelf: 'flex-end'}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuItems: {
    width: '90%',
    alignSelf: 'center',
  },
});
