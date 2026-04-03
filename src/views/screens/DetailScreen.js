/**
 * View Screen: DetailScreen
 * Function Component with hooks — shows full school info
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

const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || 'N/A'}</Text>
  </View>
);

const DetailScreen = ({ route, navigation }) => {
  const { school } = route.params;
  const [expanded, setExpanded] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.name}>{school.nameEn}</Text>
          <Text style={styles.chinese}>{school.nameCh}</Text>

          <View style={styles.divider} />

          <InfoRow label="District" value={school.district} />
          <InfoRow label="Level" value={school.level} />
          <InfoRow label="Gender" value={school.gender} />
          <InfoRow label="Finance Type" value={school.financeType} />
          <InfoRow label="Phone" value={school.phone} />

          <TouchableOpacity
            style={styles.toggle}
            onPress={() => setExpanded(!expanded)}>
            <Text style={styles.toggleText}>
              {expanded ? 'Hide Address ▲' : 'Show Address ▼'}
            </Text>
          </TouchableOpacity>

          {expanded && <InfoRow label="Address" value={school.address} />}

          {school.latitude && school.longitude && (
            <View style={styles.coords}>
              <Text style={styles.coordText}>
                📍 {school.latitude.toFixed(5)}, {school.longitude.toFixed(5)}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back to List</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  name: { fontSize: 18, fontWeight: '700', color: '#1a1a2e' },
  chinese: { fontSize: 15, color: '#555', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontSize: 13, color: '#888', flex: 1 },
  value: { fontSize: 13, color: '#333', flex: 2, textAlign: 'right' },
  toggle: { marginTop: 10, alignItems: 'center' },
  toggleText: { color: '#1967d2', fontSize: 13 },
  coords: {
    marginTop: 14,
    backgroundColor: '#f1f3f4',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  coordText: { fontSize: 12, color: '#555' },
  backBtn: { marginTop: 16, alignItems: 'center', padding: 12 },
  backText: { color: '#1967d2', fontSize: 14 },
});

export default DetailScreen;
