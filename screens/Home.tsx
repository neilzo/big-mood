import React from 'react';
import { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import dayService from '../services/day';
import entryService from '../services/entry';
import * as reduxDays from '../redux/day';
import * as reduxEntries from '../redux/entry';
import DayInterface from '../types/day';
import EntryInterface from '../types/entry';

import EntryForm from '../components/EntryForm/EntryForm';
import EntryList from '../components/EntryList/EntryList';

interface Props {
  navigation: any;
  getData: () => void;
  createEntry: (entry: EntryInterface) => void;
  days: Array<DayInterface>;
}
interface Item {
  id: string;
}
class HomeScreen extends Component<Props> {
  componentDidMount() {
    this.props.getData();
  }

  _keyExtractor = (item: Item) => item.id;

  createEntry = (data: EntryInterface) => {
    this.props.createEntry(data);
  };

  deleteEntry = (item: Item) => {
    entryService.deleteEntry(item);
  };

  deleteDay = id => {
    dayService.deleteDay(id);
  };

  render() {
    const { navigate } = this.props.navigation;
    const { days } = this.props;

    return (
      <View style={styles.container}>
        <EntryForm createEntry={this.createEntry} />
        <EntryList
          days={days}
          deleteEntry={this.deleteEntry}
          deleteDay={this.deleteDay}
          navigate={navigate}
        />
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
  }
});

const mapStateToProp = state => ({
  days: Object.values(state.days).sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1;
    if (b.createdAt > a.createdAt) return 1;
    return 0;
  })
});

const mapDispatchToProp = (dispatch: DispatchProp) => ({
  getData: () => {
    dispatch(reduxDays.getDaysThunk());
  },
  createEntry: (entry: EntryInterface) =>
    dispatch(reduxEntries.newEntryThunk(entry))
});

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(HomeScreen);
