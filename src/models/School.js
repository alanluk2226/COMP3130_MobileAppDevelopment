/**
 * Model: School
 * Represents a single school record from the EDB API
 */
export const createSchool = (raw) => ({
  id: raw.SCHOOL_NO || raw.SchoolNo || '',
  nameEn: raw.ENGLISH_NAME || raw.EngName || 'N/A',
  nameCh: raw.CHINESE_NAME || raw.ChiName || 'N/A',
  district: raw.DISTRICT_EN || raw.DistrictEn || 'N/A',
  address: raw.ADDRESS_EN || raw.EngAddress || 'N/A',
  phone: raw.TELEPHONE || raw.TelNo || 'N/A',
  level: raw.SCHOOL_LEVEL_EN || raw.LevelOfEdu || 'N/A',
  gender: raw.STUDENT_GENDER || raw.Sex || 'N/A',
  financeType: raw.FINANCE_TYPE_EN || raw.FinanceType || 'N/A',
  latitude: parseFloat(raw.LATITUDE || raw.Latitude) || null,
  longitude: parseFloat(raw.LONGITUDE || raw.Longitude) || null,
});
