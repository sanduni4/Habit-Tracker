import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';
import { saveUser } from '../services/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { User } from '../types';
import CustomButton from '../components/CustomButton';


type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
const isValidEmail = (email: string) => {
  // Simple email regex for validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

 const handleRegister = async () => {
  if (!name || !email || !password) {
    Alert.alert('Please fill all fields!');
    return;
  }

  if (!isValidEmail(email)) {
    Alert.alert('Please enter a valid email address!');
    return;
  }

  await saveUser({ name, email, password });
  navigation.replace('Home');
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input}  keyboardType="email-address" autoCapitalize="none"  />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
      <CustomButton title="Register" onPress={handleRegister} />
      <CustomButton title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
    
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    flex: 0.2,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 25,
  },
});
