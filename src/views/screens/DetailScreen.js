import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../context/Theme';
import InfoDialog from '../components/InfoDialog';

const DetailScreen = ({route, navigation}) => {
  const {school} = route.params;
  const {theme} = useTheme();
  const [dialogVisible, setDialogVisible] = useState(true);
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
      <InfoDialog
        visible={dialogVisible}
        school={school}
        onClose={() => {
          setDialogVisible(false);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    safe: {flex: 1, backgroundColor: theme.surface},
    container: {padding: 12, paddingBottom: 12},
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.settingsBtn,
    },
    backText: {fontSize: 14, color: theme.textPrimary, fontWeight: '500'},
  });

export default DetailScreen;
