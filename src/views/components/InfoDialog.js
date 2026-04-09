/**
 * View Component: InfoDialog
 * Modal dialog for displaying detailed school information
 */
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
  Platform,
} from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const InfoDialog = ({ visible, school, onClose }) => {
  const { lang } = useLanguage();
  if (!school) return null;

  const name = lang === 'zh' ? school.nameCh : school.nameEn;
  const subName = lang === 'zh' ? school.nameEn : school.nameCh;
  const district = lang === 'zh' ? school.districtCh : school.district;
  const level = lang === 'zh' ? school.levelCh : school.level;
  const gender = lang === 'zh' ? school.genderCh : school.gender;
  const financeType = lang === 'zh' ? school.financeTypeCh : school.financeType;
  const address = lang === 'zh' ? school.addressCh : school.address;

  const openMap = () => {
    const query = encodeURIComponent(school.nameEn + ' Hong Kong');

    const url = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`,
    });

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
      }
    });
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="fade">
      <SafeAreaView style={styles.overlay}>
        <View style={styles.dialogContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerIcon}>🏫</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* School Name */}
            <View style={styles.titleSection}>
              <Text style={styles.schoolName}>{name}</Text>
              <Text style={styles.schoolNameCh}>{subName}</Text>
            </View>

              <View style={styles.badgeSection}>
              <View style={styles.badge}>
                <Text style={styles.badgeIcon}>📚</Text>
                <Text style={styles.badgeText}>{level}</Text>
              </View>
              <View style={[styles.badge, styles.badgeAlt]}>
                <Text style={styles.badgeIcon}>👥</Text>
                <Text style={[styles.badgeText, styles.badgeTextAlt]}>{gender}</Text>
              </View>
              <View style={[styles.badge, styles.badgeAlt2]}>
                <Text style={styles.badgeIcon}>💼</Text>
                <Text style={[styles.badgeText, styles.badgeTextAlt]}>{financeType}</Text>
              </View>
            </View>

            {/* Info Rows */}
            <View style={styles.infoSection}>
              <InfoItem icon="📍" label={t(lang, 'district')} value={district} />
              <Divider />
              <InfoItem icon="☎️" label={t(lang, 'phone')} value={school.phone} />
              <Divider />
              <InfoItem icon="📬" label={t(lang, 'address')} value={address} />
              {school.latitude && school.longitude && (
                <>
                  <Divider />
                  <InfoItem
                    icon="🗺️"
                    label={t(lang, 'coordinates')}
                    value={`${school.latitude.toFixed(5)}, ${school.longitude.toFixed(5)}`}
                  />
                </>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionSection}>
              {school.address && school.address !== 'N/A' && (
                <TouchableOpacity
                  style={[styles.actionBtn, styles.mapBtn]}
                  onPress={openMap}
                  activeOpacity={0.7}>
                  <Text style={styles.mapIcon}>📍</Text>
                  <Text style={styles.actionBtnText}>{t(lang, 'viewOnMap')}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={onClose}
                activeOpacity={0.7}>
                <Text style={styles.actionBtnText}>{t(lang, 'close')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.spacer} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const Divider = () => <View style={styles.divider} />;

const InfoItem = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <View style={styles.infoLabelContainer}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.infoValue}>{value || 'N/A'}</Text>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dialogContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingHorizontal: 0,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerIcon: {
    fontSize: 32,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: '#202124',
    fontWeight: '600',
  },
  titleSection: {
    marginBottom: 16,
  },
  schoolName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#202124',
    lineHeight: 32,
  },
  schoolNameCh: {
    fontSize: 16,
    color: '#5F6368',
    marginTop: 4,
    fontWeight: '400',
  },
  badgeSection: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  badgeAlt: {
    backgroundColor: '#F0F0F0',
  },
  badgeAlt2: {
    backgroundColor: '#FEF7E0',
  },
  badgeIcon: {
    fontSize: 16,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1F2937',
  },
  badgeTextAlt: {
    color: '#5F6368',
  },
  infoSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  infoIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5F6368',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '400',
    color: '#202124',
    flex: 1,
    textAlign: 'right',
    paddingLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 8,
  },
  actionSection: {
    marginBottom: 16,
    gap: 10,
  },
  actionBtn: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  mapBtn: {
    backgroundColor: '#4285F4',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  mapIcon: {
    fontSize: 18,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 20,
  },
});

export default InfoDialog;
