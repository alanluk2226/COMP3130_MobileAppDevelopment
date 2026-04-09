import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {t} from '../../i18n/translations';
import {useTheme} from '../../context/Theme';

const SearchBar = ({value, onChangeText, lang = 'en'}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <View style={styles.searchWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder={t(lang, 'search')}
            placeholderTextColor={theme.textSecondary}
            value={value}
            onChangeText={onChangeText}
            clearButtonMode="while-editing"
          />
        </View>
        <Text style={styles.helperText}>{t(lang, 'searchHelper')}</Text>
      </View>
    </View>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    formGroup: {gap: 6},
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderRadius: 28,
      paddingHorizontal: 14,
      paddingVertical: 0,
      borderWidth: 2,
      borderColor: theme.border,
      minHeight: 48,
    },
    searchIcon: {fontSize: 16, marginRight: 10, color: theme.textSecondary},
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.textPrimary,
      paddingVertical: 12,
    },
    helperText: {
      fontSize: 11,
      color: theme.textSecondary,
      fontWeight: '400',
      marginLeft: 4,
      letterSpacing: 0.2,
    },
  });

export default SearchBar;
