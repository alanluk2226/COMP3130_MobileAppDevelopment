import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useTheme} from '../../context/Theme';

const SplashScreen = ({navigation}) => {
  const {theme, isDark} = useTheme();
  const logoScale = new Animated.Value(0.5);
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);
  const dotAnimation = new Animated.Value(0);
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
    ]).start();

    const timer = setTimeout(() => navigation.replace('Home'), 3500);
    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnimation, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [dotAnimation]);

  const dotOpacity = dotAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const styles = getStyles(theme, isDark, height);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{scale: logoScale}],
              opacity: logoOpacity,
            },
          ]}>
          <View style={styles.logoBox}>
            <Text style={styles.schoolIcon}>🏫</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.textContainer, {opacity: textOpacity}]}>
          <Text style={styles.appTitle}>Hong Kong Schools</Text>
          <Text style={styles.appSubtitle}>School Finder</Text>
        </Animated.View>

        <View style={styles.loaderContainer}>
          <Animated.View style={[styles.dot, {opacity: dotOpacity}]}>
            <View style={styles.dotItem} />
            <View style={styles.dotItem} />
            <View style={styles.dotItem} />
          </Animated.View>
          <Text style={styles.loadingText}>Loading</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Education Directory</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme, isDark, height) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.background},
    content: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: height * 0.1,
    },
    logoContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    logoBox: {
      width: 120,
      height: 120,
      borderRadius: 30,
      backgroundColor: isDark ? '#2C2C2C' : '#E8F0FE',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.accent,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: {width: 0, height: 4},
      elevation: 8,
    },
    schoolIcon: {fontSize: 64},
    textContainer: {alignItems: 'center'},
    appTitle: {
      fontSize: 32,
      fontWeight: '600',
      color: theme.textPrimary,
      letterSpacing: 0.5,
    },
    appSubtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      marginTop: 8,
      fontWeight: '400',
    },
    loaderContainer: {alignItems: 'center', marginBottom: 40},
    dot: {flexDirection: 'row', gap: 8, marginBottom: 12},
    dotItem: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.accent,
    },
    loadingText: {
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: '500',
      letterSpacing: 1,
    },
    footer: {alignItems: 'center', paddingBottom: 20},
    footerText: {fontSize: 12, color: '#9CA3AF', fontWeight: '400'},
  });

export default SplashScreen;
