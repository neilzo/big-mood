import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import Icon from '../Icon/Icon';

interface Props {
  onPress: () => void;
  icon: string;
  size?: number;
}
const ButtonIconComponent = ({ icon, onPress, size = 25 }: Props) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
      <Icon name={icon} size={size} />
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {}
});

export default ButtonIconComponent;
