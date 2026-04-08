/**
 * View Screen: DetailScreen
 * Function Component with hooks — shows full school info with Google Material Design
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const InfoRow = ({ label, value, icon }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLabelContainer}>
      {icon && <Text style={styles.infoIcon}>{icon}</Text>}
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.infoValue}>{value || 'N/A'}</Text>
  </View>
);

const DetailScreen = ({ route, navigation }) => {
  const { school } = route.params;
  const [expanded, setExpanded] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          <TouchableOpacity 
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.name}>{school.nameEn}</Text>
            <Text style={styles.chinese}>{school.nameCh}</Text>
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{school.level}</Text>
              </View>
              <View style={[styles.badge, styles.badgeSecondary]}>
                <Text style={[styles.badgeText, styles.badgeTextSecondary]}>{school.gender}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Main Info Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>School Information</Text>
          <View style={styles.divider} />
          
          <InfoRow label="District" value={school.district} icon="📍" />
          <InfoRow label="Finance Type" value={school.financeType} icon="💼" />
          <InfoRow label="Phone" value={school.phone} icon="☎️" />

          {/* Expandable Address */}
          <TouchableOpacity 
            style={styles.expandButton}
            onPress={() => setExpanded(!expanded)}
            activeOpacity={0.7}
          >
            <View style={styles.expandContent}>
              <Text style={styles.expandIcon}>{expanded ? '▲' : '▼'}</Text>
              <Text style={styles.expandText}>
                {expanded ? 'Hide Address' : 'Show Address'}
              </Text>
            </View>
          </TouchableOpacity>

          {expanded && (
            <View style={styles.expandedSection}>
              <View style={styles.divider} />
              <InfoRow label="Address" value={school.address} icon="📬" />
            </View>
          )}
        </View>

        {/* Coordinates Card */}
        {school.latitude && school.longitude && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.divider} />
            <View style={styles.coordsContainer}>
              <Text style={styles.coordsLabel}>GPS Coordinates</Text>
              <View style={styles.coordsBox}>
                <Text style={styles.coordsText}>
                  📍 {school.latitude.toFixed(5)}, {school.longitude.toFixed(5)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.backBtnLarge} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backBtnLargeText}>← Return to List</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { padding: 12, paddingBottom: 24 },
  
  /* Header Card */
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: '#202124',
    fontWeight: '300',
  },
  headerContent: {
    flex: 1,
  },
  name: { 
    fontSize: 22, 
    fontWeight: '500', 
    color: '#202124',
    lineHeight: 28,
  },
  chinese: { 
    fontSize: 16, 
    color: '#5F6368',
    marginTop: 4,
    fontWeight: '400',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  badge: {
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeSecondary: {
    backgroundColor: '#F3F3F3',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
  },
  badgeTextSecondary: {
    color: '#5F6368',
  },

  /* Main Cards */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 12,
  },
  
  /* Info Rows */
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5F6368',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '400',
    color: '#202124',
    flex: 1,
    textAlign: 'right',
    paddingLeft: 12,
  },

  /* Expand Section */
  expandButton: {
    paddingVertical: 12,
    marginTop: 4,
  },
  expandContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandIcon: {
    fontSize: 16,
    color: '#1F2937',
    marginRight: 8,
    fontWeight: '300',
  },
  expandText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  expandedSection: {
    marginTop: 8,
  },

  /* Coordinates */
  coordsContainer: {
    paddingVertical: 8,
  },
  coordsLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5F6368',
    marginBottom: 8,
  },
  coordsBox: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#1F2937',
  },
  coordsText: {
    fontSize: 13,
    color: '#202124',
    fontWeight: '500',
    fontFamily: 'Menlo',
  },

  /* Back Button */
  backBtnLarge: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  backBtnLargeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default DetailScreen;
