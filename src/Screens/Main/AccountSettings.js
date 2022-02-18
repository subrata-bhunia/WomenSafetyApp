import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {Colors, FontFamily, Sizes} from '../../Constants/constants';
import {CheckBox, Icon, Input} from 'react-native-elements';
import Button from '../../Components/Button';

const AccountSettings = ({route}) => {
  const userDetail = route?.params;
  const [image, setImage] = useState(userDetail?.photo);
  const [name_full, setname_full] = useState(userDetail?.full_name);
  const [verified, setverified] = useState(true);
  const name = name_full.split(' ');
  console.log('sgsgs', userDetail);
  return (
    <View style={styles.root}>
      <Header name={`Account Settings`} backBtn={true} />
      <ScrollView style={styles.root}>
        <View style={styles.root1}>
          <Text
            style={{
              fontFamily: FontFamily.semi_bold,
              fontSize: 18,
              color: '#000',
            }}>
            Personal Informations
          </Text>
          <Text
            style={{
              fontFamily: FontFamily.default,
              color: '#999',
              letterSpacing: 2,
            }}>
            Update Your Personal Details
          </Text>
          <View style={styles.profile}>
            {image ? (
              <Image
                source={{uri: image}}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 50,
                }}
              />
            ) : (
              <TouchableOpacity>
                <Icon name="camera" type="feather" color={Colors.color1} />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignSelf: 'center',
                marginTop: 20,
              }}>
              <Input
                label="First Name"
                caretHidden={true}
                defaultValue={name[0]}
                inputStyle={{
                  fontFamily: FontFamily.default,
                  textAlign: 'auto',
                  marginLeft: 10,
                }}
                containerStyle={{
                  width: '50%',
                }}
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 5,
                }}
                labelStyle={{
                  fontFamily: FontFamily.semi_bold,
                  color: '#000',
                }}
              />
              <Input
                label="Last Name"
                caretHidden={true}
                defaultValue={name[1]}
                inputStyle={{
                  fontFamily: FontFamily.default,
                  textAlign: 'auto',
                  marginLeft: 10,
                }}
                containerStyle={{
                  width: '50%',
                  borderBottomWidth: 0,
                }}
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 5,
                }}
                labelStyle={{
                  fontFamily: FontFamily.semi_bold,
                  color: '#000',
                }}
              />
            </View>
            <Input
              label="Email Address"
              caretHidden={true}
              keyboardType="email-address"
              defaultValue={userDetail?.email}
              inputStyle={{
                fontFamily: FontFamily.default,
                textAlign: 'auto',
                marginLeft: 10,
              }}
              containerStyle={{
                width: '100%',
                borderBottomWidth: 0,
              }}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 5,
              }}
              labelStyle={{
                fontFamily: FontFamily.semi_bold,
                color: '#000',
              }}
              rightIcon={
                verified ? (
                  <Icon
                    name="verified"
                    type="material"
                    color={Colors.color2}
                    style={{marginRight: 4}}
                    onPress={() => setverified(!verified)}
                  />
                ) : (
                  <TouchableOpacity
                    style={{marginRight: 5}}
                    onPress={() => setverified(!verified)}>
                    <Text
                      style={{
                        fontFamily: FontFamily.default,
                        color: Colors.color1,
                      }}>
                      Verify
                    </Text>
                  </TouchableOpacity>
                )
              }
            />
            <Input
              label="Mobile No"
              caretHidden={true}
              keyboardType="number-pad"
              defaultValue={`${userDetail?.phone}`}
              inputStyle={{
                fontFamily: FontFamily.default,
                textAlign: 'auto',
                marginLeft: 10,
              }}
              containerStyle={{
                width: '100%',
                borderBottomWidth: 0,
              }}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 5,
              }}
              labelStyle={{
                fontFamily: FontFamily.semi_bold,
                color: '#000',
              }}
              rightIcon={
                verified ? (
                  <Icon
                    name="verified"
                    type="material"
                    color={Colors.color2}
                    style={{marginRight: 4}}
                    onPress={() => setverified(!verified)}
                  />
                ) : (
                  <TouchableOpacity
                    style={{marginRight: 5}}
                    onPress={() => setverified(!verified)}>
                    <Text
                      style={{
                        fontFamily: FontFamily.default,
                        color: Colors.color1,
                      }}>
                      Verify
                    </Text>
                  </TouchableOpacity>
                )
              }
            />
          </View>
        </View>
        <View style={[styles.root1, {paddingTop: 0}]}>
          <Text
            style={{
              fontFamily: FontFamily.semi_bold,
              fontSize: 18,
              color: '#000',
            }}>
            Notifications
          </Text>
          <Text
            style={{
              fontFamily: FontFamily.default,
              color: '#999',
              letterSpacing: 2,
            }}>
            Choose type of notifications
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <CheckBox
              center
              title="SOS Notifications"
              checked={verified}
              onPress={() => setverified(!verified)}
              textStyle={{
                fontFamily: FontFamily.semi_bold,
              }}
              containerStyle={{
                backgroundColor: 'transparent',
              }}
            />
            <CheckBox
              center
              title="Nearby People"
              checked={verified}
              onPress={() => setverified(!verified)}
              textStyle={{
                fontFamily: FontFamily.semi_bold,
              }}
              containerStyle={{
                backgroundColor: 'transparent',
              }}
            />
            <CheckBox
              center
              title="Nearby People"
              checked={verified}
              onPress={() => setverified(!verified)}
              textStyle={{
                fontFamily: FontFamily.semi_bold,
              }}
              containerStyle={{
                backgroundColor: 'transparent',
              }}
            />
            <CheckBox
              center
              title="Test"
              checked={verified}
              onPress={() => setverified(!verified)}
              textStyle={{
                fontFamily: FontFamily.semi_bold,
              }}
              containerStyle={{
                backgroundColor: 'transparent',
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
            paddingVertical: 10,
          }}>
          <Button
            textStyle={{
              fontFamily: FontFamily.semi_bold,
              color: '#000',
            }}
            btnStyle={{
              elevation: 0,
            }}
            btnName={`Discard Changes`}
          />
          <Button
            btnStyle={{
              height: 55,
              width: Sizes.ScreenWidth * 0.5,
              borderRadius: 50,
              backgroundColor: Colors.color5,
            }}
            textStyle={{
              fontFamily: FontFamily.semi_bold,
              color: '#000',
            }}
            btnName="Save Changes"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  root1: {
    padding: 10,
    flex: 1,
  },
  profile: {
    borderWidth: 6,
    borderRadius: 100,
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    elevation: 5,
    borderStyle: 'solid',
    top: 5,
    borderColor: Colors.color3,
    borderBottomColor: Colors.color3,
  },
});
