/**
 * View Screen: HomeScreen
 * Stateful/Class Component — demonstrates class component with state
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
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <Text style={styles.title}>HK Schools</Text>
          <Text style={styles.subtitle}>
            {loading ? 'Loading...' : `${filtered.length} schools found`}
          </Text>
          {fromCache && (
            <Text style={styles.cacheNotice}>⚠️ Showing cached data (offline)</Text>
          )}
        </View>

        <SearchBar value={query} onChangeText={this.handleSearch} />

        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#1967d2" />
            <Text style={styles.loadingText}>Fetching school data...</Text>
          </View>
        )}

        {error && (
          <View style={styles.center}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        )}

        {!loading && !error && (
          <FlatList
            data={filtered}
            keyExtractor={(item, index) => item.id || String(index)}
            renderItem={({ item }) => (
              <SchoolCard school={item} onPress={this.handleSelectSchool} />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 24, fontWeight: '700', color: '#1a1a2e' },
  subtitle: { fontSize: 13, color: '#888', marginTop: 2, marginBottom: 8 },
  cacheNotice: { fontSize: 11, color: '#e65100', marginBottom: 6 },
  list: { paddingBottom: 20 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  loadingText: { marginTop: 12, color: '#666', fontSize: 14 },
  errorText: { color: '#d32f2f', fontSize: 14, textAlign: 'center' },
});

export default HomeScreen;
