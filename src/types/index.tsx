export interface User {
    name: string;
    email: string;
    password: string;
  }
  
  export interface Habit {
    id: string;
    name: string;
    frequency: 'Daily' | 'Weekly';
    completedDates: string[];
  }
  
    