import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ProgressTrackingScreen = () => {
  const [loading, setLoading] = useState(false);

  // Static data to test the BarChart
  const staticWeeklyData = [3, 5, 2, 4, 6, 1, 0];

  // Static labels for last 7 days
  const staticLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Static pie data for demonstration
  const pieData = [
    {
      name: 'Completed',
      count: 4,
      color: '#4caf50',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Remaining',
      count: 6,
      color: '#f44336',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ];

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

      <Text style={styles.percentageText}>40% Completed Today</Text>

      <Text style={styles.title}>Weekly Progress</Text>

      <BarChart
        data={{
          labels: staticLabels,
          datasets: [{ data: staticWeeklyData }],
        }}
        width={screenWidth - 40}
        height={250}
        chartConfig={chartConfig}
        fromZero
        yAxisInterval={1}
        showValuesOnTopOfBars
        style={{ marginTop: 20, borderRadius: 16 }}
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
