/**
 * View Component: CustomListView
 * Enhanced ListView with record count display and HTML/CSS-inspired styling
 */
import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import SchoolCard from './SchoolCard';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const CustomListView = ({
  data,
  onSelectItem,
  isLoading,
  showRecordCount = true,
  emptyMessage = 'No records found',
}) => {
  const { lang } = useLanguage();

  const renderHeader = () => {
    if (!showRecordCount || data.length === 0) return null;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.recordCountBox}>
          <Text style={styles.recordCountLabel}>{t(lang, 'totalRecords')}</Text>
          <Text style={styles.recordCount}>{data.length}</Text>
          <Text style={styles.recordText}>{t(lang, 'results')(data.length)}</Text>
        </View>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={styles.emptyMessage}>{emptyMessage}</Text>
      <Text style={styles.emptySubtext}>{t(lang, 'adjustSearch')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id || String(index)}
        renderItem={({ item }) => (
          <SchoolCard school={item} onPress={onSelectItem} />
        )}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.listContent,
          data.length === 0 && styles.emptyListContent,
        ]}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  recordCountBox: {
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1F2937',
    alignItems: 'center',
  },
  recordCountLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#5F6368',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  recordCount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginVertical: 4,
  },
  recordText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#5F6368',
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 4,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#5F6368',
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default CustomListView;
