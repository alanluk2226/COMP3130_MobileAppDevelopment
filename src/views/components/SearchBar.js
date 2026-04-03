/**
 * View Component: SearchBar
 * Stateless component for search input
 */
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search by name or district..."
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      clearButtonMode="while-editing"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#f1f3f4',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
});

export default SearchBar;
