import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList
} from 'react-native';
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
    const entries = entry.getEntries();

    this.state = {
      entries
    };
  }

  _keyExtractor = (item: Item) => item.id;

  updateDataSource(props = this.props) {
    this.setState(() => ({
      entries: entry.getEntries()
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

  render() {
    const { navigate } = this.props.navigation;
    const { entries } = this.state;

    return (
      <View style={styles.container}>
        <Text>How are ya feeling?</Text>
        <EntryForm createEntry={this.createEntry} />
        <EntryList entries={entries} deleteEntry={this.deleteEntry} />
        <Button title="Go to Details" onPress={() => navigate('Details')} />
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
