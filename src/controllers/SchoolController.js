import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSchool } from '../models/School';
import { DISTRICT_REGION } from '../i18n/translations';

const API_URL =
  'https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.json';

const CACHE_KEY = 'cached_schools';
const CACHE_TIMESTAMP_KEY = 'cached_schools_timestamp';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const saveToCache = async (schools) => {
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(schools));
  await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now()));
};

const loadFromCache = async () => {
  const timestamp = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (!timestamp) return null;
  const age = Date.now() - parseInt(timestamp, 10);
  if (age > CACHE_TTL_MS) return null;
  const raw = await AsyncStorage.getItem(CACHE_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const fetchSchools = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const json = await response.json();

    const raw = Array.isArray(json) ? json : json.schools || json.data || [];
    const schools = raw.map(createSchool);

    await saveToCache(schools);
    return { schools, fromCache: false };
  } catch (error) {

    const cached = await loadFromCache();
    if (cached && cached.length > 0) {
      return { schools: cached, fromCache: true };
    }
    throw new Error('No internet connection and no cached data available.');
  }
};

export const filterSchools = (schools, query, level = 'All', gender = 'All', finance = 'All', region = 'All', sortAZ = false) => {
  let result = schools;

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (s) =>
        s.nameEn.toLowerCase().includes(q) ||
        s.nameCh.includes(query) ||
        s.district.toLowerCase().includes(q),
    );
  }

  if (level !== 'All') {
    result = result.filter((s) => s.level.toLowerCase().includes(level.toLowerCase()));
  }

  if (gender !== 'All') {
    result = result.filter((s) => s.gender.toLowerCase().includes(gender.toLowerCase()));
  }

  if (finance !== 'All') {
    result = result.filter((s) => s.financeType.toLowerCase().includes(finance.toLowerCase()));
  }

  if (region !== 'All') {
    result = result.filter((s) => {
      const key = (s.district || '').toUpperCase();
      return DISTRICT_REGION[key] === region;
    });
  }

  if (sortAZ) {
    result = [...result].sort((a, b) => a.nameEn.localeCompare(b.nameEn));
  }

  return result;
};

export const getDistricts = (schools) => {
  const set = new Set(schools.map((s) => s.district).filter(Boolean));
  return ['All', ...Array.from(set).sort()];
};
