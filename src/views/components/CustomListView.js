import React from 'react';
import {View, FlatList, Text, StyleSheet, SafeAreaView} from 'react-native';
import SchoolCard from './SchoolCard';
import {useLanguage} from '../../context/LanguageContext';
import {useTheme} from '../../context/Theme';
import {t} from '../../i18n/translations';

const CustomListView = ({
  data,
  onSelectItem,
  isLoading,
  showRecordCount = true,
  emptyMessage = 'No records found',
}) => {
  const {lang} = useLanguage();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const renderHeader = () => {
    if (!showRecordCount || data.length === 0) return null;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.recordCountBox}>
          <Text style={styles.recordCountLabel}>{t(lang, 'totalRecords')}</Text>
          <Text style={styles.recordCount}>{data.length}</Text>
          <Text style={styles.recordText}>
            {t(lang, 'results')(data.length)}
          </Text>
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
        renderItem={({item}) => (
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

const getStyles = theme =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.background},
    headerContainer: {
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    recordCountBox: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderLeftWidth: 4,
      borderLeftColor: theme.accent,
      alignItems: 'center',
    },
    recordCountLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.textSecondary,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    recordCount: {
      fontSize: 32,
      fontWeight: '700',
      color: theme.textPrimary,
      marginVertical: 4,
    },
    recordText: {
      fontSize: 13,
      fontWeight: '400',
      color: theme.textSecondary,
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
      color: theme.textPrimary,
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
    },
  });

export default CustomListView;
