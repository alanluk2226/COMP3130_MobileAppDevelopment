/**
 * View Component: SchoolCard
 * Stateless/Function component — displays a single school summary with Google Material Design
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SchoolCard = ({ school, onPress }) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={() => onPress(school)}
    activeOpacity={0.7}
  >
    <View style={styles.contentWrapper}>
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={2}>{school.nameEn}</Text>
        <Text style={styles.chinese} numberOfLines={1}>{school.nameCh}</Text>
      </View>
      <View style={styles.tagsContainer}>
        <Text style={styles.tag}>{school.district}</Text>
        <Text style={[styles.tag, styles.tagSecondary]}>{school.level}</Text>
      </View>
    </View>
    <View style={styles.rightArrow}>
      <Text style={styles.arrowIcon}>›</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  contentWrapper: {
    flex: 1,
    marginRight: 8,
  },
  textContainer: {
    marginBottom: 8,
  },
  name: { 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#202124',
    lineHeight: 24,
  },
  chinese: { 
    fontSize: 14, 
    color: '#5F6368',
    marginTop: 4,
    fontWeight: '400',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E8F0FE',
    color: '#1F2937',
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagSecondary: {
    backgroundColor: '#F3F3F3',
    color: '#5F6368',
  },
  rightArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
  },
  arrowIcon: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300',
  },
});

export default SchoolCard;
