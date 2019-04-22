import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MoodList from '../components/MoodList/MoodList';

interface Props {
  navigation: any;
}
export default class EditMoods extends Component<Props> {
  onAddNewPress = () => {
    const { navigate } = this.props.navigation;
    navigate('MoodForm');
  };

  onEditPress = mood => {
    const { navigate } = this.props.navigation;
    navigate('MoodForm', { mood });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Edit moods... show grouped list</Text>
        <MoodList onMoodPress={this.onEditPress} />
        <Button title="Add New..." onPress={this.onAddNewPress} />
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
