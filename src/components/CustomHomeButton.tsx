import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  color?: string;
};

const CustomHomeButton = ({ title, onPress, color = '#FFF' }: Props) => {
  return (
    <View style={styles.button}>
      <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHomeButton;

const styles = StyleSheet.create({
  button: {
    elevation: 5,
    padding: 20,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#0CA789',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: 30,
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: '600',
  },
});
