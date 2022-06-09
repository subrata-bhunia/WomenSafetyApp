import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, FontFamily, Sizes} from '../../Constants/constants';
import MapView, {Marker} from 'react-native-maps';
import GetLocation, {PROVIDER_GOOGLE} from 'react-native-get-location';
import {BallIndicator} from 'react-native-indicators';
import {UIStore} from '../../UIStore';
import {Icon} from 'react-native-elements';
import Button from '../../Components/Button';
import chL from '../../../assets/voices/chL.mp3';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Components/context';
import RNFullBatteryStatus from 'react-native-full-battery-status';
import {batteryLow, getAllContact, sendSOS} from '../../api/sos';
import PushNotification from 'react-native-push-notification';
import RNShake from 'react-native-shake';
import axios from 'axios';
var Sound = require('react-native-sound');
const Home = () => {
  // const {sosClick} = React.useContext(AuthContext);
  const [btnName, setbtnName] = useState('SOS');
  const currentLocation = UIStore.useState(s => s.lastLocation);
  Sound.setCategory('Playback');
  var audio = new Sound(chL, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // if loaded successfully
    console.log(
      'duration in seconds: ' +
        audio.getDuration() +
        'number of channels: ' +
        audio.getNumberOfChannels(),
    );
    // audio.play(success => {
    //     if (success) {
    //       console.log('successfully finished playing');
    //     } else {
    //       console.log('playback failed due to audio decoding errors');
    //     }
    //   });
  });
  const user_id = UIStore.useState(s => s.userId);
  const getAllSOSContact = () => {
    getAllContact({user_id: user_id})
      .then(res => {
        if (res.data?.success == 1) {
          setcircle(res.data?.data);
        }
      })
      .catch(err => {
        getAllSOSContact();
      });
  };
  const checkUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('@userId');
      if (value !== null) {
        console.log('UserID/HOME', value);
        UIStore.update(s => {
          s.userId = value;
        });
      }
    } catch (error) {
      console.log('checkUserId/Home', error);
    }
  };
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        UIStore.update(s => {
          s.lastLocation = location;
        });
        console.log('location');
      })
      .catch(err => {
        console.log('err===>', err);
        audio.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
        audio.setNumberOfLoops(0);
      });
    // ----
    //   --------------
    checkUserId();
    // ------------
    getAllSOSContact();
  }, [user_id]);
  // ------------------------------------------- //
  const navigation = useNavigation();
  const [region, setRegion] = React.useState({
    // longitud,
    latitudeDelta: 0.0054,
    longitudeDelta: 0.0053,
  });
  const onPressZoomIn = () => {
    var add = {
      ...region,
      latitudeDelta: region.latitudeDelta * 10,
      longitudeDelta: region.longitudeDelta * 10,
    };

    setRegion(add);
    // this.map.animateToRegion(this.region, 100);
  };

  const onPressZoomOut = () => {
    var minus = {
      ...region,
      latitudeDelta: region.latitudeDelta / 10,
      longitudeDelta: region.longitudeDelta / 10,
    };
    setRegion(minus);
    // map.animateToRegion(region, 100);
  };
  // ---------------------- //
  function gotoSafetyTips() {
    navigation.navigate('SafetyTips');
  }
  function gotoCircles() {
    navigation.navigate('Circles');
  }
  function gotoSafeZone() {
    navigation.navigate('SafeZone');
  }

  // console.log("currentLocation =>",currentLocation)
  const [circle, setcircle] = useState([]);
  const [battery, setbattery] = useState();
  // console.log(circle);
  RNFullBatteryStatus.getBatteryPercent().then(res => {
    setbattery(res);
  });
  const getRelation = relation => {
    if (relation == 'brother') {
      return 'Sister';
    } else if (relation == 'father') {
      return 'Daughter';
    } else if (relation == 'mother') {
      return 'Daughter';
    } else if (relation == 'friend') {
      return 'Friend';
    } else if (relation == 'son') {
      return 'Mother';
    } else {
      return 'Know Person';
    }
  };
  const getFirstName = (full_name = '') => {
    var name_arr = full_name.split(' ');
    return name_arr[0];
  };
  // Battery 5%
  useEffect(() => {
    if (battery < 6) {
      for (let i = 0; i < circle.length; i++) {
        // console.log(battery);
        batteryLow({
          name: getFirstName(userDetail?.full_name),
          relation: getRelation(circle[i]?.relation?.toLowerCase()),
          phone: circle[i]?.phone1,
          latitude: currentLocation.longitude,
          longitude: currentLocation.latitude,
        }).then(res => {
          // console.log(res.data);
        });
      }
    }
  }, [battery]);
  //  SOS PRESS
  const SOSPRESS = () => {
    for (let i = 0; i < circle.length; i++) {
      // console.log(battery);
      sendSOS({
        name: getFirstName(userDetail?.full_name),
        relation: getRelation(circle[i]?.relation?.toLowerCase()),
        phone: circle[i]?.phone1,
        latitude: currentLocation.longitude,
        longitude: currentLocation.latitude,
      });
    }
    PushNotification.localNotification({
      channelId: 'woman-safety-app',
      title: 'Your Emargency alert has started.',
      message:
        'You are press your sos botton . Your all contact are notified . ',
      messageId: 1,
      category: 'Warning',
      color: 'red',
      // ongoing: true,
      id: 1,
      // soundName: 'chL',
    });
  };
  // SHAKE
  React.useEffect(() => {
    const subscription = RNShake.addListener(() => {
      for (let i = 0; i < circle.length; i++) {
        // console.log(battery);
        sendSOS({
          name: getFirstName(userDetail?.full_name),
          relation: getRelation(circle[i]?.relation?.toLowerCase()),
          phone: circle[i]?.phone1,
          latitude: currentLocation.longitude,
          longitude: currentLocation.latitude,
        });
      }
      PushNotification.localNotification({
        channelId: 'woman-safety-app',
        title: 'Your Emargency alert has started.',
        message:
          'You are shakeing your device . Your Alert start to all contact. ',
        // actions: ['Stop'],
        messageId: 1,
        category: 'Warning',
        color: 'red',
        // ongoing: true,
        id: 1,
        // picture: 'https://source.unsplash.com/random/?city,night',
        // soundName: 'chL',
      });
    });

    return () => {
      // Your code here...
      subscription.remove();
    };
  }, []);
  const url = UIStore.useState(s => s.localUrl);
  const [userDetail, setuserDetail] = useState(null);
  const apiUrl = url + '/users/' + user_id;
  const userDetails = async () => {
    if (user_id) {
      await axios({
        method: 'get',
        url: apiUrl,
      })
        .then(res => setuserDetail(res.data?.data))
        .catch(err => {
          if (err) {
            console.log(err);
            userDetails();
          }
        });
    }
  };
  useEffect(() => {
    userDetails();
  }, []);
  // console.log('userDetail', userDetail, '=', user_id);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* <StatusBar hidden /> */}
      {currentLocation === null ? (
        <BallIndicator />
      ) : (
        <MapView
          region={{
            latitude: currentLocation.latitude,
            // latitude:22.572645,
            longitude: currentLocation.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          }}
          style={{
            height: '100%',
            width: '100%',
            opacity: 1,
          }}
          mapType="standard"
          // showsMyLocationButton={true}
          // region={}
        >
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitudeDelta: 0.0014,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0014,
            }}
            pinColor="green"
            //  image={require('../../../assets/images/icons/green.png')}
            title="Your Current Location"
            description="Good To see you"
          />
          <Marker
            coordinate={{
              latitude: currentLocation.latitude + 0.001,
              longitudeDelta: 0.1,
              longitude: currentLocation.longitude + 0.001,
              latitudeDelta: 0.1,
            }}
            title="Test Title"
            description="Test Description"
          />
          <Marker
            coordinate={{
              latitude: currentLocation.latitude + 0.0011,
              longitudeDelta: 0.1,
              longitude: currentLocation.longitude + 0.0021,
              latitudeDelta: 0.1,
            }}
            title="Test Title"
            description="Test Description"
          />
          <Marker
            coordinate={{
              latitude: currentLocation.latitude + 0.0019,
              longitudeDelta: 0.1,
              longitude: currentLocation.longitude - 0.001,
              latitudeDelta: 0.1,
            }}
            //  pinColor='red'
            //  image={require('../../../assets/images/icons/red.png')}
            title="Test Title"
            description="Test Description"
          />
          <Marker
            coordinate={{
              latitude: currentLocation.latitude - 0.001,
              longitudeDelta: 0.1,
              longitude: currentLocation.longitude - 0.001,
              latitudeDelta: 0.1,
            }}
          />
        </MapView>
      )}
      <View style={{position: 'absolute', top: 100}}>
        {/* ------------------------- */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            alignSelf: 'center',
            marginTop: 20,
            marginLeft: -10,
          }}>
          <View>
            <Button
              onPress={() => gotoSafetyTips()}
              btnStyle={{
                height: 50,
                width: Sizes.ScreenWidth * 0.4,
                borderRadius: 50,
                backgroundColor: Colors.color5,
              }}
              textStyle={{
                fontFamily: FontFamily.semi_bold,
                color: '#000',
              }}
              btnName=" Safety tips"
              icon={{
                name: 'profile',
                type: 'ant-design',
              }}
            />
          </View>
          <View>
            <Button
              onPress={() => gotoCircles()}
              btnStyle={{
                height: 50,
                width: Sizes.ScreenWidth * 0.4,
                borderRadius: 50,
                backgroundColor: Colors.color5,
              }}
              textStyle={{
                fontFamily: FontFamily.semi_bold,
                color: '#000',
              }}
              btnName=" Circles"
              icon={{
                name: 'account-group-outline',
                type: 'material-community',
              }}
            />
          </View>
        </View>
        {/* ------------------------- */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            alignSelf: 'center',
            marginTop: 20,
            marginLeft: -10,
          }}></View>
        {/* ---------------------------------- */}
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'flex-end',
            margin: 30,
            justifyContent: 'space-around',
            height: 140,
          }}>
          <View>
            <TouchableOpacity
              onPress={() => onPressZoomIn()}
              style={{
                height: 50,
                width: 50,
                borderRadius: 35,
                backgroundColor: Colors.color5,
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 5,
                justifyContent: 'center',
              }}>
              <Icon name="zoom-in" type="feather" size={25} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => onPressZoomOut()}
              style={{
                height: 50,
                width: 50,
                borderRadius: 35,
                backgroundColor: Colors.color5,
                alignItems: 'center',
                elevation: 5,
                justifyContent: 'center',
              }}
              noPressedState={true}>
              <Icon name="zoom-out" type="feather" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        {/* ---------------------------------- */}
      </View>
      <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
        <View>
          <TouchableOpacity
            //  onPress={()=>AsyncStorage.clear((err)=>console.log("Error Clear",err))}
            onPress={() => {
              SOSPRESS();
            }}
            style={{
              height: 150,
              width: 150,
              borderRadius: 75,
              backgroundColor: Colors.color1,
              alignItems: 'center',
              elevation: 1,
              justifyContent: 'center',
              borderWidth: 10,
              borderStyle: 'dashed',
              borderColor: Colors.color1,
            }}
            activeOpacity={0.4}>
            <Text
              style={{
                fontFamily: FontFamily.bold,
                color: '#fff',
                fontSize: 30,
              }}>
              SOS
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent:"center",
    //   alignItems:"center",
    backgroundColor: Colors.color5,
  },
});
