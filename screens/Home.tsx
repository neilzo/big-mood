import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import day from '../services/day';
import entry from '../services/entry';
import EntryForm from '../components/EntryForm/EntryForm';
import EntryList from '../components/EntryList/EntryList';

interface Props {
  navigation: any;
}
interface Item {
  id: string;
}
export default class HomeScreen extends Component<Props> {
  constructor(props: any) {
    super(props);
    const days = day.getDays();

    this.state = {
      days
    };
  }

  _keyExtractor = (item: Item) => item.id;

  updateDataSource(props = this.props) {
    this.setState(() => ({
      days: day.getDays()
    }));
  }

  createEntry = (data: object) => {
    entry.createEntry(data);
    this.updateDataSource();
  };

  deleteEntry = (item: Item) => {
    entry.deleteEntry(item);
    this.updateDataSource();
  };

  deleteDay = id => {
    day.deleteDay(id);
    this.updateDataSource();
  };

  render() {
    const { navigate } = this.props.navigation;
    const { days } = this.state;

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
