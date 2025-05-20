import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getHabits } from '../services/storage';

const ProgressScreen = () => {
  // State variables to track progress
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalHabits, setTotalHabits] = useState(0);

  useEffect(() => {
    /**
     * Asynchronously calculates progress by fetching habits,
     * counting completed ones for today, and updating state.
     */
    const calculateProgress = async () => {
      try {
        const habits = await getHabits();
        const today = new Date().toDateString();

        // Total number of habits
        const total = habits.length;
        
        // Count habits completed today
        const completed = habits.filter(habit =>
          habit.completedDates.includes(today)
        ).length;

        // Calculate completion percentage
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Update state with calculated values
        setTotalHabits(total);
        setCompletedCount(completed);
        setCompletionPercentage(percentage);
      } catch (error) {
        console.error('Failed to load habits:', error);
        Alert.alert('Error', 'Could not load habits data.');
      }
    };

    calculateProgress();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Progress 📊</Text>
      <Text style={styles.text}>
        Habits Completed: {completedCount} / {totalHabits}
      </Text>
      <Text style={styles.percent}>{completionPercentage}%</Text>
    </View>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 16,
  },
  percent: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'teal',
  },
});
