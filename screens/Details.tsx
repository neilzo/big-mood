import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Button, Image } from 'react-native';

import dateHelper from '../helpers/date';
import colorVariables from '../components/colorVariables';
import moodMap from '../services/models/defaultMoods';
import DayInterface from '../types/day';
import EntryInterface from '../types/entry';
import habitProgress from '../services/habitProgress';
import habit from '../services/habit';

interface Props {
  navigation: any;
  habitProgress: object;
  day: DayInterface;
}
class Details extends Component<Props> {
  componentDidMount() {
    this.props.getData();
  }

  _keyExtractor = (item: DayInterface) => item.id;

  onEntryPress = (entry: EntryInterface) => {
    this.props.navigation.navigate('EditEntry', { entry });
  };

  renderHabitProgress = () => {
    const { day, habitProgress } = this.props;
    const habits = habitProgress[day.id];

    if (!habits) return null;

    return habits.map(progress => (
      <View key={progress.id}>
        <Text>Habit: {progress.habitIcon}</Text>
        <Text>{progress.habitName}</Text>
        <Text>Completed: {progress.completed.toString()}</Text>
      </View>
    ));
  };

  renderAverageWeather = () => {};

  renderAverageMood = () => {
    const { day } = this.props;
    const totalMood = day.entries.reduce((acc, entry) => {
      return acc + entry.mood.rating;
    }, 0);
    const averageMood = Math.round(totalMood / day.entries.length);
    const mood = moodMap[averageMood];

    return (
      <View style={styles.dateHeader}>
        <Text style={styles.dateHeaderText}>
          {dateHelper.getPrettyDate(day.createdAt)}
        </Text>
        <Text>
          Today you overall felt: {mood.icon} {mood.moodName}
        </Text>
      </View>
    );
  };

  renderRow = ({ item }: { item: EntryInterface }) => {
    return (
      <View key={item.id} style={styles.item}>
        <Text>{dateHelper.getPrettyTime(item.createdAt)}</Text>
        <Text style={styles.icon}>{item.mood.icon}</Text>
        <Image
          style={{ width: 58, height: 58 }}
          source={{
            uri: `http://openweathermap.org/img/w/${item.weather.icon}.png`
          }}
        />
        <Text>{item.weather.temperature}</Text>
        <Text>{item.note}</Text>
        <Button title="Edit" onPress={() => this.onEntryPress(item)} />
      </View>
    );
  };

  renderEntryList = () => {
    const { day } = this.props;

    return (
      <View style={styles.listWrap}>
        <FlatList
          data={day.entries}
          renderItem={this.renderRow}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  };

  render() {
    const { day } = this.props;
    const date = day && dateHelper.getPrettyDate(day.createdAt);

    return (
      <View style={styles.container}>
        <Text style={styles.dateHeader}>{date}</Text>
        {this.renderAverageMood()}
        {this.renderHabitProgress()}
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
  dateHeader: {
    marginVertical: 20
  },
  dateHeaderText: {
    fontSize: 20
  },
  listWrap: {
    alignSelf: 'stretch'
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
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

const mapStateToProps = (state, props) => {
  const id = props.navigation.getParam('day').id;
  return {
    day: state.days[id],
    habitProgress: state.habitProgress
  };
};

const mapDispatchToProps = dispatch => ({
  getData: () => {
    // get day, habits, habitProgress...
    habit.getHabits();
    habitProgress.getHabitProgress();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
