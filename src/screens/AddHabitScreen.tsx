import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { saveAllHabits } from '../services/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { Habit } from '../types';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { addHabit } from '../services/storage';


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

await addHabit(newHabit);



    Alert.alert('Success', 'Habit added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Habit</Text>

      <CustomInput
        placeholder="Habit Name"
        value={habitName}
        onChangeText={setHabitName}
      />

      <Text style={styles.label}>Frequency</Text>

      <View style={styles.frequencyContainer}>
        <TouchableOpacity
          style={[
            styles.frequencyButton,
            frequency === 'Daily' && styles.frequencyButtonSelected,
          ]}
          onPress={() => setFrequency('Daily')}
        >
          <Text
            style={[
              styles.frequencyText,
              frequency === 'Daily' && styles.frequencyTextSelected,
            ]}
          >
            Daily
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.frequencyButton,
            frequency === 'Weekly' && styles.frequencyButtonSelected,
          ]}
          onPress={() => setFrequency('Weekly')}
        >
          <Text
            style={[
              styles.frequencyText,
              frequency === 'Weekly' && styles.frequencyTextSelected,
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
      </View>

      <CustomButton title="Add Habit" onPress={handleAddHabit} />
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
    marginBottom: 35,
  },

  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  frequencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  frequencyButton: {
    borderWidth: 1,
    borderColor: '#0CA789',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  frequencyButtonSelected: {
    backgroundColor: '#0CA789',
  },
  frequencyText: {
    color: '#0CA789',
    fontSize: 16,
    fontWeight: '600',
  },
  frequencyTextSelected: {
    color: '#FFF',
  },
});
