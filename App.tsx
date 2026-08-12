import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuthContext } from './app/context/AuthContext';
import AuthStack from './app/navigation/AuthStack';
import MainStack from './app/navigation/MainStack';

function RootNavigator() {
  const { user, loading } = useAuthContext();
  if (loading) return null; // TODO: pantalla de splash
  return user ? <MainStack /> : <AuthStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
