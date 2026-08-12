import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BandejaScreen from '../screens/bandeja/BandejaScreen';
import PerfilScreen from '../screens/perfil/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Bandeja" component={BandejaScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
