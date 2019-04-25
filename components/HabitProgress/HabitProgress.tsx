import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';

import habitService from '../../services/habit';

import colorVariables from '../colorVariables';

interface Props {
  navigation: any;
}
class HabitProgress extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getData();
  }

  render() {
    const { habits } = this.props;
    return (
      <View style={styles.container}>
        {habits.map(habit => (
          <View key={habit.id} style={styles.item}>
            <Text>{habit.icon}</Text>
            <Text>{habit.name}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center'
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
    shadowRadius: 1.5
  }
});

const mapStateToProps = state => ({
  habits: Object.values(state.habits)
});

const mapDispatchToProps = dispatch => ({
  getData: () => {
    habitService.getHabits();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitProgress);
