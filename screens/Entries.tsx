import React from 'react';
import { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import dayService from '../services/day';
import entryService from '../services/entry';
import * as reduxDays from '../redux/day';
import DayInterface from '../types/day';

import EntryList from '../components/EntryList/EntryList';

interface Props {
  navigation: any;
  getData: () => void;
  days: Array<DayInterface>;
}
interface Item {
  id: string;
}
class Entries extends Component<Props> {
  componentDidMount() {
    this.props.getData();
  }

  deleteEntry = (item: Item) => {
    entryService.deleteEntry(item);
  };

  deleteDay = (id: string) => {
    dayService.deleteDay(id);
  };

  render() {
    const { navigate } = this.props.navigation;
    const { days } = this.props;

    return (
      <View style={styles.container}>
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
  }
});

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(Entries);
