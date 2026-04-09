/**
 * View Screen: DetailScreen
 * Function Component with hooks — shows full school info with Google Material Design
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import InfoDialog from '../components/InfoDialog';

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
  const [dialogVisible, setDialogVisible] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
      <InfoDialog 
        visible={dialogVisible}
        school={school}
        onClose={() => {
          setDialogVisible(false);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { 
    padding: 12,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
  },
  backText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
});

export default DetailScreen;
