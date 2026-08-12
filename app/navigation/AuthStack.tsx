import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginQRScreen from '../screens/auth/LoginQRScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginQR" component={LoginQRScreen} />
    </Stack.Navigator>
  );
}
