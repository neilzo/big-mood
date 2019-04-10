import React from 'react';
import { Component } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import mood from '../../services/mood';

interface Props {
  entries: Array<object>;
  deleteEntry: (item: object) => void;
}
export default class EntryList extends Component<Props> {
  _keyExtractor = item => item.id;

  renderRow = ({ item }) => {
    return (
      <View key={item.id}>
        <Text style={styles.icon}>{item.mood.icon}</Text>
        <Text>{item.note}</Text>
        <Button title="Delete" onPress={() => this.props.deleteEntry(item)} />
      </View>
    );
  };

  render() {
    const { entries } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={entries}
          renderItem={this.renderRow}
          keyExtractor={this._keyExtractor}
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
    backgroundColor: '#F5FCFF',
    flexDirection: 'row'
  },
  icon: {
    fontSize: 40
  }
});
