import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'bookmarked_schools';

export const getBookmarks = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
};

export const saveBookmarks = async bookmarkedIds => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarkedIds));
  } catch (e) {}
};

export const toggleBookmark = async (schoolId, currentBookmarks) => {
  const newBookmarks = currentBookmarks.includes(schoolId)
    ? currentBookmarks.filter(id => id !== schoolId)
    : [...currentBookmarks, schoolId];
  await saveBookmarks(newBookmarks);
  return newBookmarks;
};
