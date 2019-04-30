import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import Icon from '../Icon/Icon';

interface Props {
  onPress: () => void;
  icon: string;
  size?: number;
  containerStyle?: object;
}
const ButtonIconComponent = ({
  icon,
  onPress,
  size = 25,
  containerStyle = {},
}: Props) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={[styles.container, containerStyle]}>
      <Icon name={icon} size={size} />
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {},
});

export default ButtonIconComponent;
