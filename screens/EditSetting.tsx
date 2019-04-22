import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import EditMoods from '../components/EditMoods/EditMoods';

interface Props {}
export default class Settings extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Edit a setting, yo</Text>
        <EditMoods />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center'
  }
});
