import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CustomListView from '../components/CustomListView';
import {fetchSchools, filterSchools} from '../../controllers/SchoolController';
import {useLanguage} from '../../context/LanguageContext';
import {useTheme} from '../../context/Theme';
import {t} from '../../i18n/translations';

const HomeScreen = ({navigation}) => {
  const {lang, toggleLang} = useLanguage();
  const {theme, isDark, themeMode, toggleTheme} = useTheme();

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [fromCache, setFromCache] = useState(false);
  const [activeLevel, setActiveLevel] = useState('All');
  const [sortAZ, setSortAZ] = useState(false);
  const [activeGender, setActiveGender] = useState('All');
  const [activeFinance, setActiveFinance] = useState('All');
  const [activeRegion, setActiveRegion] = useState('All');
  const [showLangModal, setShowLangModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function load() {
      try {
        const {schools, fromCache} = await fetchSchools();
        setSchools(schools);
        setFromCache(fromCache);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (showLangModal) {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
      });
    }
  }, [showLangModal, slideAnim]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const closeModal = () => {
    setShowLangModal(false);
  };

  const filtered = filterSchools(
    schools,
    query,
    activeLevel,
    activeGender,
    activeFinance,
    activeRegion,
    sortAZ,
  );

  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>{t(lang, 'appTitle')}</Text>
            <Text style={styles.subtitle}>
              {loading
                ? t(lang, 'loading')
                : t(lang, 'results')(filtered.length)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => setShowLangModal(true)}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
        {fromCache && (
          <View style={styles.cacheNoticeContainer}>
            <Text style={styles.cacheNotice}>{t(lang, 'offlineMode')}</Text>
          </View>
        )}
      </View>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={closeModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}>
          <Animated.View
            style={[styles.modalCard, {transform: [{translateY}]}]}>
            <Text style={styles.modalTitle}>{t(lang, 'settingsTitle')}</Text>

            <TouchableOpacity
              style={[
                styles.langOption,
                lang === 'en' && styles.langOptionActive,
              ]}
              onPress={() => {
                toggleLang();
                closeModal();
              }}>
              <Text
                style={[
                  styles.langOptionText,
                  lang === 'en' && styles.langOptionTextActive,
                ]}>
                English
              </Text>
              {lang === 'en' && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langOption,
                lang === 'zh' && styles.langOptionActive,
              ]}
              onPress={() => {
                toggleLang();
                closeModal();
              }}>
              <Text
                style={[
                  styles.langOptionText,
                  lang === 'zh' && styles.langOptionTextActive,
                ]}>
                繁體中文
              </Text>
              {lang === 'zh' && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>

            <Text style={[styles.modalTitle, {marginTop: 16, marginBottom: 8}]}>
              Theme
            </Text>
            <TouchableOpacity
              style={[
                styles.langOption,
                themeMode === 'light' && styles.langOptionActive,
              ]}
              onPress={() => {
                toggleTheme('light');
                closeModal();
              }}>
              <Text
                style={[
                  styles.langOptionText,
                  themeMode === 'light' && styles.langOptionTextActive,
                ]}>
                Light
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langOption,
                themeMode === 'dark' && styles.langOptionActive,
              ]}
              onPress={() => {
                toggleTheme('dark');
                closeModal();
              }}>
              <Text
                style={[
                  styles.langOptionText,
                  themeMode === 'dark' && styles.langOptionTextActive,
                ]}>
                Dark
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langOption,
                themeMode === 'system' && styles.langOptionActive,
              ]}
              onPress={() => {
                toggleTheme('system');
                closeModal();
              }}>
              <Text
                style={[
                  styles.langOptionText,
                  themeMode === 'system' && styles.langOptionTextActive,
                ]}>
                System
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      <SearchBar value={query} onChangeText={setQuery} lang={lang} />

      <FilterBar
        activeLevel={activeLevel}
        onLevelChange={setActiveLevel}
        activeGender={activeGender}
        onGenderChange={setActiveGender}
        activeFinance={activeFinance}
        onFinanceChange={setActiveFinance}
        activeRegion={activeRegion}
        onRegionChange={setActiveRegion}
        sortAZ={sortAZ}
        onToggleSort={() => setSortAZ(prev => !prev)}
        lang={lang}
      />

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.accent} />
          <Text style={styles.loadingText}>{t(lang, 'findingSchools')}</Text>
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && (
        <CustomListView
          data={filtered}
          onSelectItem={school => navigation.navigate('Detail', {school})}
          isLoading={loading}
          showRecordCount
          emptyMessage={t(lang, 'noSchools')}
          lang={lang}
        />
      )}
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    safe: {flex: 1, backgroundColor: theme.background},
    header: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {fontSize: 28, fontWeight: '500', color: theme.textPrimary},
    subtitle: {fontSize: 14, color: theme.textSecondary, marginTop: 4},
    settingsBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.settingsBtn,
      justifyContent: 'center',
      alignItems: 'center',
    },
    settingsIcon: {fontSize: 22},
    cacheNoticeContainer: {
      marginTop: 8,
      backgroundColor: theme.warningBg,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    cacheNotice: {fontSize: 12, color: theme.warning, fontWeight: '500'},
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.modalOverlay,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCard: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 20,
      width: 260,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: {width: 0, height: 4},
      elevation: 8,
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.textPrimary,
      marginBottom: 16,
      textAlign: 'center',
    },
    langOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 10,
      marginBottom: 8,
      backgroundColor: theme.langOptionBg,
    },
    langOptionActive: {backgroundColor: theme.accent},
    langOptionText: {fontSize: 15, fontWeight: '500', color: theme.textPrimary},
    langOptionTextActive: {color: '#FFFFFF'},
    checkmark: {fontSize: 16, color: '#FFFFFF', fontWeight: '700'},
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    loadingText: {marginTop: 16, color: theme.textSecondary, fontSize: 16},
    errorIcon: {fontSize: 48, marginBottom: 12},
    errorText: {
      color: theme.error,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '500',
    },
  });

export default HomeScreen;
