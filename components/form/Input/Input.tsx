import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import colorVariables from '../../colorVariables';

interface Props {
  onChange: (text: string) => void;
  label?: string;
  value: string;
}
const Input = ({ onChange, label, value }: Props) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput onChangeText={onChange} value={value} style={styles.input} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginTop: 15,
  },
  label: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: colorVariables.white,
    borderWidth: 1,
    borderRadius: colorVariables.borderRadius,
    borderColor: colorVariables.borderColor,
    alignSelf: 'stretch',
    height: 50,
    padding: 15,
  },
});

export default Input;
