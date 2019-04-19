import React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Image,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import colorVariables from '../components/colorVariables';
import moodMap from '../services/models/defaultMoods';
import dayService from '../services/day';
import realms from '../services/models/index';

interface Props {
  navigation: any;
}
export default class Details extends Component<Props> {
  constructor(props) {
    super(props);
    const { navigation } = this.props;

    this.state = {
      day: dayService.getDayById(navigation.getParam('day').id)
    };
  }

  updateUI() {
    const { navigation } = this.props;
    this.setState(() => ({
      day: dayService.getDayById(navigation.getParam('day').id)
    }));
  }

  _keyExtractor = item => item.id;

  onEntryPress = entry => {
    this.props.navigation.navigate('EditEntry', { entry });
  };

  renderAverageWeather = () => {};

  renderAverageMood = day => {
    const totalMood = day.entries.reduce((acc, entry) => {
      return acc + entry.mood.rating;
    }, 0);
    const averageMood = Math.round(totalMood / day.entries.length);

    return (
      <View>
        <Text>
          Today you felt: {moodMap[averageMood].icon}{' '}
          {moodMap[averageMood].moodName}
        </Text>
      </View>
    );
  };

  renderRow = ({ item }) => {
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
          <Text>{item.weather.temperature}</Text>
          <Text>{item.note}</Text>
          {/* <Button title="Delete" onPress={() => this.props.deleteEntry(item)} /> */}
        </View>
      </TouchableHighlight>
    );
  };

  renderEntryList = () => {
    const { day } = this.state;

    return (
      <FlatList
        data={day.entries}
        renderItem={this.renderRow}
        keyExtractor={this._keyExtractor}
      />
    );
  };

  render() {
    const { navigation } = this.props;
    const day = navigation.getParam('day');
    const date = moment(day.createdAt).format('MMM Do YYYY');

    return (
      <View style={styles.container}>
        <Text>{date}</Text>
        {this.renderAverageMood(day)}
        {this.renderEntryList()}
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
  }
});
