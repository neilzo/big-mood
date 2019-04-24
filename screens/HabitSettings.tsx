import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MoodList from '../components/MoodList/MoodList';

interface Props {
  navigation: any;
}
export default class HabitSettings extends Component<Props> {
  // onAddNewPress = () => {
  //   const { navigate } = this.props.navigation;
  //   navigate('MoodForm');
  // };

  // onEditPress = mood => {
  //   const { navigate } = this.props.navigation;
  //   navigate('MoodForm', { mood });
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text>Edit habits</Text>
        {/* <Button title="Add New..." onPress={this.onAddNewPress} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});
