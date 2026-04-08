/**
 * View Component: SearchBar
 * Stateless component for search input with Google Material Design 3
 */
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.container}>
    <View style={styles.searchWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search schools by name or district..."
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="while-editing"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#202124',
    paddingVertical: 12,
    fontFamily: 'System',
  },
});

export default SearchBar;
