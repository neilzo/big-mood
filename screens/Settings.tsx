import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Settings extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
