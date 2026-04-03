/**
 * View Component: SchoolCard
 * Stateless/Function component — displays a single school summary
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SchoolCard = ({ school, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(school)}>
    <Text style={styles.name} numberOfLines={2}>{school.nameEn}</Text>
    <Text style={styles.chinese} numberOfLines={1}>{school.nameCh}</Text>
    <View style={styles.row}>
      <Text style={styles.tag}>{school.district}</Text>
      <Text style={styles.tag}>{school.level}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  name: { fontSize: 15, fontWeight: '600', color: '#1a1a2e' },
  chinese: { fontSize: 13, color: '#555', marginTop: 2 },
  row: { flexDirection: 'row', marginTop: 8, gap: 8 },
  tag: {
    backgroundColor: '#e8f0fe',
    color: '#1967d2',
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
});

export default SchoolCard;
