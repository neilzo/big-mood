import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import habitService from '../services/habit';

interface Props {
  navigation: any;
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

  render() {
    const { habits } = this.props;
    return (
      <View style={styles.container}>
        {habits.map(habit => (
          <View key={habit.id}>
            <Text>{habit.icon}</Text>
            <Text>{habit.name}</Text>
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
  habits: Object.values(state.habits)
});

const mapDispatchToProps = dispatch => ({
  getData: () => {
    habitService.getHabits();
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitSettings);
