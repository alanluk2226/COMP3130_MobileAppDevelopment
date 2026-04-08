/**
 * View Component: SearchBar
 * Stateless component for search input with Google Material Design 3 and HTML/CSS inspired styling
 */
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.container}>
    <View style={styles.formGroup}>
      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder="Search schools by name or district..."
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          clearButtonMode="while-editing"
        />
      </View>
      <Text style={styles.helperText}>Enter school name or district to search</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  formGroup: {
    gap: 6,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 28,
    paddingHorizontal: 14,
    paddingVertical: 0,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    minHeight: 48,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#5F6368',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#202124',
    paddingVertical: 12,
    fontFamily: 'System',
  },
  helperText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '400',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
});

export default SearchBar;
