import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { saveHabits } from '../services/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { Habit } from '../types';

type AddHabitScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddHabit'>;

const AddHabitScreen = () => {
  const navigation = useNavigation<AddHabitScreenNavigationProp>();

  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState<'Daily' | 'Weekly' | ''>('');

  const handleAddHabit = async () => {
    if (!habitName || !frequency) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: habitName,
      frequency,
      completedDates: [],
    };

    await saveHabits([newHabit]);

    Alert.alert('Success', 'Habit added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Habit</Text>

      <TextInput
        style={styles.input}
        placeholder="Habit Name"
        value={habitName}
        onChangeText={setHabitName}
      />

      <TextInput
        style={styles.input}
        placeholder="Frequency (Daily / Weekly)"
        value={frequency}
        onChangeText={(text) => {
          if (text === 'Daily' || text === 'Weekly' || text === '') {
            setFrequency(text);
          } else {
            Alert.alert('Invalid frequency', 'Please enter either "Daily" or "Weekly".');
          }
        }}
      />

      <Button title="Add Habit" onPress={handleAddHabit} />
    </View>
  );
};

export default AddHabitScreen;

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
