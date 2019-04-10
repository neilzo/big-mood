import React from 'react';
import { Component } from 'react';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import MoodList from '../MoodList/MoodList';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import colorVariables from '../colorVariables';

interface Props {
  createEntry: (data: object) => void;
}
export default class EntryForm extends Component<Props> {
  constructor(props: any) {
    super(props);

    this.state = {
      mood: null,
      note: '',
      weather: null
    };
  }

  handleMoodSelect = mood => {
    this.setState(() => ({ mood }));
  };

  handleNoteChange = note => {
    this.setState(() => ({ note }));
  };

  handleWeatherChange = weather => this.setState(() => ({ weather }));

  createEntry = () => {
    this.props.createEntry(this.state);
    this.setState(() => ({ mood: null, note: '' }));
  };

  render() {
    return (
      <View style={styles.container}>
        <MoodList
          onMoodPress={this.handleMoodSelect}
          selectedMood={this.state.mood}
        />
        <WeatherDisplay onWeatherResult={this.handleWeatherChange} />
        <Text>Note:</Text>
        <TextInput
          style={styles.note}
          onChangeText={this.handleNoteChange}
          value={this.state.note}
        />
        <Button title="Create a boy" onPress={this.createEntry} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  note: {
    backgroundColor: colorVariables.white,
    borderColor: colorVariables.borderColor,
    borderWidth: 1,
    borderRadius: colorVariables.borderRadius,
    flex: 1,
    width: 300
  }
});
