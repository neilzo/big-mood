import React from 'react';
import { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  SectionList,
  Image,
  TouchableHighlight,
} from 'react-native';
import size from 'lodash/size';

import dateHelper from '../../helpers/date';
import colorVariables from '../colorVariables';
import EntryInterface from '../../types/entry';
import DayInterface from '../../types/day';

interface Props {
  days: Array<DayInterface>;
  deleteEntry: (item: object) => void;
  deleteDay: (id: string) => void;
  navigate: any;
}
export default class EntryList extends Component<Props> {
  _keyExtractor = (item: EntryInterface) => item.id;

  onSectionPress = (day: DayInterface) => {
    this.props.navigate('Details', { day });
  };

  onEntryPress = (entry: EntryInterface) => {
    this.props.navigate('EditEntry', { entry });
  };

  renderEmptyOrList = () => {
    const { days } = this.props;

    if (!size(days))
      return (
        <View style={styles.emptyWrap}>
          <Text>You haven't added any entries yet!</Text>
        </View>
      );

    return (
      <SectionList
        sections={days.map(day => ({
          day,
          data: day.entries,
        }))}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderEntryRow}
        keyExtractor={this._keyExtractor}
      />
    );
  };

  renderSectionHeader = ({
    section: { day },
  }: {
    section: { day: DayInterface };
  }) => (
    <TouchableHighlight onPress={() => this.onSectionPress(day)}>
      <View style={styles.sectionHeader}>
        <Text style={{ fontWeight: 'bold' }}>
          {dateHelper.getPrettyDate(day.createdAt)}
        </Text>
        <Button title="x" onPress={() => this.props.deleteDay(day.id)} />
      </View>
    </TouchableHighlight>
  );

  renderEntryRow = ({ item }: { item: EntryInterface }) => {
    return (
      <TouchableHighlight onPress={() => this.onEntryPress(item)}>
        <View key={item.id} style={styles.item}>
          <Text style={styles.icon}>{item.mood.icon}</Text>
          <Image
            style={{ width: 58, height: 58 }}
            source={{
              uri: `http://openweathermap.org/img/w/${item.weather.icon}.png`,
            }}
          />
          <Text numberOfLines={1} style={styles.note}>
            {item.note}
          </Text>
          <View style={styles.deleteButton}>
            <Button title="x" onPress={() => this.props.deleteEntry(item)} />
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return <View style={styles.container}>{this.renderEmptyOrList()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
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
    shadowRadius: 1.5,
  },
  note: {
    flex: 1,
  },
  icon: {
    fontSize: 40,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  sectionHeader: {
    backgroundColor: '#F5FCFF',
    marginHorizontal: 20,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colorVariables.borderColor,
  },
});
