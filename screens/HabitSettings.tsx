import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import size from 'lodash/size';

import habitService from '../services/habit';
import colorVariables from '../components/colorVariables';
import * as reduxHabits from '../redux/habit';
import ButtonIcon from '../components/ButtonIcon/ButtonIcon';

interface Props {
  navigation: any;
  toggleHabit: (habit) => void;
}
class HabitSettings extends Component<Props> {
  componentDidMount() {
    this.props.getData();
  }

  onAddNewPress = () => {
    const { navigate } = this.props.navigation;
    navigate('HabitForm');
  };

  handleInstallDefaults = () => {
    habitService.installDefaultHabits();
  };

  onEditPress = habit => {
    const { navigate } = this.props.navigation;
    navigate('HabitForm', { habitId: habit.id });
  };

  handleHabitToggle = habit => {
    this.props.toggleHabit(habit);
  };

  render() {
    const { habits } = this.props;
    return (
      <View style={styles.container}>
        {habits.map(habit => (
          <View key={habit.id} style={styles.item}>
            <Text>{habit.icon}</Text>
            <Text>{habit.name}</Text>
            <View style={styles.switchWrap}>
              <ButtonIcon
                icon="pencil"
                size={25}
                onPress={() => this.onEditPress(habit)}
                containerStyle={styles.editIcon}
              />
              <Switch
                value={habit.enabled}
                onValueChange={() => this.handleHabitToggle(habit)}
              />
            </View>
          </View>
        ))}
        {!size(habits) && (
          <Button
            title="Install Default Habits"
            onPress={this.handleInstallDefaults}
          />
        )}
        <Button title="Add New..." onPress={this.onAddNewPress} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  habits: reduxHabits.getSortedHabits(state),
});

const mapDispatchToProps = dispatch => ({
  getData: () => {
    habitService.getHabits();
  },
  toggleHabit: habit => {
    habitService.toggleHabit(habit);
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    borderWidth: 1,
    borderColor: colorVariables.borderColor,
    borderRadius: colorVariables.borderRadius,
    padding: 15,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  switchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  editIcon: {
    marginRight: 15,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitSettings);
