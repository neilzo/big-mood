import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import colorVariables from '../colorVariables';
import Icon from '../Icon/Icon';

interface Props {
  title: string;
  icon: string;
  settingRoute: string;
  onPress: (routeName: string) => void;
}
const SettingItem = ({ title, icon, onPress, settingRoute }: Props) => {
  return (
    <TouchableHighlight
      onPress={() => onPress(settingRoute)}
      style={styles.touchWrap}
    >
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Text>{icon}</Text>
        </View>
        <Text>{title}</Text>
        <View style={styles.arrowIcon}>
          <Icon name="chevron-right" size={20} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchWrap: {
    alignSelf: 'stretch',
  },
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colorVariables.borderColor,
    backgroundColor: colorVariables.white,
    padding: 10,
    marginTop: 15,
  },
  iconWrap: {
    marginRight: 10,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
});

export default SettingItem;
