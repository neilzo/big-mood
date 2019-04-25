import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Icon = ({ name, color = '#900', size = 30 }) => (
  <View style={styles.container}>
    <Text>
      <MCIcon name={name} size={size} color={color} />
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {}
});

export default Icon;
