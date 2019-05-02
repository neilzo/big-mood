import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';

import day from '../services/day';
import * as reduxEntries from '../redux/entry';
import * as reduxCurrentDay from '../redux/currentDay';
import EntryInterface from '../types/entry';
import HabitProgressInterface from '../types/habitProgress';

import EntryForm from '../components/EntryForm/EntryForm';
import HabitProgress from '../components/HabitProgress/HabitProgress';
import FormWizard from '../components/form/FormWizard/FormWizard';

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
      step: 0,
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

  renderInitialStep = () => {
    const { entry } = this.state;

    return (
      <View style={styles.entryWrap}>
        <Text>How are ya feeling?</Text>
        <EntryForm handleEntryChange={this.handleEntryChange} entry={entry} />
      </View>
    );
  };

  renderProgressStep = () => {
    const { habitProgress } = this.state;
    return (
      <HabitProgress
        onHabitChange={this.handleHabitProgress}
        habitProgress={habitProgress}
      />
    );
  };

  renderSaveButton = () => {
    return <Button title="Create Entry" onPress={this.handleSave} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <FormWizard
          saveButton={this.renderSaveButton()}
          steps={[this.renderInitialStep(), this.renderProgressStep()]}
        />
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

const mapDispatchToProp = dispatch => ({
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
