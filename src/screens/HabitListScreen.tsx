import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Switch,
  Animated,
} from 'react-native';
import { Habit } from '../types';
import { getHabits, saveHabits } from '../services/storage';

type FilterType = 'All' | 'Today' | 'Completed';

const HabitListScreen = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [filter, setFilter] = useState<FilterType>('All');

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    const data = await getHabits();
    setHabits(data);
  };

  const toggleCompletion = async (id: string, isCompleted: boolean) => {
    const today = new Date().toDateString();
    const updated = habits.map((habit) => {
      if (habit.id === id) {
        const alreadyCompleted = habit.completedDates.includes(today);

        if (isCompleted && !alreadyCompleted) {
          // Add today's date if marking complete
          return { ...habit, completedDates: [...habit.completedDates, today] };
        } else if (!isCompleted && alreadyCompleted) {
          // Remove today's date if unmarking
          return {
            ...habit,
            completedDates: habit.completedDates.filter((d) => d !== today),
          };
        }
      }
      return habit;
    });

    setHabits(updated);
    await saveHabits(updated);
  };

  const filterHabits = (): Habit[] => {
    const today = new Date().toDateString();

    switch (filter) {
      case 'Today':
        // Show habits that are scheduled for today (Daily or Weekly),
        // you might want to add better logic for Weekly but for now keep simple
        return habits.filter(
          (habit) => habit.frequency === 'Daily' || habit.frequency === 'Weekly'
        );
      case 'Completed':
        return habits.filter((habit) => habit.completedDates.includes(today));
      case 'All':
      default:
        return habits;
    }
  };

  const renderHabit = ({ item }: { item: Habit }) => {
    const completedToday = item.completedDates.includes(new Date().toDateString());
    const scaleAnim = new Animated.Value(1);

    const handleToggle = (value: boolean) => {
      if (value) {
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      }
      toggleCompletion(item.id, value);
    };

    return (
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.habitName}>{item.name}</Text>
        <View style={styles.row}>
          <Text style={{ flex: 1 }}>
            Status: {completedToday ? '✅ Completed' : '❌ Not Completed'}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#0CA789' }}
            thumbColor={completedToday ? '#FFF' : '#f4f3f4'}
            value={completedToday}
            onValueChange={handleToggle}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filterRow}>
        {['All', 'Today', 'Completed'].map((f) => (
          <Text
            key={f}
            style={[styles.filterText, filter === f && styles.activeFilter]}
            onPress={() => setFilter(f as FilterType)}
          >
            {f}
          </Text>
        ))}
      </View>

      <FlatList
        data={filterHabits()}
        keyExtractor={(item) => item.id}
        renderItem={renderHabit}
        ListEmptyComponent={<Text style={styles.empty}>No habits to show.</Text>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default HabitListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDFDFD',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterText: {
    fontSize: 16,
    fontWeight: '600',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  activeFilter: {
    backgroundColor: '#0CA789',
    color: '#FFF',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 14,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#0CA789',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.15,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  listContent: {
    paddingBottom: 100,
  },
});
