import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import Onboarding from '../Components/Onboarding';
import Permissions from '../Components/Permissions';
export default function AuthStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
         initialRouteName="Onboarding"
         screenOptions={{
             headerShown:false
         }}
         >
             <Stack.Screen name="Onboarding" component={Onboarding} />
             <Stack.Screen name="Permissions" component={Permissions} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}
