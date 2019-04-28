import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
}
const ButtonComponent = ({ title, onPress }: Props) => (
  <View style={styles.container}>
    <Button title={title} onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  container: {}
});

export default ButtonComponent;
