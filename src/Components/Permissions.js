import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  ScrollView,
  Linking,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors, FontFamily, Sizes} from '../Constants/constants';
import {name as appName} from '../app.json';
import {UIStore} from '../UIStore';
import DeviceInfo from 'react-native-device-info';
import {useNavigation} from '@react-navigation/core';
import Button from './Button';
const Permissions = () => {
  const [status, setStatus] = useState(true);
  const [status_P, setStatus_P] = useState(false);
  const navigation = useNavigation();

  // -------FUNCTIONS----------- //
  const Deny = () => {
    setStatus(false);
    ToastAndroid.show(
      'Deny Permissions',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    navigation.navigate('Auth');
  };
  // ---------------PERMISSIONS---------- //
  const Grant = () => {
    if (status === true) {
      let uniqueId = DeviceInfo.getUniqueId();
      let brandName = DeviceInfo.getManufacturer();
      UIStore.update(s => {
        s.deviceId = uniqueId;
        s.brandName = brandName;
      });
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        ]).then(result => {
          if (
            result['android.permission.ACCESS_COARSE_LOCATION'] &&
            result['android.permission.READ_CONTACTS'] &&
            result['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
          ) {
            UIStore.update(s => {
              s.AndroidPermission = 'granted';
            });
            setStatus_P(true);
            navigation.navigate('Auth');
          } else if (
            result['android.permission.READ_CONTACTS'] === 'never_ask_again'
          ) {
            ToastAndroid.show(
              `Please Go into Settings -> Applications -> ${appName} -> Permissions and Allow permissions to continue`,
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
            Linking.openSettings();
            UIStore.update(s => {
              s.AndroidPermission = 'never_ask_again';
            });
          }
        });
      }
    } else {
      ToastAndroid.show(
        'Deny Permissions',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  console.log(status_P);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{marginTop: 20}} onPress={() => Deny()}>
        <Text
          style={{
            textAlign: 'right',
            textDecorationStyle: 'dotted',
            textDecorationLine: 'underline',
            fontFamily: FontFamily.semi_bold,
            padding: 20,
            color: Colors.TextColor,
          }}>
          Deny Permissions
        </Text>
      </TouchableOpacity>
      <ScrollView
        stickyHeaderIndices={[0]}
        contentContainerStyle={{marginTop: 0, padding: 40}}>
        <View>
          <Text
            style={{
              fontFamily: FontFamily.default,
              color: '#000',
              fontSize: 17,
            }}>
            We take the following Permissions{'\n'} just for your safety.
          </Text>
        </View>
        {/* Contacts */}
        <View style={{padding: 20, paddingBottom: 0}}>
          <Text
            style={{
              fontFamily: FontFamily.semi_bold,
              fontSize: 20,
              color: Colors.TextColor,
            }}>
            <Icon type="material-community" name="account-multiple" /> Contacts
          </Text>
          <View style={{padding: 14}}>
            <View style={[styles.View2, {marginBottom: 7}]}>
              <Icon
                name="circle"
                type="font-awesome"
                size={12}
                color={'#474c54'}
              />
              <Text style={styles.Text}>
                Your contact informations for verify sos contact.
              </Text>
            </View>
            <View style={styles.View2}>
              <Icon
                name="circle"
                type="font-awesome"
                size={12}
                color={'#474c54'}
              />
              <Text style={styles.Text}>To make a call to sos contact.</Text>
            </View>
          </View>
        </View>
        {/* Camera & Files */}
        <View style={{paddingHorizontal: 20}}>
          <Text
            style={{
              fontFamily: FontFamily.semi_bold,
              fontSize: 20,
              color: Colors.TextColor,
            }}>
            <Icon type="font-awesome-5" name="camera" /> Camera
          </Text>
          <View style={{padding: 14}}>
            <View style={[styles.View2, {marginBottom: 7}]}>
              <Icon
                name="circle"
                type="font-awesome"
                size={12}
                color={'#474c54'}
              />
              <Text style={styles.Text}>
                Take Photo & Video we need Camera permission.
              </Text>
            </View>
            <View style={styles.View2}>
              <Icon
                name="circle"
                type="font-awesome"
                size={12}
                color={'#474c54'}
              />
              <Text style={styles.Text}>
                To store photo,video and recordings we need file permission.
              </Text>
            </View>
          </View>
        </View>
        {/* SMS */}
        <View style={{paddingHorizontal: 20}}>
          <Text
            style={{
              fontFamily: FontFamily.semi_bold,
              fontSize: 20,
              color: Colors.TextColor,
            }}>
            <Icon type="font-awesome-5" name="sms" /> SMS
          </Text>
          <View style={{padding: 14}}>
            <View style={[styles.View2, {marginBottom: 7}]}>
              <Icon
                name="circle"
                type="font-awesome"
                size={12}
                color={'#474c54'}
              />
              <Text style={styles.Text}>To read OTP for verification.</Text>
            </View>
            <View style={styles.View2}>
              <Icon
                name="circle"
                type="font-awesome"
                size={12}
                color={'#474c54'}
              />
              <Text style={styles.Text}>To send sms to sos contacts.</Text>
            </View>
          </View>
        </View>
        {/* Location */}
        <View style={{paddingHorizontal: 20}}>
          <Text
            style={{
              fontFamily: FontFamily.semi_bold,
              fontSize: 20,
              color: Colors.TextColor,
            }}>
            <Icon type="font-awesome-5" name="location-arrow" /> Location
          </Text>
          <View style={{padding: 14}}>
            <View style={[styles.View2, {marginBottom: 7}]}>
              <Icon
                name="circle"
                type="font-awesome"
                size={12}
                color={'#474c54'}
              />
              <Text style={styles.Text}>To access your current location.</Text>
            </View>
            <View style={styles.View2}>
              <Icon
                name="circle"
                type="font-awesome"
                size={12}
                color={'#474c54'}
              />
              <Text style={styles.Text}>
                To share your location to sos contact.
              </Text>
            </View>
          </View>
        </View>
        {/* Button */}
      </ScrollView>
      <View>
        <Button
          onPress={() => Grant()}
          btnStyle={{
            height: 50,
            width: Sizes.ScreenWidth * 0.9,
            borderRadius: 50,
            backgroundColor: Colors.color4,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            alignSelf: 'center',
          }}
          textStyle={{
            fontFamily: FontFamily.semi_bold,
            color: '#000',
          }}
          btnName="Grant Permissions"
        />
      </View>
    </View>
  );
};

export default Permissions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Text: {
    fontFamily: FontFamily.default,
    paddingLeft: 7,
    color: Colors.TextColor,
  },
  View2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
  },
});
