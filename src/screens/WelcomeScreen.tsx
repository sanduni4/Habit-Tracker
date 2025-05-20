import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <ImageBackground
      source={require('../assets/welcome.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Title container */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to Habit Tracker!</Text>
        </View>

        {/* Buttons container */}
        <View style={styles.buttonsContainer}>
          <CustomButton title="Register" onPress={() => navigation.navigate('Register')} />
          <CustomButton title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  titleContainer: {
    flex: 0.35,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 0.3,
    justifyContent: 'center',
    
  },
});
