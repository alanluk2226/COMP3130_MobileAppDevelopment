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
import HomeScreen from './src/views/screens/HomeScreen';
import DetailScreen from './src/views/screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1967d2' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'HK School Finder', headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'School Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
