import React, { useState, useEffect } from 'react'; // Added hooks
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function App() {
  // 1. Define state to store your data
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);

  const schoolAPI = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.json";

  // 2. The Fetch Function
  async function fetchData() {
    try {
      const response = await fetch(schoolAPI);
      if (!response.ok) {
        throw new Error("Could not fetch");
      }
      const data = await response.json();
      console.log("Total schools:", data.length);
      console.log("First school:", data[0]);
      setSchoolData(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // 3. Run the fetch when the app mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Fetching Test</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>
          {/* Example: Displaying a specific field or length from the data */}
          Data Loaded! Check console for full object.
        </Text>
      )}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});