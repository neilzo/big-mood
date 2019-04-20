import React from 'react';
import { Component } from 'react';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import MoodList from '../MoodList/MoodList';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import colorVariables from '../colorVariables';

interface Props {
  createEntry: (data: object) => void;
  editEntry: (data: object) => void;
  entry: {
    mood: object;
    note: string;
    weather: object;
    id: string;
  };
}
interface InitialState {
  mood?: object;
  note: string;
  weather?: object;
  isEditing: boolean;
}

export default class EntryForm extends Component<Props, InitialState> {
  constructor(props: any) {
    super(props);

    const entry = this.props.entry || {};

    this.state = {
      mood: entry.mood,
      note: entry.note,
      weather: entry.weather,
      isEditing: Boolean(entry.mood) // todo make this less brittle
    };
  }

  handleMoodSelect = mood => {
    this.setState(() => ({ mood }));
  };

  handleNoteChange = (note: string) => {
    this.setState(() => ({ note }));
  };

  handleWeatherChange = weather => this.setState(() => ({ weather }));

  createEntry = () => {
    this.props.createEntry(this.state);
    this.setState(() => ({ mood: undefined, note: '' }));
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

  renderWeather = () => {
    const { isEditing } = this.state;

    if (isEditing) return null;

    return <WeatherDisplay onWeatherResult={this.handleWeatherChange} />;
  };

  renderHeader = () => {
    const { isEditing } = this.state;

    if (isEditing) return null;

    return <Text>How are ya feeling?</Text>;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MoodList
          onMoodPress={this.handleMoodSelect}
          selectedMood={this.state.mood}
        />
        {this.renderWeather()}
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
    width: 300,
    height: 150
  }
});
