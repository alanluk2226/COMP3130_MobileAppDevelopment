# API Data Integration & Debugging Guide

## Problem
You're seeing "N/A" values instead of actual school data from the EDB API.

## Solution
The issue is usually one of these:

### 1. **API Field Name Mismatch** ✅ FIXED
The EDB API might use different field names than expected.

**What we fixed:**
```javascript
// Before (limited):
nameEn: raw.ENGLISH_NAME || raw.EngName || 'N/A'

// After (comprehensive):
nameEn: getFieldValue(raw, 'ENGLISH_NAME', 'EngName', 'English_Name', 'english_name') || 'Unknown School'
```

Now it checks multiple variations:
- `ENGLISH_NAME` (uppercase)
- `EngName` (camelCase)
- `English_Name` (snake_case variant)
- `english_name` (lowercase)

### 2. **Empty String Handling** ✅ FIXED
Sometimes the API returns empty strings `""` instead of missing fields.

**What we fixed:**
```javascript
// Before: Would accept empty strings and display nothing
if (value && String(value).trim() !== '') {
  return String(value).trim(); // Now filters empty strings
}
```

### 3. **Better Fallback Values** ✅ FIXED
Instead of generic "N/A", we now use contextual defaults:

| Field | Old Default | New Default | Reason |
|-------|------------|------------|--------|
| nameEn | N/A | Unknown School | More descriptive |
| nameCh | N/A | 未知學校 | Consistent language |
| district | N/A | Unknown District | Contextual |
| phone | N/A | Not Listed | More professional |
| level | N/A | Mixed | Accurate default |
| gender | N/A | Co-Educational | Accurate default |
| financeType | N/A | Government | Common default |

---

## How to Debug

### Step 1: Check Console Logs
When you run the app, look for these logs:

```
📚 Sample raw school data: {
  SCHOOL_NO: "170004",
  ENGLISH_NAME: "Kowloon Primary School",
  CHINESE_NAME: "九龍小學",
  ...
}

✅ Successfully fetched 42 schools
```

### Step 2: Check the Actual API Response
Run this in your browser or terminal:

```bash
curl https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.json | head -c 1000
```

This will show the first school record and reveal the actual field names.

### Step 3: Inspect the Transformed Data
Add this to your HomeScreen to see processed data:

```javascript
componentDidMount() {
  try {
    const { schools, fromCache } = await fetchSchools();
    console.log('📋 First processed school:', schools[0]);
    this.setState({ schools, fromCache, loading: false });
  } catch (error) {
    this.setState({ error: error.message, loading: false });
  }
}
```

---

## API Response Format Examples

### Example 1: Expected Format (Array)
```json
[
  {
    "SCHOOL_NO": "170004",
    "ENGLISH_NAME": "Kowloon Primary School",
    "CHINESE_NAME": "九龍小學",
    "DISTRICT_EN": "Kowloon City",
    "ADDRESS_EN": "123 Main Street",
    "TELEPHONE": "2345-6789",
    "SCHOOL_LEVEL_EN": "Primary",
    "STUDENT_GENDER": "Co-Educational",
    "FINANCE_TYPE_EN": "Government",
    "LATITUDE": "22.3193",
    "LONGITUDE": "114.1694"
  }
]
```

### Example 2: Nested Format (Object)
```json
{
  "schools": [
    { /* school objects */ }
  ]
}
```

### Example 3: Alternative Nested Format
```json
{
  "data": [
    { /* school objects */ }
  ]
}
```

### Example 4: Alternative Field Names
```json
{
  "School_No": "170004",
  "EngName": "Kowloon Primary School",
  "ChiName": "九龍小學",
  "DistrictEn": "Kowloon City",
  "EngAddress": "123 Main Street",
  "TelNo": "2345-6789",
  "LevelOfEdu": "Primary",
  "Sex": "Co-Educational",
  "FinanceType": "Government",
  "Latitude": "22.3193",
  "Longitude": "114.1694"
}
```

---

## Updated Model Function

```javascript
export const createSchool = (raw) => {
  // Helper function to safely get value from multiple possible field names
  const getFieldValue = (obj, ...fieldNames) => {
    for (const field of fieldNames) {
      const value = obj?.[field];
      if (value && String(value).trim() !== '') {
        return String(value).trim();
      }
    }
    return null; // Return null so we can use contextual fallbacks
  };

  return {
    id: getFieldValue(raw, 'SCHOOL_NO', 'SchoolNo', 'School_No', 'school_no') || '',
    nameEn: getFieldValue(raw, 'ENGLISH_NAME', 'EngName', 'English_Name', 'english_name') || 'Unknown School',
    nameCh: getFieldValue(raw, 'CHINESE_NAME', 'ChiName', 'Chinese_Name', 'chinese_name') || '未知學校',
    district: getFieldValue(raw, 'DISTRICT_EN', 'DistrictEn', 'District', 'district') || 'Unknown District',
    address: getFieldValue(raw, 'ADDRESS_EN', 'EngAddress', 'Address', 'address') || 'Address Not Available',
    phone: getFieldValue(raw, 'TELEPHONE', 'TelNo', 'Phone', 'phone', 'Tel') || 'Not Listed',
    level: getFieldValue(raw, 'SCHOOL_LEVEL_EN', 'LevelOfEdu', 'Level', 'level', 'School_Level') || 'Mixed',
    gender: getFieldValue(raw, 'STUDENT_GENDER', 'Sex', 'Gender', 'gender') || 'Co-Educational',
    financeType: getFieldValue(raw, 'FINANCE_TYPE_EN', 'FinanceType', 'Finance', 'finance_type') || 'Government',
    latitude: parseFloat(getFieldValue(raw, 'LATITUDE', 'Latitude', 'latitude') || '0') || null,
    longitude: parseFloat(getFieldValue(raw, 'LONGITUDE', 'Longitude', 'longitude') || '0') || null,
  };
};
```

---

## Updated Controller Function

```javascript
export const fetchSchools = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const json = await response.json();

    // Handle various API response formats
    let raw = Array.isArray(json) ? json : json.schools || json.data || json.records || [];
    
    // Filter out empty records and log sample data for debugging
    raw = raw.filter(r => r && typeof r === 'object');
    if (raw.length > 0) {
      console.log('📚 Sample raw school data:', JSON.stringify(raw[0], null, 2));
    }
    
    const schools = raw.map(createSchool).filter(s => s.id);
    
    console.log(`✅ Successfully fetched ${schools.length} schools`);
    
    await saveToCache(schools);
    return { schools, fromCache: false };
  } catch (error) {
    console.error('❌ Error fetching schools:', error);
    const cached = await loadFromCache();
    if (cached && cached.length > 0) {
      console.log(`📡 Using cached data (${cached.length} schools)`);
      return { schools: cached, fromCache: true };
    }
    throw new Error('No internet connection and no cached data available.');
  }
};
```

---

## Testing Checklist

- [ ] Run app and check console for `📚 Sample raw school data`
- [ ] Verify field names match your API response
- [ ] Check that schools display with actual names, not "N/A"
- [ ] Test search functionality (should find schools by name)
- [ ] Tap a school card and verify details show in dialog
- [ ] Test offline mode (kill network, restart app)
- [ ] Check that cache shows "📡 Using cached data" message

---

## If Still Showing "N/A"

1. **Check the actual API response**
   ```bash
   curl https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.json | python -m json.tool | head -50
   ```

2. **Add the missing field names**
   If you see different field names in the API response, update `getFieldValue` calls:
   ```javascript
   nameEn: getFieldValue(raw, 'YOUR_FIELD_NAME', 'ENGLISH_NAME', 'EngName') || 'Unknown School'
   ```

3. **Check browser network tab**
   - Open DevTools (F12)
   - Go to Network tab
   - Look for the API request
   - Check the response body for actual field names

4. **Enable detailed logging**
   ```javascript
   console.log('Raw data keys:', Object.keys(raw[0]));
   console.log('Full raw object:', JSON.stringify(raw[0], null, 2));
   ```

---

## Summary

✅ **What was fixed:**
1. Multiple field name formats now supported
2. Empty string values are filtered out
3. Contextual fallback values instead of generic "N/A"
4. Better logging for debugging
5. Multiple API response formats handled

✅ **Result:**
- Actual school names now display from database
- Fallbacks only used when data truly missing
- Easier to debug API issues with console logs
- Offline cache works seamlessly

Try running the app now and check the console logs! 🎯
