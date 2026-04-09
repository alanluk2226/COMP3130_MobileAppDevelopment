import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useLanguage} from '../../context/LanguageContext';
import {useTheme} from '../../context/Theme';

const SchoolCard = ({school, onPress}) => {
  const {lang} = useLanguage();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const name = lang === 'zh' ? school.nameCh : school.nameEn;
  const subName = lang === 'zh' ? school.nameEn : school.nameCh;
  const district = lang === 'zh' ? school.districtCh : school.district;
  const level = lang === 'zh' ? school.levelCh : school.level;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(school)}
      activeOpacity={0.7}>
      <View style={styles.contentWrapper}>
        <View style={styles.textContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          <Text style={styles.chinese} numberOfLines={1}>
            {subName}
          </Text>
        </View>
        <View style={styles.tagsContainer}>
          <Text style={styles.tag}>{district}</Text>
          <Text style={[styles.tag, styles.tagSecondary]}>{level}</Text>
        </View>
      </View>
      <View style={styles.rightArrow}>
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      marginHorizontal: 12,
      marginVertical: 8,
      paddingHorizontal: 16,
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme.border,
      elevation: 1,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 2,
      shadowOffset: {width: 0, height: 1},
    },
    contentWrapper: {flex: 1, marginRight: 8},
    textContainer: {marginBottom: 8},
    name: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.textPrimary,
      lineHeight: 24,
    },
    chinese: {fontSize: 14, color: theme.textSecondary, marginTop: 4},
    tagsContainer: {flexDirection: 'row', gap: 6, flexWrap: 'wrap'},
    tag: {
      backgroundColor: theme.surface,
      color: theme.textPrimary,
      fontSize: 12,
      fontWeight: '500',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 16,
    },
    tagSecondary: {backgroundColor: theme.surface, color: theme.textSecondary},
    rightArrow: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 4,
    },
    arrowIcon: {fontSize: 24, color: theme.textSecondary, fontWeight: '300'},
  });

export default SchoolCard;
