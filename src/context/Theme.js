import React, {createContext, useState, useEffect, useContext} from 'react';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const lightTheme = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  textPrimary: '#202124',
  textSecondary: '#5F6368',
  border: '#E8E8E8',
  card: '#FFFFFF',
  accent: '#1F2937',
  error: '#D32F2F',
  warning: '#9C6C00',
  warningBg: '#FEF7E0',
  modalOverlay: 'rgba(0,0,0,0.4)',
  settingsBtn: '#F3F3F3',
  langOptionBg: '#F3F3F3',
};

export const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  textPrimary: '#E8EAED',
  textSecondary: '#9AA0A6',
  border: '#2C2C2C',
  card: '#1E1E1E',
  accent: '#4A90E2',
  error: '#CF6679',
  warning: '#F4B400',
  warningBg: '#332A00',
  modalOverlay: 'rgba(0,0,0,0.8)',
  settingsBtn: '#2C2C2C',
  langOptionBg: '#2C2C2C',
};

export const ThemeProvider = ({children}) => {
  const [themeMode, setThemeMode] = useState('light'); // 'light', 'dark', or 'system'

  useEffect(() => {
    // Load saved preference
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem('themeMode');
        if (saved) setThemeMode(saved);
      } catch (e) {}
    };
    loadTheme();

    // Listen to system changes
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      if (themeMode === 'system') {
        // Force re-render when system changes
        setThemeMode('system');
      }
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = mode => {
    setThemeMode(mode);
    AsyncStorage.setItem('themeMode', mode);
  };

  const getEffectiveTheme = () => {
    if (themeMode === 'system') {
      return Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
    }
    return themeMode === 'dark' ? darkTheme : lightTheme;
  };

  const theme = getEffectiveTheme();
  const isDark =
    themeMode === 'dark' ||
    (themeMode === 'system' && Appearance.getColorScheme() === 'dark');

  return (
    <ThemeContext.Provider value={{theme, isDark, themeMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
