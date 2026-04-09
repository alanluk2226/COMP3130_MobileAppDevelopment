/**
 * App.js — Entry point
 * MVC Structure:
 *   Model:      src/models/School.js
 *   Controller: src/controllers/SchoolController.js
 *   View:       src/views/screens/ & src/views/components/
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/views/screens/SplashScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailScreen from './src/views/screens/DetailScreen';
import { LanguageProvider } from './src/context/LanguageContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#1F2937',
          headerTitleStyle: { fontWeight: '600', fontSize: 18 },
          headerShadowVisible: false,
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Hong Kong Schools', headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ 
            title: 'School Details',
            headerShown: false,
            animationEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </LanguageProvider>
  );
}
