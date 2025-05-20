import React from 'react';
import { View, Text, StyleSheet, Alert,Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHomeButton from '../components/CustomHomeButton';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert('Logged Out', 'You have been logged out!');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

 return (

     <View style={styles.container}>
  <Text style={styles.title}>  Habit Tracker 😇</Text>
  <Text style={styles.subtitle}>Build good habits, break bad ones!</Text>

  <CustomHomeButton title="➕" onPress={() => navigation.navigate('AddHabit')} />
  <CustomHomeButton title="📋" onPress={() => navigation.navigate('HabitList')} />
  <CustomHomeButton title="📊" onPress={() => navigation.navigate('Progress')} />

  <View style={styles.footer}>
    <Button title="🚪 Logout" color="#E53935" onPress={handleLogout} />
  </View>
</View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    padding: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 50,
    color: '#333',
  },

  footer: {
    marginTop: 32,
  },
});