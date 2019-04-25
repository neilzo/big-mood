import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as reduxEntries from '../redux/entry';
import EntryInterface from '../types/entry';

import EntryForm from '../components/EntryForm/EntryForm';
import HabitProgress from '../components/HabitProgress/HabitProgress';

interface Props {
  navigation: any;
  createEntry: (entry: EntryInterface) => void;
}
class NewEntry extends Component<Props> {
  createEntry = (data: EntryInterface) => {
    this.props.createEntry(data);
  };

  render() {
    return (
      <View style={styles.container}>
        <EntryForm createEntry={this.createEntry} />
        <HabitProgress />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
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
