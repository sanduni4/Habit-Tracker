import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { getHabits } from '../services/storage';
import { Habit } from '../types';
import { PieChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ProgressTrackingScreen = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [todayCompleted, setTodayCompleted] = useState(0);
  const [weeklyData, setWeeklyData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toDateString();

  const loadProgress = async () => {
    try {
      const storedHabits = await getHabits();
      setHabits(storedHabits);

      // Completed today
      const completedToday = storedHabits.filter(habit =>
        habit.completedDates?.includes(today)
      ).length;
      setTodayCompleted(completedToday);

      // Last 7 days
      const weekDays = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toDateString();
      });

      const weeklyCounts = weekDays.map(day =>
        storedHabits.filter(habit => habit.completedDates?.includes(day)).length
      );
      setWeeklyData(weeklyCounts);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const totalHabits = habits.length;
  const completionPercentage = totalHabits
    ? ((todayCompleted / totalHabits) * 100).toFixed(1)
    : '0';

  const pieData = [
    {
      name: 'Completed',
      count: todayCompleted,
      color: '#4caf50',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Remaining',
      count: totalHabits - todayCompleted,
      color: '#f44336',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ];

  // Dynamic weekday labels (Mon, Tue etc.)
  const getWeekdayLabels = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-US', options);
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Today's Progress</Text>

      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="10"
        absolute
      />

      <Text style={styles.percentageText}>
        {completionPercentage}% Completed Today
      </Text>

      <Text style={styles.title}>Weekly Progress</Text>

      <BarChart
        data={{
          labels: getWeekdayLabels(),
          datasets: [{ data: weeklyData }],
        }}
        width={screenWidth - 40}
        height={250}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
};

export default ProgressTrackingScreen;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  percentageText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
});
