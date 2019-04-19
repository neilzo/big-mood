import React from 'react';
import { Component } from 'react';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import MoodList from '../MoodList/MoodList';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import colorVariables from '../colorVariables';

interface Props {
  createEntry: (data: object) => void;
  editEntry: (data: object) => void;
}
export default class EntryForm extends Component<Props> {
  constructor(props: any) {
    super(props);
    const entry = this.props.entry || {};

    this.state = {
      mood: entry.mood || null,
      note: entry.note || '',
      weather: entry.weather || null,
      isEditing: Boolean(entry.mood) // todo make this less brittle
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

  editEntry = () => {
    this.props.editEntry({ id: this.props.entry.id, newEntryData: this.state });
  };

  renderSubmitButton = () => {
    const { isEditing } = this.state;

    if (isEditing)
      return <Button title="Edit a boy" onPress={this.editEntry} />;

    return <Button title="Create a boy" onPress={this.createEntry} />;
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
        {this.renderSubmitButton()}
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
