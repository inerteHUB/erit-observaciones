import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import CrearObservacionScreen from '../screens/crear/CrearObservacionScreen';
import SelectorUbicacionScreen from '../screens/crear/SelectorUbicacionScreen';
import DetalleObservacionScreen from '../screens/detalle/DetalleObservacionScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="CrearObservacion"
        component={CrearObservacionScreen}
        options={{ presentation: 'modal', title: 'Reportar observación' }}
      />
      <Stack.Screen
        name="SelectorUbicacion"
        component={SelectorUbicacionScreen}
        options={{ presentation: 'modal', title: 'Selecciona ubicación' }}
      />
      <Stack.Screen
        name="DetalleObservacion"
        component={DetalleObservacionScreen}
        options={{ title: 'Detalle' }}
      />
    </Stack.Navigator>
  );
}
