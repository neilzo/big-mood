import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colorVariables from '../colorVariables';

interface Props {
  title: string;
  icon: string;
}
const SettingItem = ({ title, icon }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Text>{icon}</Text>
      </View>
      <Text>{title}</Text>
      <View style={styles.arrowIcon}>
        <Text>></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
