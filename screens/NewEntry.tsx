import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as reduxEntries from '../redux/entry';
import EntryInterface from '../types/entry';
import HabitProgressInterface from '../types/habitProgress';

import EntryForm from '../components/EntryForm/EntryForm';
import HabitProgress from '../components/HabitProgress/HabitProgress';
import habitProgressService from '../services/habitProgress';

interface Props {
  navigation: any;
  createEntry: (entry: EntryInterface) => void;
  habitProgress: object;
}
interface State {
  step: number;
  entry?: EntryInterface;
  habitProgress?: object;
}
class NewEntry extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      step: 0,
      entry: {},
      habitProgress: props.habitProgress
    };
  }

  createEntry = (data: EntryInterface) => {
    this.props.createEntry(data);
  };

  handleNextPress = () =>
    this.setState((prevState: State) => ({ step: prevState.step + 1 }));

  handleBackPress = () =>
    this.setState((prevState: State) => ({ step: prevState.step - 1 }));

  handleEntryChange = newData => {
    this.setState((prevState: State) => ({
      entry: {
        ...prevState.entry,
        ...newData
      }
    }));
  };

  handleHabitProgress = habitProgress => {
    console.log(habitProgress.habit, habitProgress);

    this.setState((prevState: State) => ({
      habitProgress: {
        ...prevState.habitProgress,
        [habitProgress.habit]: habitProgress
      }
    }));
  };

  renderStep = () => {
    const { step, habitProgress, entry } = this.state;

    if (step === 0)
      return (
        <View style={styles.entryWrap}>
          <Text>How are ya feeling?</Text>
          <EntryForm handleEntryChange={this.handleEntryChange} entry={entry} />
        </View>
      );

    if (step === 1)
      return (
        <HabitProgress
          onHabitChange={this.handleHabitProgress}
          habitProgress={habitProgress}
        />
      );

    return (
      <View>
        <Text>step undefined</Text>
      </View>
    );
  };

  renderBackButton = () => {
    const { step } = this.state;

    if (step === 0) return null;

    return <Button title="Back" onPress={this.handleBackPress} />;
  };

  renderNextButton = () => {
    const { step } = this.state;

    if (step === 1) return null;

    return <Button title="Next" onPress={this.handleNextPress} />;
  };

  renderSaveButton = () => {
    const { step } = this.state;

    if (step !== 1) return null;

    return <Button title="Create Entry" onPress={() => {}} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderStep()}
        {this.renderBackButton()}
        {this.renderNextButton()}
        {this.renderSaveButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  entryWrap: {
    alignItems: 'center'
  }
});

const mapDispatchToProp = (dispatch: DispatchProp) => ({
  createEntry: (entry: EntryInterface) =>
    dispatch(reduxEntries.newEntryThunk(entry))
});

export default connect(
  null,
  mapDispatchToProp
)(NewEntry);
