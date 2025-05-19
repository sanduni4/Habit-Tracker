import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert, ActivityIndicator } from 'react-native';
import { getHabits, saveHabits } from '../services/storage';
import { Habit } from '../types';

const HabitListScreen = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHabits = async () => {
    try {
      const storedHabits = await getHabits();
      setHabits(storedHabits);
    } catch (error) {
      console.error('Error loading habits:', error);
      Alert.alert('Error', 'Failed to load habits.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const handleCompleteHabit = async (id: string) => {
    const today = new Date().toDateString();

    const updatedHabits = habits.map(habit => {
      if (habit.id === id) {
        if (habit.completedDates.includes(today)) {
          Alert.alert('Already marked as completed for today!');
          return habit;
        }
        return {
          ...habit,
          completedDates: [...habit.completedDates, today],
        };
      }
      return habit;
    });

    setHabits(updatedHabits);
    await saveHabits(updatedHabits);
  };

  const renderHabitItem = ({ item }: { item: Habit }) => {
    const today = new Date().toDateString();
    const isCompleted = item.completedDates.includes(today);

    return (
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>Status: {isCompleted ? '✅ Completed' : '❌ Not Completed'}</Text>
        <Button
          title="Mark as Complete"
          onPress={() => handleCompleteHabit(item.id)}
          disabled={isCompleted}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="teal" />
        <Text style={{ marginTop: 16 }}>Loading habits...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Habits</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabitItem}
        ListEmptyComponent={<Text>No habits yet. Add some!</Text>}
      />
    </View>
  );
};

export default HabitListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
});
