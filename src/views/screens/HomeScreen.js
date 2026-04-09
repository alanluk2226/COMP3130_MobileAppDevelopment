/**
 * View Screen: HomeScreen
 * Stateful/Class Component — demonstrates class component with state and Google Material Design
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CustomListView from '../components/CustomListView';
import { fetchSchools, filterSchools } from '../../controllers/SchoolController';
import { LanguageContext } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      loading: true,
      error: null,
      query: '',
      fromCache: false,
      activeLevel: 'All',
      sortAZ: false,
      activeGender: 'All',
      activeFinance: 'All',
      activeRegion: 'All',
      showLangModal: false,
    };
  }

  async componentDidMount() {
    try {
      const { schools, fromCache } = await fetchSchools();
      this.setState({ schools, fromCache, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  handleSearch = (query) => {
    this.setState({ query });
  };

  handleLevelChange = (activeLevel) => {
    this.setState({ activeLevel });
  };

  handleGenderChange = (activeGender) => {
    this.setState({ activeGender });
  };

  handleFinanceChange = (activeFinance) => {
    this.setState({ activeFinance });
  };

  handleRegionChange = (activeRegion) => {
    this.setState({ activeRegion });
  };

  handleToggleSort = () => {
    this.setState((prev) => ({ sortAZ: !prev.sortAZ }));
  };

  handleSelectSchool = (school) => {
    this.props.navigation.navigate('Detail', { school });
  };

  render() {
    const { schools, loading, error, query, fromCache, activeLevel, sortAZ, showLangModal, activeGender, activeFinance, activeRegion } = this.state;

    return (
      <LanguageContext.Consumer>
        {({ lang, toggleLang }) => {
          const filtered = filterSchools(schools, query, activeLevel, activeGender, activeFinance, activeRegion, sortAZ);
          return (
            <SafeAreaView style={styles.safe}>
              <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerRow}>
                  <View>
                    <Text style={styles.title}>{t(lang, 'appTitle')}</Text>
                    <Text style={styles.subtitle}>
                      {loading ? t(lang, 'loading') : t(lang, 'results')(filtered.length)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.settingsBtn}
                    onPress={() => this.setState({ showLangModal: true })}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.settingsIcon}>⚙️</Text>
                  </TouchableOpacity>
                </View>
                {fromCache && (
                  <View style={styles.cacheNoticeContainer}>
                    <Text style={styles.cacheNotice}>{t(lang, 'offlineMode')}</Text>
                  </View>
                )}
              </View>

              {/* Language Modal */}
              <Modal
                transparent
                visible={showLangModal}
                animationType="fade"
                onRequestClose={() => this.setState({ showLangModal: false })}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => this.setState({ showLangModal: false })}
                >
                  <View style={styles.modalCard}>
                    <Text style={styles.modalTitle}>{t(lang, 'settingsTitle')}</Text>
                    <TouchableOpacity
                      style={[styles.langOption, lang === 'en' && styles.langOptionActive]}
                      onPress={() => { toggleLang(); this.setState({ showLangModal: false }); }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.langOptionText, lang === 'en' && styles.langOptionTextActive]}>
                        English
                      </Text>
                      {lang === 'en' && <Text style={styles.checkmark}>✓</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.langOption, lang === 'zh' && styles.langOptionActive]}
                      onPress={() => { toggleLang(); this.setState({ showLangModal: false }); }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.langOptionText, lang === 'zh' && styles.langOptionTextActive]}>
                        繁體中文
                      </Text>
                      {lang === 'zh' && <Text style={styles.checkmark}>✓</Text>}
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>

              {/* Search Bar */}
              <SearchBar value={query} onChangeText={this.handleSearch} lang={lang} />

              {/* Filter Bar */}
              <FilterBar
                activeLevel={activeLevel}
                onLevelChange={this.handleLevelChange}
                activeGender={activeGender}
                onGenderChange={this.handleGenderChange}
                activeFinance={activeFinance}
                onFinanceChange={this.handleFinanceChange}
                activeRegion={activeRegion}
                onRegionChange={this.handleRegionChange}
                sortAZ={sortAZ}
                onToggleSort={this.handleToggleSort}
                lang={lang}
              />

              {/* Loading State */}
              {loading && (
                <View style={styles.center}>
                  <ActivityIndicator size="large" color="#1F2937" />
                  <Text style={styles.loadingText}>{t(lang, 'findingSchools')}</Text>
                </View>
              )}

              {/* Error State */}
              {error && (
                <View style={styles.center}>
                  <Text style={styles.errorIcon}>⚠️</Text>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* List */}
              {!loading && !error && (
                <CustomListView
                  data={filtered}
                  onSelectItem={this.handleSelectSchool}
                  isLoading={loading}
                  showRecordCount={true}
                  emptyMessage={t(lang, 'noSchools')}
                  lang={lang}
                />
              )}
            </SafeAreaView>
          );
        }}
      </LanguageContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { 
    fontSize: 28, 
    fontWeight: '500', 
    color: '#202124',
    letterSpacing: 0.25,
  },
  subtitle: { 
    fontSize: 14, 
    color: '#5F6368', 
    marginTop: 4,
    fontWeight: '400',
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 22,
  },
  cacheNoticeContainer: {
    marginTop: 8,
    backgroundColor: '#FEF7E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cacheNotice: { 
    fontSize: 12, 
    color: '#9C6C00',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: 260,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
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
    backgroundColor: '#F3F3F3',
  },
  langOptionActive: {
    backgroundColor: '#1F2937',
  },
  langOptionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#202124',
  },
  langOptionTextActive: {
    color: '#FFFFFF',
  },
  checkmark: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  center: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 20,
  },
  loadingText: { 
    marginTop: 16, 
    color: '#5F6368', 
    fontSize: 16,
    fontWeight: '400',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: { 
    color: '#D32F2F', 
    fontSize: 16, 
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
});

export default HomeScreen;
