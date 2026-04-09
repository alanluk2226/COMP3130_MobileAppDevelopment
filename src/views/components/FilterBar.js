import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { t } from '../../i18n/translations';

const ALL_OPTIONS = (lang) => [
  { label: t(lang, 'filterAll'), value: 'All', type: 'all' },
  { type: 'header', label: t(lang, 'filterLevelLabel') },
  { label: t(lang, 'filterKindergarten'), value: 'Kindergarten', type: 'level' },
  { label: t(lang, 'filterPrimary'), value: 'Primary', type: 'level' },
  { label: t(lang, 'filterSecondary'), value: 'Secondary', type: 'level' },
  { type: 'header', label: t(lang, 'filterGenderLabel') },
  { label: t(lang, 'filterCoEd'), value: 'CO-ED', type: 'gender' },
  { label: t(lang, 'filterBoys'), value: 'BOYS', type: 'gender' },
  { label: t(lang, 'filterGirls'), value: 'GIRLS', type: 'gender' },
  { type: 'header', label: t(lang, 'filterFinanceLabel') },
  { label: t(lang, 'filterGovernment'), value: 'GOVERNMENT', type: 'finance' },
  { label: t(lang, 'filterAided'), value: 'AIDED', type: 'finance' },
  { label: t(lang, 'filterPrivate'), value: 'PRIVATE', type: 'finance' },
  { label: t(lang, 'filterDSS'), value: 'DIRECT SUBSIDY SCHEME', type: 'finance' },
  { type: 'header', label: t(lang, 'filterRegionLabel') },
  { label: t(lang, 'filterHKIsland'), value: 'HK_ISLAND', type: 'region' },
  { label: t(lang, 'filterKowloon'), value: 'KOWLOON', type: 'region' },
  { label: t(lang, 'filterNewTerritories'), value: 'NEW_TERRITORIES', type: 'region' },
];

const FilterBar = ({
  activeLevel, onLevelChange,
  activeGender, onGenderChange,
  activeFinance, onFinanceChange,
  activeRegion, onRegionChange,
  sortAZ, onToggleSort,
  lang = 'en',
}) => {
  const [open, setOpen] = useState(false);
  const options = ALL_OPTIONS(lang);

  const getSelected = (o) => {
    if (o.type === 'all') return activeLevel === 'All' && activeGender === 'All' && activeFinance === 'All' && activeRegion === 'All';
    if (o.type === 'level') return activeLevel === o.value;
    if (o.type === 'gender') return activeGender === o.value;
    if (o.type === 'finance') return activeFinance === o.value;
    if (o.type === 'region') return activeRegion === o.value;
    return false;
  };

  const handleSelect = (o) => {
    if (o.type === 'all') {
      onLevelChange('All'); onGenderChange('All'); onFinanceChange('All'); onRegionChange('All');
    } else if (o.type === 'level') {
      onLevelChange(o.value === activeLevel ? 'All' : o.value);
    } else if (o.type === 'gender') {
      onGenderChange(o.value === activeGender ? 'All' : o.value);
    } else if (o.type === 'finance') {
      onFinanceChange(o.value === activeFinance ? 'All' : o.value);
    } else if (o.type === 'region') {
      onRegionChange(o.value === activeRegion ? 'All' : o.value);
    }
  };

  const activeCount = [activeLevel !== 'All', activeGender !== 'All', activeFinance !== 'All', activeRegion !== 'All', sortAZ].filter(Boolean).length;
  const activeLabels = options.filter(o => o.type !== 'all' && o.type !== 'header' && getSelected(o)).map(o => o.label);
  if (sortAZ) activeLabels.push(t(lang, 'sortAZ'));

  return (
    <View style={styles.bar}>
      <TouchableOpacity
        style={[styles.iconBtn, activeCount > 0 && styles.iconBtnActive]}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <View style={styles.lines}>
          <View style={[styles.line, activeCount > 0 && styles.lineWhite]} />
          <View style={[styles.line, styles.lineMid, activeCount > 0 && styles.lineWhite]} />
          <View style={[styles.line, activeCount > 0 && styles.lineWhite]} />
        </View>
        {activeCount > 0 && (
          <View style={styles.badge}><Text style={styles.badgeText}>{activeCount}</Text></View>
        )}
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
        {activeLabels.length === 0 && <Text style={styles.allText}>{t(lang, 'filterAll')}</Text>}
        {activeLabels.map((label) => (
          <View key={label} style={styles.pill}>
            <Text style={styles.pillText}>{label}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal transparent visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>Filter</Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.optionList}>
              {options.map((o, i) => {
                if (o.type === 'header') {
                  return (
                    <View key={`header-${i}`} style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderText}>{o.label}</Text>
                      <View style={styles.sectionLine} />
                    </View>
                  );
                }
                const selected = getSelected(o);
                return (
                  <TouchableOpacity
                    key={o.value}
                    style={[styles.option, selected && styles.optionSelected]}
                    onPress={() => handleSelect(o)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{o.label}</Text>
                    {selected && <Text style={styles.check}>checkmark</Text>}
                  </TouchableOpacity>
                );
              })}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{t(lang, 'sortAZ')}</Text>
                <View style={styles.sectionLine} />
              </View>
              <TouchableOpacity
                style={[styles.option, sortAZ && styles.optionSelected]}
                onPress={onToggleSort}
                activeOpacity={0.7}
              >
                <Text style={[styles.optionText, sortAZ && styles.optionTextSelected]}>{t(lang, 'sortAZ')}</Text>
                {sortAZ && <Text style={styles.check}>checkmark</Text>}
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.doneBtn} onPress={() => setOpen(false)} activeOpacity={0.8}>
              <Text style={styles.doneBtnText}>{t(lang, 'done')}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E8E8E8', gap: 10 },
  iconBtn: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#F3F3F3', borderWidth: 1.5, borderColor: '#E8E8E8', justifyContent: 'center', alignItems: 'center' },
  iconBtnActive: { backgroundColor: '#1F2937', borderColor: '#1F2937' },
  lines: { gap: 4, alignItems: 'center' },
  line: { width: 18, height: 2, borderRadius: 2, backgroundColor: '#5F6368' },
  lineMid: { width: 12 },
  lineWhite: { backgroundColor: '#FFFFFF' },
  badge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#4285F4', borderRadius: 8, minWidth: 16, height: 16, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 3 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  pills: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  allText: { fontSize: 13, color: '#9CA3AF', fontWeight: '400' },
  pill: { backgroundColor: '#E8F0FE', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 4 },
  pillText: { fontSize: 12, color: '#1F2937', fontWeight: '500' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32, maxHeight: '70%' },
  handle: { width: 40, height: 4, backgroundColor: '#E8E8E8', borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: 17, fontWeight: '600', color: '#202124', marginBottom: 12 },
  optionList: { paddingBottom: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 4, paddingHorizontal: 4 },
  sectionHeaderText: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginRight: 8 },
  sectionLine: { flex: 1, height: 1, backgroundColor: '#E8E8E8' },
  option: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderRadius: 10, marginBottom: 4 },
  optionSelected: { backgroundColor: '#1F2937' },
  optionText: { fontSize: 15, color: '#202124', fontWeight: '400' },
  optionTextSelected: { color: '#FFFFFF', fontWeight: '600' },
  check: { fontSize: 15, color: '#FFFFFF', fontWeight: '700' },
  doneBtn: { marginTop: 8, backgroundColor: '#1F2937', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  doneBtnText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

export default FilterBar;
