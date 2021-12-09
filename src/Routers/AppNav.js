import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// ---------------------HOME--------------------------- //
import SafetyTips from '../Screens/Main/SafetyTips';
import SafeZone from '../Screens/Main/SafeZone';
import Circles from '../Screens/Main/Circles';
import Home from '../Screens/Main/Home';
// -----------TAB---------------- //
import Settings from '../Screens/Main/Settings';
import Profile from '../Screens/Main/Profile';
import About from '../Screens/Main/About';
import { Colors, FontFamily } from '../Constants/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
const HomeStack =createNativeStackNavigator();

function HomeStackScreen(){
    return(
        <HomeStack.Navigator
        initialRouteName="Homepage"
        screenOptions={{
            headerShown:false
        }}>
            <HomeStack.Screen name ='Homepage' component={Home} />
            <HomeStack.Screen name='SafetyTips' component={SafetyTips}/>
            <HomeStack.Screen name='SafeZone' component={SafeZone}/>
            <HomeStack.Screen name='Circles' component={Circles}/>
        </HomeStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
const AppNav = () => {
    return (
        <Tab.Navigator initialRouteName='Home'
         screenOptions={({route})=>({
             tabBarIcon:({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'earth'
                    : 'earth-outline';
                }else if(route.name === 'Setting'){
                    iconName = focused
                    ? 'ios-settings'
                    : 'ios-settings-outline';
                }else if(route.name === 'Profile'){
                    iconName = focused
                    ? 'person'
                    : 'person-outline';
                } else {
                    iconName = focused
                    ? 'md-help-circle'
                    : 'md-help-circle-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
             },
             tabBarActiveTintColor:Colors.color1,
             tabBarLabelStyle:{
                 fontFamily:FontFamily.semi_bold,
                 fontSize:12
             },
             headerShown:false
         })}
        >
            <Tab.Screen name='Home' component={HomeStackScreen} />
            <Tab.Screen name='Setting' component={Settings} />
            <Tab.Screen name='Profile' component={Profile} />
            <Tab.Screen name='Help' component={About} />
        </Tab.Navigator>
    )
}

export default AppNav

const styles = StyleSheet.create({})
