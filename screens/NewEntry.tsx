import React from 'react';
import { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as reduxEntries from '../redux/entry';
import * as reduxCurrentDay from '../redux/currentDay';
import EntryInterface from '../types/entry';
import HabitProgressInterface from '../types/habitProgress';

import EntryForm from '../components/EntryForm/EntryForm';
import HabitProgress from '../components/HabitProgress/HabitProgress';
import day from '../services/day';

interface Props {
  navigation: any;
  createEntry: ({ entry, habitProgress }) => void;
  init: () => void;
  habitProgress: object;
}
interface State {
  step: number;
  entry?: object;
  habitProgress?: object;
}
class NewEntry extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      step: 1,
      entry: {},
      habitProgress: props.habitProgress,
    };
  }

  componentDidMount() {
    this.props.init();
  }

  handleSave = () => {
    const { navigate } = this.props.navigation;
    const { entry, habitProgress: habitProgressObj } = this.state;
    const habitProgress = habitProgressObj && Object.values(habitProgressObj);

    this.props.createEntry({ entry, habitProgress });

    this.setState(() => ({
      step: 0,
      entry,
      habitProgress: this.props.habitProgress,
    }));

    navigate('Entries');
  };

  handleNextPress = () =>
    this.setState((prevState: State) => ({ step: prevState.step + 1 }));

  handleBackPress = () =>
    this.setState((prevState: State) => ({ step: prevState.step - 1 }));

  handleEntryChange = (newData: EntryInterface) => {
    this.setState((prevState: State) => ({
      entry: {
        ...prevState.entry,
        ...newData,
      },
    }));
  };

  handleHabitProgress = (habitProgress: HabitProgressInterface) => {
    this.setState((prevState: State) => ({
      habitProgress: {
        ...prevState.habitProgress,
        [habitProgress.habit]: habitProgress,
      },
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

    return <Button title="Create Entry" onPress={this.handleSave} />;
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
    alignItems: 'center',
  },
  entryWrap: {
    alignItems: 'center',
  },
});

const mapDispatchToProp = (dispatch: DispatchProp) => ({
  createEntry: ({
    entry,
    habitProgress,
  }: {
    entry: EntryInterface;
    habitProgress: Array<HabitProgressInterface>;
  }) => dispatch(reduxEntries.newEntryThunk({ entry, habitProgress })),
  init: (date: Date) => {
    // for now use the current day, todo use date from date select
    const currentDay = day.getCurrentDay();
    if (currentDay)
      dispatch(reduxCurrentDay.setEntryDay({ dayId: currentDay.id }));
  },
});

export default connect(
  null,
  mapDispatchToProp
)(NewEntry);
