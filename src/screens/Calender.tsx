import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Habit } from '../types';
import { getHabits } from '../services/storage';

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});
  const [habitsForSelectedDate, setHabitsForSelectedDate] = useState<Habit[]>([]);

  useEffect(() => {
    loadCalendarData(selectedDate);
  }, []);

  const loadCalendarData = async (dateString: string) => {
    try {
      const habits = await getHabits();
      const markings: { [date: string]: any } = {};

      // Collect completed dates
      habits.forEach(habit => {
        habit.completedDates?.forEach(date => {
          markings[date] = {
            ...markings[date],
            marked: true,
            dotColor: '#4CAF50',
          };
        });
      });

      // Mark selected date
      markings[dateString] = {
        ...markings[dateString],
        selected: true,
        selectedColor: '#81C784',
      };

      setMarkedDates(markings);
      filterHabitsByDate(habits, dateString);
    } catch (error) {
      console.error('Error loading calendar data:', error);
    }
  };

  const onDayPress = async (day: { dateString: string }) => {
    const newSelectedDate = day.dateString;
    setSelectedDate(newSelectedDate);
    await loadCalendarData(newSelectedDate);
  };

  const filterHabitsByDate = (habits: Habit[], dateString: string) => {
    const selectedDayOfWeek = new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });

    const filtered = habits.filter((habit: Habit) => {
  if (habit.frequency === 'Daily') return true;

  // get day of week from date, e.g. "Monday"
  const selectedDayOfWeek = new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });

  if (habit.frequency === 'Weekly' && habit.dayOfWeek === selectedDayOfWeek) return true;

  return false;
});


    setHabitsForSelectedDate(filtered);
  };

  const renderHabit = ({ item }: { item: Habit }) => {
    const isCompleted = item.completedDates?.includes(selectedDate);

    return (
      <View style={styles.habitCard}>
        <Text style={styles.habitName}>{item.name}</Text>
        <Text style={{ color: isCompleted ? '#4CAF50' : '#E91E63', marginTop: 4 }}>
          {isCompleted ? '✅ Completed' : '❌ Not Completed'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onDayPress={onDayPress}
        theme={{
          selectedDayBackgroundColor: '#81C784',
          todayTextColor: '#E91E63',
          arrowColor: '#4CAF50',
        }}
      />

      <Text style={styles.title}>Habits for {selectedDate}</Text>

      {habitsForSelectedDate.length === 0 ? (
        <Text style={styles.noHabitsText}>No habits scheduled today.</Text>
      ) : (
        <FlatList
          data={habitsForSelectedDate}
          keyExtractor={(item) => item.id}
          renderItem={renderHabit}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  habitCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
  },
  noHabitsText: {
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default CalendarScreen;