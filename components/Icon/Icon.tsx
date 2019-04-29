import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  name: string;
  color?: string;
  size: number;
}

const Icon = ({ name, color = '#ccc', size = 30 }: Props) => (
  <View style={styles.container}>
    <Text>
      <MCIcon name={name} size={size} color={color} />
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {},
});

export default Icon;
