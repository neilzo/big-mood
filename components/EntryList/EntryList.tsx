import React from 'react';
import { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  SectionList,
  Image,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import colorVariables from '../colorVariables';

interface Props {
  days: Array<object>;
  deleteEntry: (item: object) => void;
  deleteDay: (id: string) => void;
  navigate: any;
}
export default class EntryList extends Component<Props> {
  _keyExtractor = item => item.id;

  onSectionPress = day => {
    this.props.navigate('Details', { day });
  };

  onEntryPress = entry => {
    this.props.navigate('EditEntry', { entry });
  };

  renderSectionHeader = ({
    section: {
      day,
      day: { id, createdAt }
    }
  }) => (
    <TouchableHighlight onPress={() => this.onSectionPress(day)}>
      <View style={styles.sectionHeader}>
        <Text style={{ fontWeight: 'bold' }}>
          {moment(createdAt).format('MMM Do YYYY')}
        </Text>
        <Button title="x" onPress={() => this.props.deleteDay(id)} />
      </View>
    </TouchableHighlight>
  );

  renderEntryRow = ({ item }) => {
    return (
      <TouchableHighlight onPress={() => this.onEntryPress(item)}>
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
            <Button title="x" onPress={() => this.props.deleteEntry(item)} />
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const { days } = this.props;
    return (
      <View style={styles.container}>
        <SectionList
          sections={days.map(day => ({
            day,
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
    marginHorizontal: 20,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: colorVariables.borderColor,
    backgroundColor: '#fff',
    borderRadius: colorVariables.borderRadius,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5
  },
  icon: {
    fontSize: 40
  },
  deleteButton: {
    marginLeft: 'auto'
  },
  sectionHeader: {
    backgroundColor: '#F5FCFF',
    marginHorizontal: 20,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colorVariables.borderColor
  }
});
