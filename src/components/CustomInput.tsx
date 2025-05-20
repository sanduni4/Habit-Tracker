import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View } from 'react-native';

type Props = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
};

const CustomInput = ({ value, onChangeText, ...rest }: Props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
