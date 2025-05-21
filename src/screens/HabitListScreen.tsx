import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { getHabits, saveAllHabits } from '../services/storage';
import { Habit } from '../types';
import CustomButton from '../components/CustomButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const HabitListScreen = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [filter, setFilter] = useState<'all' | 'today' | 'completed'>('all');
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0); // To reset confetti
  const today = new Date().toDateString();

  const loadHabits = async () => {
    const data = await getHabits();
    setHabits(data);
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const toggleCompletion = async (habitId: string) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const completedDates = habit.completedDates || [];
        const hasCompletedToday = completedDates.includes(today);
        const updatedDates = hasCompletedToday
          ? completedDates.filter((date) => date !== today)
          : [...completedDates, today];

        // Show confetti only when marking as completed (not uncompleted)
        if (!hasCompletedToday) {
          setConfettiVisible(true);
          setConfettiKey((prev) => prev + 1); // reset confetti animation
        }

        return { ...habit, completedDates: updatedDates };
      }
      return habit;
    });

    setHabits(updatedHabits);
    await saveAllHabits(updatedHabits);
  };

  const filteredHabits = habits.filter((habit) => {
  const completedToday = habit.completedDates?.includes(today);
  if (filter === 'today') return true;       // Show ALL habits in "today" filter
  if (filter === 'completed') return completedToday;  // Show only completed habits
  return true;                               // Show all habits in "all" filter
});


  const renderHabit = ({ item }: { item: Habit }) => {
    const completedToday = item.completedDates?.includes(today);

    return (
      <View style={styles.habitCard}>
        <Text style={styles.habitName}>{item.name}</Text>
        <View style={styles.statusRow}>
          <Text style={styles.habitStatus}>
            {completedToday ? '✅ Completed' : '❌ Not Completed'}
          </Text>
          <Switch
            value={completedToday}
            onValueChange={() => toggleCompletion(item.id)}
            trackColor={{ false: '#ccc', true: '#0CA789' }}
            thumbColor={completedToday ? '#ffffff' : '#0CA789'}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter('all')}>
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilter]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('today')}>
          <Text style={[styles.filterText, filter === 'today' && styles.activeFilter]}>
            Today's Habits
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('completed')}>
          <Text style={[styles.filterText, filter === 'completed' && styles.activeFilter]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Habit List */}
      <FlatList
        data={filteredHabits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabit}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Confetti Animation */}
      {confettiVisible && (
        <ConfettiCannon
          key={confettiKey}
          count={250}
          origin={{ x: -5, y: 0 }}
          fadeOut={true}
          onAnimationEnd={() => setConfettiVisible(false)}
        />
      )}
    </View>
  );
};

export default HabitListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterText: {
    fontSize: 16,
    color: '#888',
    padding: 8,
  },
  activeFilter: {
    color: '#0CA789',
    borderBottomWidth: 2,
    borderBottomColor: '#0CA789',
    fontWeight: 'bold',
    padding: 8,
  },
  habitCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  habitName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  habitStatus: {
    fontSize: 16,
    marginRight: 12,
  },
});