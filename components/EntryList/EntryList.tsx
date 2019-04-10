import React from 'react';
import { Component } from 'react';
import { Button, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import mood from '../../services/mood';

interface Props {
  entries: Array<object>;
  deleteEntry: (item: object) => void;
}
export default class EntryList extends Component<Props> {
  _keyExtractor = item => item.id;

  renderRow = ({ item }) => {
    return (
      <View key={item.id} style={styles.item}>
        <Text style={styles.icon}>{item.mood.icon}</Text>
        <Image
          style={{ width: 58, height: 58 }}
          source={{
            uri: `http://openweathermap.org/img/w/${item.weather.icon}.png`
          }}
        />
        <Text>{item.note}</Text>
        <View style={styles.deleteButton}>
          <Button title="Delete" onPress={() => this.props.deleteEntry(item)} />
        </View>
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
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  icon: {
    fontSize: 40
  },
  deleteButton: {
    marginLeft: 'auto'
  }
});
