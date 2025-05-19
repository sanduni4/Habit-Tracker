import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Habit } from '../types';

export const saveUser = async (user: User) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async (): Promise<User | null> => {
  const data = await AsyncStorage.getItem('user');
  return data ? JSON.parse(data) : null;
};

export const saveHabits = async (habits: Habit[]) => {
  await AsyncStorage.setItem('habits', JSON.stringify(habits));
};

export const getHabits = async (): Promise<Habit[]> => {
  const data = await AsyncStorage.getItem('habits');
  return data ? JSON.parse(data) : [];
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};
