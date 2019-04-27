import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';

import habitService from '../../services/habit';

import Checkbox from '../form/Checkbox/Checkbox';
import colorVariables from '../colorVariables';

interface Props {
  navigation: any;
  onHabitChange: (habitProgress) => void;
}
class HabitProgress extends Component<Props> {
  static defaultProps = {
    habitProgress: {}
  };

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getData();
  }

  handleHabitProgressChange = ({ habit, selected }) => {
    const { onHabitChange } = this.props;

    onHabitChange({ habit: habit.id, completed: selected });
  };

  render() {
    const { habits, habitProgress } = this.props;
    return (
      <View style={styles.container}>
        <Text>Did you accomplish any of your goals?</Text>
        {habits.map(habit => (
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
  },
  checkboxWrap: {
    marginLeft: 'auto'
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
