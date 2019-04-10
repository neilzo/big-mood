import React from 'react';
import { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  SectionList,
  Image
} from 'react-native';
import moment from 'moment';
import mood from '../../services/mood';

interface Props {
  days: Array<object>;
  deleteEntry: (item: object) => void;
  deleteDay: (id: string) => void;
}
export default class EntryList extends Component<Props> {
  _keyExtractor = item => item.id;

  renderSectionHeader = ({ section: { id, createdAt } }) => (
    <View style={styles.sectionHeader}>
      <Text style={{ fontWeight: 'bold' }}>
        {moment(createdAt).format('MMM Do YYYY')}
      </Text>
      <Button title="Delete" onPress={() => this.props.deleteDay(id)} />
    </View>
  );

  renderEntryRow = ({ item }) => {
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
    const { days } = this.props;
    return (
      <View style={styles.container}>
        <SectionList
          sections={days.map(day => ({
            id: day.id,
            data: day.entries
          }))}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderEntryRow}
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
  },
  sectionHeader: {
    paddingHorizontal: 20
  }
});
