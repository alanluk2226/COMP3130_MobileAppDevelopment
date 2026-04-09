import React, {useState, useEffect} from 'react';
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
import {useTheme} from '../../context/Theme';
import {useLanguage} from '../../context/LanguageContext';
import {t} from '../../i18n/translations';
import {
  getBookmarks,
  toggleBookmark,
} from '../../controllers/BookmarkController';

const InfoDialog = ({visible, school, onClose}) => {
  const {lang} = useLanguage();
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  if (!school) return null;

  useEffect(() => {
    const load = async () => {
      const bm = await getBookmarks();
      setBookmarks(bm);
      setIsBookmarked(bm.includes(school.id));
    };
    if (visible) load();
  }, [visible, school.id]);

  const handleToggleBookmark = async () => {
    const newBookmarks = await toggleBookmark(school.id, bookmarks);
    setBookmarks(newBookmarks);
    setIsBookmarked(newBookmarks.includes(school.id));
  };

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
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(
          `https://www.google.com/maps/search/?api=1&query=${query}`,
        );
      }
    });
  };

  const Divider = () => <View style={styles.divider} />;

  const InfoItem = ({icon, label, value}) => (
    <View style={styles.infoItem}>
      <View style={styles.infoLabelContainer}>
        <Text style={styles.infoIcon}>{icon}</Text>
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value || 'N/A'}</Text>
    </View>
  );

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
            {/* Header with only close button */}
            <View style={styles.header}>
              <Text style={styles.headerIcon}>🏫</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* School name with star beside it */}
            <View style={styles.titleSection}>
              <View style={styles.nameRow}>
                <Text style={styles.schoolName}>{name}</Text>
                <TouchableOpacity
                  onPress={handleToggleBookmark}
                  style={styles.starButton}>
                  <Text
                    style={[
                      styles.starIcon,
                      {color: isBookmarked ? '#F4B400' : theme.textSecondary},
                    ]}>
                    {isBookmarked ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.schoolNameCh}>{subName}</Text>

              {/* Info text about bookmark */}
              <Text style={styles.bookmarkInfo}>
                {isBookmarked
                  ? t(lang, 'bookmarkedHint')
                  : t(lang, 'bookmarkHint')}
              </Text>
            </View>

            <View style={styles.badgeSection}>
              <View style={styles.badge}>
                <Text style={styles.badgeIcon}>📚</Text>
                <Text style={styles.badgeText}>{level}</Text>
              </View>
              <View style={[styles.badge, styles.badgeAlt]}>
                <Text style={styles.badgeIcon}>👥</Text>
                <Text style={[styles.badgeText, styles.badgeTextAlt]}>
                  {gender}
                </Text>
              </View>
              <View style={[styles.badge, styles.badgeAlt2]}>
                <Text style={styles.badgeIcon}>💼</Text>
                <Text style={[styles.badgeText, styles.badgeTextAlt]}>
                  {financeType}
                </Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <InfoItem
                icon="📍"
                label={t(lang, 'district')}
                value={district}
              />
              <Divider />
              <InfoItem
                icon="☎️"
                label={t(lang, 'phone')}
                value={school.phone}
              />
              <Divider />
              <InfoItem icon="📬" label={t(lang, 'address')} value={address} />
              {school.latitude && school.longitude && (
                <>
                  <Divider />
                  <InfoItem
                    icon="🗺️"
                    label={t(lang, 'coordinates')}
                    value={`${school.latitude.toFixed(
                      5,
                    )}, ${school.longitude.toFixed(5)}`}
                  />
                </>
              )}
            </View>

            <View style={styles.actionSection}>
              {school.address && school.address !== 'N/A' && (
                <TouchableOpacity
                  style={[styles.actionBtn, styles.mapBtn]}
                  onPress={openMap}>
                  <Text style={styles.mapIcon}>📍</Text>
                  <Text style={styles.actionBtnText}>
                    {t(lang, 'viewOnMap')}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.actionBtn} onPress={onClose}>
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

const getStyles = theme =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.modalOverlay,
      justifyContent: 'flex-end',
    },
    dialogContainer: {
      backgroundColor: theme.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      maxHeight: '90%',
      paddingHorizontal: 0,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 12,
      shadowOffset: {width: 0, height: -4},
      elevation: 12,
    },
    scrollView: {paddingHorizontal: 20, paddingTop: 16},
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    headerIcon: {fontSize: 32},
    closeBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.settingsBtn,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeIcon: {fontSize: 20, color: theme.textPrimary, fontWeight: '600'},
    titleSection: {marginBottom: 16},
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    schoolName: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.textPrimary,
      lineHeight: 32,
      flex: 1,
      flexWrap: 'wrap',
    },
    starButton: {
      padding: 8,
      marginLeft: 8,
    },
    starIcon: {fontSize: 28},
    schoolNameCh: {fontSize: 16, color: theme.textSecondary, marginTop: 4},
    bookmarkInfo: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 8,
      fontStyle: 'italic',
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
      backgroundColor: theme.surface,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      gap: 6,
    },
    badgeAlt: {backgroundColor: theme.surface},
    badgeAlt2: {backgroundColor: theme.warningBg},
    badgeIcon: {fontSize: 16},
    badgeText: {fontSize: 13, fontWeight: '500', color: theme.textPrimary},
    badgeTextAlt: {color: theme.textSecondary},
    infoSection: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: theme.border,
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
    infoIcon: {fontSize: 18, width: 24, textAlign: 'center'},
    infoLabel: {fontSize: 13, fontWeight: '500', color: theme.textSecondary},
    infoValue: {
      fontSize: 13,
      fontWeight: '400',
      color: theme.textPrimary,
      flex: 1,
      textAlign: 'right',
      paddingLeft: 12,
    },
    divider: {height: 1, backgroundColor: theme.border, marginVertical: 8},
    actionSection: {marginBottom: 16, gap: 10},
    actionBtn: {
      backgroundColor: theme.accent,
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 16,
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: {width: 0, height: 2},
    },
    mapBtn: {
      backgroundColor: '#4285F4',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    },
    mapIcon: {fontSize: 18},
    actionBtnText: {color: '#FFFFFF', fontSize: 16, fontWeight: '600'},
    spacer: {height: 20},
  });

export default InfoDialog;
