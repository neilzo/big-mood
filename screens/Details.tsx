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

import ButtonIcon from '../components/ButtonIcon/ButtonIcon';
import Icon from '../components/Icon/Icon';

interface Props {
  navigation: any;
  habitProgress: object;
  day: DayInterface;
  getData: () => void;
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
      <View key={progress.id} style={styles.progressItem}>
        <Icon
          size={20}
          name="check-outline"
          color={colorVariables.colorSuccess}
        />
        <Text>{progress.habitIcon}</Text>
        <Text>{progress.habitName}</Text>
      </View>
    ));
  };

  renderWeather = weather => {
    return (
      <View style={styles.weatherWrap}>
        <Image
          style={{ width: 58, height: 58 }}
          source={{
            uri: `http://openweathermap.org/img/w/${weather.icon}.png`,
          }}
        />
        <Text>{weather.description} and </Text>
        <Text>{weather.temperature} degrees</Text>
      </View>
    );
  };

  renderActionIcons = (item: EntryInterface) => (
    <View style={styles.actionIcons}>
      <ButtonIcon
        icon="pencil"
        onPress={() => this.onEntryPress(item)}
        size={25}
      />
      <ButtonIcon icon="trash-can-outline" onPress={() => {}} size={25} />
    </View>
  );

  renderAverageMood = () => {
    const { day } = this.props;
    const totalMood = day.entries.reduce((acc: number, entry) => {
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
        <View style={styles.itemInner}>
          <Text style={styles.icon}>{item.mood.icon}</Text>
          <View style={styles.itemContent}>
            <View style={styles.itemHeader}>
              <Text>{dateHelper.getPrettyTime(item.createdAt)}</Text>
              {this.renderActionIcons(item)}
            </View>
            {this.renderWeather(item.weather)}
            <Text>{item.note}</Text>
          </View>
        </View>
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

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.renderAverageMood()}
          {this.renderHabitProgress()}
        </View>
        {this.renderEntryList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colorVariables.defaultBGColor,
  },
  header: {
    flex: 0,
  },
  dateHeader: {
    marginVertical: 20,
  },
  dateHeaderText: {
    fontSize: 20,
  },
  listWrap: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 20,
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    padding: 10,
    marginVertical: 5,
    shadowColor: colorVariables.shadowColor,
    borderWidth: 1,
    borderColor: colorVariables.borderColor,
    backgroundColor: colorVariables.white,
    borderRadius: colorVariables.borderRadius,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  itemInner: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  itemHeader: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcons: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    flex: 0,
    fontSize: 40,
  },
  itemContent: {
    flex: 1,
  },
  weatherWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const mapStateToProps = (state, props) => {
  const id = props.navigation.getParam('day').id;
  return {
    day: state.days[id],
    habitProgress: state.habitProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  getData: () => {
    // get day, habits, habitProgress...
    habit.getHabits();
    habitProgress.getHabitProgress();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
