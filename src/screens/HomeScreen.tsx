import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <Text style={styles.title}>Welcome to Habit Tracker 🌱</Text>

      <View style={styles.buttonGroup}>
        <Button title="Add New Habit" onPress={() => navigation.navigate('AddHabit')} />
        <Button title="View Habit List" onPress={() => navigation.navigate('HabitList')} />
        <Button title="View Progress" onPress={() => navigation.navigate('Progress')} />
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonGroup: {
    gap: 16,
  },
});
