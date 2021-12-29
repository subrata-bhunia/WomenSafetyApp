import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../Components/Onboarding';
import Permissions from '../Components/Permissions';
import AuthStack from './AuthStack';
export default function OnBoard() {
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
             <Stack.Screen name='Auth' component={AuthStack} />
        </Stack.Navigator>
    )
}
