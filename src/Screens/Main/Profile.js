import {useNavigation} from '@react-navigation/native';
import {name, version} from '../../../package.json';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
  Image,
  LogBox,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Card} from 'react-native-paper';
import Button from '../../Components/Button';
import {
  Colors,
  FontFamily,
  Sizes,
  Sizes as SIZES,
} from '../../Constants/constants';
import dummyData from '../../Data/dummy.data';
import {UIStore} from '../../UIStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BallIndicator} from 'react-native-indicators';
import CustomLoader from '../../Components/CustomLoader';
import CustomModel from '../../Components/CustomModel';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
const IconType = 'ionicon';
import {AuthContext} from '../../Components/context';
const menuItem = [
  {
    iconName: 'phone',
    iconType: 'antdesign',
    navigate: 'Contacts',
    menuName: 'Contacts',
    iconColor: '#090',
  },

  // {
  //   iconName: 'notification',
  //   iconType: 'antdesign',
  //   navigate: 'Setting',
  //   menuName: 'Notifications',
  //   iconColor: Colors.color1,
  // },
  // {
  //   iconName: 'document-text-outline',
  //   iconType: 'ionicon',
  //   navigate: 'Setting',
  //   menuName: 'Documents',
  //   iconColor: Colors.color2,
  // },
  {
    iconName: 'ios-settings-outline',
    iconType: 'ionicon',
    navigate: 'Setting',
    menuName: 'Settings',
    iconColor: '#31ebe8',
  },
  {
    iconName: 'logout',
    iconType: 'antdesign',
    navigate: null,
    menuName: 'Log Out',
    onPress: () => setModal(true),
    iconColor: 'red',
  },
];

// -------------------- //
export const Top = () => {
  return (
    // <View>
    <LinearGradient
      colors={[Colors.color2, Colors.color3]}
      style={styles.TOP_VIEW}
    />
  );
};
// -------------------- //
const ProfilePic = ({imgSource}) => {
  return (
    <View style={styles.ProfilePicView}>
      <Image
        style={styles.ProfilePic}
        source={imgSource}
        defaultSource={require('../../../assets/logo/logo.png')}
      />
    </View>
  );
};
// -------------------- //
const CountSessions = ({userDetail}) => {
  // console.log("userDetail/72",userDetail)
  return (
    <View style={styles.userDetail}>
      <Text
        style={{
          fontFamily: FontFamily.semi_bold,
          color: Colors.TextColor,
          fontSize: 17,
        }}>
        {userDetail !== null ? userDetail?.full_name : ''}
      </Text>
      <Text
        style={{
          fontFamily: FontFamily.default,
          color: Colors.TextColor,
          fontSize: 14,
          marginTop: 5,
        }}>
        {userDetail !== null ? userDetail?.email : ''}
      </Text>
      <Text
        style={{
          fontFamily: FontFamily.default,
          color: Colors.TextColor,
          fontSize: 14,
          marginTop: 5,
        }}>
        {userDetail !== null ? userDetail?.phone : ''}
      </Text>
      {userDetail?.verified === 0 ? (
        <Image
          style={{
            height: 50,
            width: 50,
            position: 'absolute',
            top: 0,
            right: 20,
          }}
          source={require('../../../assets/images/icons/inactive_aadhar.png')}
        />
      ) : (
        <Image
          style={{
            height: 50,
            width: 50,
            position: 'absolute',
            top: 0,
            right: 20,
          }}
          source={require('../../../assets/images/icons/aadhaar.png')}
        />
      )}
    </View>
  );
};
// ---------------------- //
const CardView = ({item, index}) => {
  return (
    <Card style={[styles.CARDVIEW1]} key={index}>
      <ImageBackground
        style={{height: '100%', width: '100%'}}
        imageStyle={[styles.ImageView]}
        source={{
          uri: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        }}>
        <View style={{padding: 10}}>
          <Icon
            name="wrong-location"
            type={'material'}
            size={SIZES.iconSize - 10}
            raised
            color={item.backgroundColor}
            style={{elevation: 5}}
          />
          <Text style={styles.COUNT_H1}>{item.H1}</Text>
          <Text style={[styles.COUNT_H2, {marginTop: 10}]}>
            {item.step} Steps{'\n'}Left
          </Text>
          <View style={styles.DIVIDER} />
          <View style={styles.CARDVIEW_ICON}>
            <TouchableOpacity>
              <Icon
                name="arrow-forward-outline"
                type={IconType}
                size={SIZES.iconSize - 6}
                color={Colors.TextColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Card>
  );
};

const Profile1 = () => {
  const userId = UIStore.useState(s => s.userId);
  const url = UIStore.useState(s => s.localUrl);
  const [userDetail, setuserDetail] = useState(null);
  const [Model, setModal] = useState(false);
  const navigation = useNavigation();

  const {signOut} = React.useContext(AuthContext);
  // ----------- USER DETAILS  ------------- //
  const apiUrl = url + '/users/' + userId;
  const userDetails = async () => {
    if (userId) {
      await axios({
        method: 'get',
        url: apiUrl,
      })
        .then(res => setuserDetail(res?.data?.data))
        .catch(err => {
          if (err) {
            console.log(err);
            userDetails();
          }
        });
    }
  };
  // --------------------- LOG OUT ------------- //
  useEffect(() => {
    userDetails();
    // LogBox.ignoreAllLogs()
    LogBox.ignoreLogs([
      'EventEmitter.removeListener',
      'VirtualizedLists should never be nested',
    ]);
  }, []);
  console.log(userDetail);
  const Menu = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item?.navigate
            ? navigation.navigate(`${item.navigate}`, userDetail)
            : setModal(true)
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
            marginVertical: 5,
          }}>
          <Icon
            name={item?.iconName}
            type={item?.iconType}
            color={item?.iconColor}
            size={20}
            reverse
          />
          <Text
            style={{
              fontFamily: FontFamily.semi_bold,
              marginLeft: 10,
              color: Colors.TextColor,
            }}>
            {item?.menuName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.Main}>
      {userDetail === null ? (
        <CustomLoader loaderStyle={{height: 100, width: 100}} />
      ) : (
        <ScrollView nestedScrollEnabled={true}>
          <View>
            <Top />
            <ProfilePic
              imgSource={
                userDetail?.photo
                  ? {uri: `${userDetail?.photo}`}
                  : require('../../../assets/logo/app_logo.png')
              }
            />
            <CountSessions userDetail={userDetail} />
          </View>
          <View style={styles.SEC2}>
            {userDetail?.verified === 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  name="ios-warning-outline"
                  type="ionicon"
                  color={Colors.color1}
                  size={20}
                />
                <Text
                  style={{
                    fontFamily: FontFamily.default,
                    marginLeft: 5,
                    color: Colors.TextColor,
                  }}>
                  Please verify your account within 10 days. Otherwise we are
                  disable your account.
                </Text>
              </View>
            ) : null}
            <View style={{marginTop: userDetail?.verified === 0 ? 10 : 0}}>
              <FlatList
                data={menuItem}
                renderItem={Menu}
                scrollEnabled={false}
                ListFooterComponent={() => (
                  <View
                    style={{alignItems: 'center', marginTop: 30, opacity: 0.6}}>
                    <Text
                      style={{
                        fontFamily: FontFamily.semi_bold,
                        opacity: 0.6,
                        color: Colors.TextColor,
                      }}>
                      {version.indexOf(0) === 0 ? `${version}-beta` : version}
                    </Text>
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: FontFamily.semi_bold,
                          opacity: 0.6,
                          color: Colors.TextColor,
                        }}>
                        Powered by
                      </Text>
                      <Image
                        source={require('../../../assets/logo/logo.png')}
                        style={{
                          height: 30,
                          width: 30,
                          resizeMode: 'center',
                          opacity: 0.6,
                        }}
                      />
                    </View>
                  </View>
                )}
              />
            </View>
            <CustomModel
              open={Model}
              setopen={setModal}
              yes={{name: 'Ok', onPress: () => signOut()}}
              no={{name: 'Cancel'}}
              h1={'Are you sure you want to logout ?'}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  Header: {
    marginHorizontal: 10,
    marginVertical: 20,
    alignItems: 'flex-end',
    width: '98%',
  },
  TOP_VIEW: {
    height: SIZES.ScreenHeight / 2,
    transform: [{skewY: '-20deg'}],
    width: SIZES.ScreenWidth,
    marginTop: -SIZES.ScreenHeight / 5,
    marginStart: 0,
    borderBottomLeftRadius: SIZES.ScreenHeight / 5,
    elevation: 5,
  },
  ProfilePic: {
    height: 100,
    width: 100,
    borderRadius: 50,
    elevation: 5,
  },
  EDIT_PROFILEPIC: {
    position: 'absolute',
    right: -10,
  },
  ProfilePicView: {
    marginTop: -100,
    alignSelf: 'flex-end',
    marginEnd: 20,
  },
  SEC2: {
    paddingHorizontal: 30,
    marginTop: SIZES.ScreenHeight / 5,
    // backgroundColor:Colors.color4,
    // height:SIZES.ScreenHeight
    width: SIZES.ScreenWidth * 0.98,
    alignSelf: 'center',
    borderRadius: 20,
    // elevation:5,
    marginVertical: 20,
    padding: 10,
  },
  COUNTVIEW: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  COUNT: {
    alignItems: 'center',
  },
  COUNT_H1: {
    letterSpacing: 0.6,
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.TextColor,
    opacity: 0.4,
  },
  COUNT_H2: {
    letterSpacing: 1.3,
    fontWeight: 'bold',
    fontSize: 17,
    color: Colors.TextColor,
  },
  COMPLETETEXT: {
    fontSize: 20,
    // fontWeight:"bold",
    color: Colors.TextColor,
  },
  COMPLETEVIEW: {
    marginVertical: 15,
  },
  CARDVIEW1: {
    height: SIZES.ScreenHeight / 5,
    width: SIZES.ScreenWidth / 2.6,
    margin: 10,
    borderRadius: 20,
  },
  ImageView: {
    height: SIZES.ScreenHeight / 5,
    width: SIZES.ScreenWidth / 2.6,
    borderRadius: 20,
  },
  DIVIDER: {
    height: 2,
    width: 42,
    backgroundColor: Colors.TextColor,
    marginVertical: 3,
  },
  CARDVIEW_ICON: {
    position: 'absolute',
    bottom: 5,
    right: 30,
  },
  userDetail: {
    marginTop: -Sizes.ScreenHeight / 4,
    elevation: 5,
    paddingHorizontal: 40,
  },
});

export default Profile1;
