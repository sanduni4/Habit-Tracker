import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Habit } from '../types';

// USER METHODS
export const saveUser = async (user: { name: string; email: string; password: string }) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error retrieving user:', error);
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Error clearing user:', error);
  }
};

// HABIT METHODS
export const getHabits = async (): Promise<Habit[]> => {
  try {
    const data = await AsyncStorage.getItem('habits');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving habits:', error);
    return [];
  }
};

// Add a new habit while preserving existing ones
export const addHabit = async (newHabit: Habit) => {
  try {
    const existingHabits = await getHabits();
    const updatedHabits = [...existingHabits, newHabit];
    await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
  } catch (error) {
    console.error('Error adding habit:', error);
  }
};

// Save entire habits array (overwrite)
export const saveAllHabits = async (habits: Habit[]) => {
  try {
    await AsyncStorage.setItem('habits', JSON.stringify(habits));
  } catch (error) {
    console.error('Error saving all habits:', error);
  }
};

// Clear ALL storage (users + habits)
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};
