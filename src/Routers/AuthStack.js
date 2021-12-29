import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import AppNav from './AppNav';


export default function AuthStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
         initialRouteName="Login"
         screenOptions={{
             headerShown:false
         }}
         >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name = "HomeNav" component ={AppNav} />
        </Stack.Navigator>
    )
}
