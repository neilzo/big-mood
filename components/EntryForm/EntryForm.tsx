import React from 'react';
import { Component } from 'react';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';

import MoodList from '../MoodList/MoodList';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import colorVariables from '../colorVariables';
import EntryInterface from '../../types/entry';
import MoodInterface from '../../types/mood';

interface Props {
  createEntry: (data: object) => void;
  editEntry: (data: object) => void;
  entry: EntryInterface;
}
interface State {
  id: string;
  mood?: object;
  note: string;
  weather?: object;
  isEditing: boolean;
}

const isDisabled = (state: State) => {
  return !state.mood || !state.note;
};

export default class EntryForm extends Component<Props, State> {
  static defaultProps = {
    createEntry: () => {},
    editEntry: () => {},
    entry: {}
  };

  constructor(props: any) {
    super(props);

    const entry = this.props.entry || {};

    this.state = {
      id: entry.id,
      mood: entry.mood,
      note: entry.note,
      weather: entry.weather,
      isEditing: Boolean(entry.mood) // todo make this less brittle
    };
  }

  componentDidUpdate() {
    const { entry: entryProp } = this.props;
    const { id } = this.state;
    if (entryProp && entryProp.id !== id) this.updateUI();
  }

  updateUI() {
    const { entry } = this.props;
    this.setState(() => ({
      id: entry.id,
      mood: entry.mood,
      note: entry.note,
      weather: entry.weather,
      isEditing: Boolean(entry.mood) // todo make this less brittle
    }));
  }

  handleMoodSelect = (mood: MoodInterface) => {
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
    this.props.editEntry({
      id: this.props.entry.id,
      newEntryData: this.state,
      createdAt: this.props.entry.createdAt
    });
  };

  renderSubmitButton = () => {
    const { isEditing } = this.state;

    if (isEditing)
      return (
        <Button
          title="Edit a boy"
          onPress={this.editEntry}
          disabled={isDisabled(this.state)}
        />
      );

    return (
      <Button
        title="Create a boy"
        onPress={this.createEntry}
        disabled={isDisabled(this.state)}
      />
    );
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
    alignItems: 'center'
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
