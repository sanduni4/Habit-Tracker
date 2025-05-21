import React from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHomeButton from '../components/CustomHomeButton';
import CalendarScreen from './Calender';


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
      <Text style={styles.title}>Habit Tracker 😇</Text>
      <Text style={styles.subtitle}>Build good habits, break bad ones!</Text>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        <CustomHomeButton title="➕" onPress={() => navigation.navigate('AddHabit')} />
        <CustomHomeButton title="📋" onPress={() => navigation.navigate('HabitList')} />
        <CustomHomeButton title="📊" onPress={() => navigation.navigate('Progress')} />
        <CustomHomeButton title="📅" onPress={() => navigation.navigate('Calendar')} />  {/* New calendar button */}
      </View>

      <View style={styles.footer}>
        <Button title="🚪 Logout" color="#E53935" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0CA789',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 50,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20, 
  },
  footer: {
    marginTop: 32,
  },
}); 