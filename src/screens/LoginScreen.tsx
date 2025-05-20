import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { getUser } from '../services/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkAutoLogin = async () => {
      try {
        const user = await getUser();
        if (user) {
          navigation.replace('Home');
        }
      } catch (error) {
        console.error('Auto-login failed:', error);
      }
    };

    checkAutoLogin();
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const storedUser = await getUser();

      if (!storedUser) {
        Alert.alert('No registered user found. Please register first.');
        return;
      }

      if (email === storedUser.email && password === storedUser.password) {
        navigation.replace('Home');
      } else {
        Alert.alert('Incorrect email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
      <CustomButton title="Login" onPress={handleLogin} />
      <CustomButton title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
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
    marginBottom: 16,
  },
});
