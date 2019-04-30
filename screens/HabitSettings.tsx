import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import habitService from '../services/habit';
import colorVariables from '../components/colorVariables';
import * as reduxHabits from '../redux/habit';

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

  // onEditPress = mood => {
  //   const { navigate } = this.props.navigation;
  //   navigate('MoodForm', { mood });
  // };

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
              <Switch
                value={habit.enabled}
                onValueChange={() => this.handleHabitToggle(habit)}
              />
            </View>
          </View>
        ))}
        {/* <Button
          title="Install Default Habits"
          onPress={this.handleInstallDefaults}
        /> */}
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
    marginLeft: 'auto',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitSettings);
