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
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider } from './src/context/Theme';
import SplashScreen from './src/views/screens/SplashScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailScreen from './src/views/screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </LanguageProvider>
  );
}
