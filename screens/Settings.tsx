import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SettingItem from '../components/SettingItem/SettingItem';

export default class Settings extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
        <SettingItem title="Edit Moods" icon="😀" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
