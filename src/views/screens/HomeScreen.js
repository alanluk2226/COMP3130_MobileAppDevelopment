/**
 * View Screen: HomeScreen
 * Stateful/Class Component — demonstrates class component with state and Google Material Design
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import SchoolCard from '../components/SchoolCard';
import SearchBar from '../components/SearchBar';
import { fetchSchools, filterSchools } from '../../controllers/SchoolController';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      loading: true,
      error: null,
      query: '',
      fromCache: false,
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

  handleSelectSchool = (school) => {
    this.props.navigation.navigate('Detail', { school });
  };

  render() {
    const { schools, loading, error, query, fromCache } = this.state;
    const filtered = filterSchools(schools, query);

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Hong Kong Schools</Text>
          <Text style={styles.subtitle}>
            {loading ? 'Loading...' : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
          </Text>
          {fromCache && (
            <View style={styles.cacheNoticeContainer}>
              <Text style={styles.cacheNotice}>📡 Offline mode - showing cached data</Text>
            </View>
          )}
        </View>

        {/* Search Bar */}
        <SearchBar value={query} onChangeText={this.handleSearch} />

        {/* Loading State */}
        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#1F2937" />
            <Text style={styles.loadingText}>Finding schools...</Text>
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
          <FlatList
            data={filtered}
            keyExtractor={(item, index) => item.id || String(index)}
            renderItem={({ item }) => (
              <SchoolCard school={item} onPress={this.handleSelectSchool} />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyText}>No schools found</Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
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
  list: { 
    paddingBottom: 20,
    paddingTop: 4,
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#5F6368',
    fontWeight: '500',
  },
});

export default HomeScreen;
