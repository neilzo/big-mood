import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import colorVariables from '../colorVariables';

interface Props {
  title: string;
  icon: string;
  onPress: () => void;
}
const SettingItem = ({ title, icon, onPress }: Props) => {
  return (
    <TouchableHighlight onPress={onPress} style={styles.touchWrap}>
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Text>{icon}</Text>
        </View>
        <Text>{title}</Text>
        <View style={styles.arrowIcon}>
          <Text>></Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchWrap: {
    alignSelf: 'stretch'
  },
  container: {
    //justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colorVariables.borderColor,
    backgroundColor: colorVariables.white,
    padding: 10
  },
  iconWrap: {
    marginRight: 10
  },
  arrowIcon: {
    marginLeft: 'auto'
  }
});

export default SettingItem;
