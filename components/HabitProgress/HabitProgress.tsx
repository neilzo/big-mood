import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import groupBy from 'lodash/groupBy';

import habitService from '../../services/habit';

import Checkbox from '../form/Checkbox/Checkbox';
import colorVariables from '../colorVariables';
import habitProgress from '../../services/habitProgress';
import Icon from '../Icon/Icon';

interface Props {
  navigation: any;
  onHabitChange: (habitProgress) => void;
  habitProgress: object;
}
class HabitProgress extends Component<Props> {
  static defaultProps = {
    habits: [],
    habitProgress: {},
  };

  componentDidMount() {
    this.props.getData();
  }

  handleHabitProgressChange = ({ habit, selected }) => {
    const { onHabitChange } = this.props;

    onHabitChange({ habit: habit.id, completed: selected });
  };

  renderHabitList = () => {
    const { habits, habitProgress, progressByHabit } = this.props;

    return habits.map(habit => {
      if (progressByHabit[habit.id])
        return (
          <View key={habit.id} style={styles.item}>
            <Text>{habit.icon}</Text>
            <Text>{habit.name}</Text>
            <View style={styles.checkboxWrap}>
              <Icon
                name="checkbox-marked-outline"
                size={20}
                color={colorVariables.colorSuccess}
              />
            </View>
          </View>
        );

      return (
        <View key={habit.id} style={styles.item}>
          <Text>{habit.icon}</Text>
          <Text>{habit.name}</Text>
          <Checkbox
            containerStyle={styles.checkboxWrap}
            checked={habitProgress[habit.id]}
            onChange={(selected: boolean) =>
              this.handleHabitProgressChange({ habit, selected })
            }
          />
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Did you accomplish any of your goals?</Text>
        {this.renderHabitList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignSelf: 'stretch',
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
  checkboxWrap: {
    marginLeft: 'auto',
  },
});

const mapStateToProps = state => {
  const habits = Object.values(state.habits);
  const currentDayId = state.currentDay;
  const existingProgress = state.habitProgress[currentDayId] || {};
  const progressByHabit = groupBy(existingProgress, progress => progress.habit);
  return {
    habits,
    progressByHabit,
  };
};

const mapDispatchToProps = dispatch => ({
  getData: () => {
    // todo dispatch instead
    habitService.getHabits();
    habitProgress.getHabitProgress();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitProgress);
