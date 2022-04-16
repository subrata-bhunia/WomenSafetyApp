import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from './Constants/constants';
import AppNav from './Routers/AppNav';
import AuthStack from './Routers/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoard from './Routers/OnBoardStack';
import AnimatedSplash from 'react-native-animated-splash-screen';
import HomeStackScreen from './Routers/AppNav';
import axios from 'axios';
import {AuthContext} from './Components/context';
import jwt_decode from 'jwt-decode';
import {SignIn} from './api/session';
import {UIStore} from './UIStore';
import RNShake from 'react-native-shake';
import PushNotification from 'react-native-push-notification';
import chL from '../assets/voices/chL.mp3';

const App = props => {
  console.log('props', props);

  PushNotification.createChannel({
    channelId: 'woman-safety-app',
    channelName: 'Woman Safety',
  });

  const [login, setLogin] = useState(false);
  const [onboard, setonboard] = useState(false);
  const [splash, setsplash] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');

      if (value !== null) {
        setonboard(true);
      }
    } catch (error) {
      console.log('CheckOnboarding', error);
    }
  };

  const checkLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('@login');
      //  console.log("value_login_AS",value);
      if (value !== null) {
        setLogin(true);
      }
    } catch (error) {
      console.log('CheckOnboarding', error);
    }
  };

  const [mainBtn, setmainBtn] = useState('SOS');

  const authContext = React.useMemo(() => ({
    signIn: (email, password) => {
      if (email < 2 || password < 6) {
        alert(`🔸 Please Check email \n🔸 Please Check Password [>6] \n`);
      } else {
        SignIn({
          full_name: email,
          password: password,
        })
          .then(function (response) {
            if (response.data.success === 0) {
              alert(response.data.data);
            } else {
              try {
                AsyncStorage.setItem('@login', 'true');
                UIStore.update(s => {
                  (s.user_token = response.data.token), (s.login = true);
                });
                var user_data = jwt_decode(response.data.token);
                if (user_data !== undefined) {
                  UIStore.update(s => {
                    s.userId = user_data.result.user_id;
                  });
                  var userId = user_data.result.user_id;
                  try {
                    AsyncStorage.setItem('@userId', `${userId}`);
                    setLogin(true);
                    console.log('dfsghshs', userId);
                  } catch (err) {
                    console.log(err);
                  }
                }
              } catch (err) {
                if (err) {
                  console.log('Login/60', err);
                }
              }
            }
          })
          .catch(err => {
            if (err) {
              // signIn(email,password)
            }
          });
      }
    },
    signOut: () => {
      try {
        AsyncStorage.removeItem('@login');
        AsyncStorage.removeItem('@userId');
        const val = AsyncStorage.getItem('@login');
        setLogin(false);
        UIStore.update(s => {
          (s.user_token = null), (s.login = false);
        });
        console.log('tyuiuiy');
      } catch (err) {
        console.log('ERROR/PROFILE/142', err);
      }
    },
    sosClick: () => {
      setmainBtn(mainBtn == 'STOP' ? 'SOS' : 'STOP');
      if (mainBtn == 'STOP') {
        PushNotification.localNotification({
          channelId: 'woman-safety-app',
          title: 'Your Emargency alert has started.',
          message: 'You are shakeing your device . Your Alert start . ',
          actions: ['Stop'],
          messageId: 1,
          category: 'Warning',
          color: 'red',
          ongoing: true,
          id: 1,
          picture: 'https://source.unsplash.com/random/?city,night',
          // soundName: 'chL',
        });
      } else {
        PushNotification.cancelLocalNotification(1);
      }
      return new Promise(res => {
        res(mainBtn);
      });
    },
  }));

  useEffect(() => {
    checkOnboarding();
    checkLogin();
    setsplash(true);
  }, [login]);

  React.useEffect(() => {
    const subscription = RNShake.addListener(() => {
      PushNotification.localNotification({
        channelId: 'woman-safety-app',
        title: 'Your Emargency alert has started.',
        message: 'You are shakeing your device . Your Alert start . ',
        actions: ['Stop'],
        messageId: 1,
        category: 'Warning',
        color: 'red',
        ongoing: true,
        id: 1,
        picture: 'https://source.unsplash.com/random/?city,night',
        // soundName: 'chL',
      });
    });

    return () => {
      // Your code here...
      subscription.remove();
    };
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <AnimatedSplash
          translucent={true}
          isLoaded={splash}
          logoImage={require('../assets/logo/app_logo.png')}
          backgroundColor={'#fff'}
          logoHeight={150}
          logoWidth={150}

          // customComponent={<Text>Feel Save Anywhere and Everywhere</Text>}
        >
          {onboard ? login ? <HomeStackScreen /> : <AuthStack /> : <OnBoard />}
        </AnimatedSplash>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.color1,
  },
});
export default App;
