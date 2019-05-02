import React from 'react';
import { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import MoodInterface from '../types/mood';
import MoodList from '../components/MoodList/MoodList';

interface Props {
  navigation: any; // todo figure out the type for this
}
export default class EditMoods extends Component<Props> {
  onAddNewPress = () => {
    const { navigate } = this.props.navigation;
    navigate('MoodForm');
  };

  onEditPress = (mood: MoodInterface) => {
    const { navigate } = this.props.navigation;
    navigate('MoodForm', { mood });
  };

  render() {
    return (
      <View style={styles.container}>
        <MoodList onMoodPress={this.onEditPress} grouped={true} />
        <Button title="Add New..." onPress={this.onAddNewPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
