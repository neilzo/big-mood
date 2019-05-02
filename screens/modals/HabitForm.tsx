import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';

import HabitInterface from '../../types/habit';
import * as reduxHabits from '../../redux/habit';
import colorVariables from '../../components/colorVariables';
import FormWizard from '../../components/form/FormWizard/FormWizard';
import Input from '../../components/form/Input/Input';

const POLARITIES = [-1, 0, 1];

interface Props {
  navigation: any;
  habit?: HabitInterface;
  handleNewHabit: ({
    name,
    icon,
    polarity,
    metrics,
  }: {
    name: string;
    icon: string;
    polarity: number;
    metrics: object;
  }) => void;
  handleDeleteHabit: (habit) => void;
}
interface State {
  step: number;
  id: string;
  name: string;
  icon: string;
  polarity: number;
  system: boolean;
  isEditing: boolean;
  metrics?: object;
}

const isDisabled = (state: State) => {
  return !state.icon || !state.name || !state.polarity;
};

class HabitForm extends Component<Props, State> {
  static defaultProps = {
    habit: {},
  };

  constructor(props: Props) {
    super(props);
    const { id, name, icon, polarity, system, metrics } = props.habit;

    this.state = {
      step: 0,
      id,
      name,
      icon,
      polarity,
      system,
      isEditing: Boolean(id),
      metrics,
    };
  }

  handleNewHabit = () => {
    const { navigate } = this.props.navigation;
    const { name, icon, polarity, metrics } = this.state;

    this.props.handleNewHabit({ name, icon, polarity, metrics });

    navigate('HabitSettings');
  };

  handleEditHabit = () => {
    const { navigate } = this.props.navigation;
    const { id, name, icon, polarity } = this.state;

    this.props.handleEditHabit({ id, name, icon, polarity });

    navigate('HabitSettings');
  };

  handleDeleteHabit = () => {
    const { deleteHabit, navigation, habit } = this.props;
    const { navigate } = navigation;

    deleteHabit(habit);
    navigate('HabitSettings');
  };

  handleIconChange = (icon: string) => this.setState(() => ({ icon }));

  handleNameChange = (name: string) => this.setState(() => ({ name }));

  handlePolarityChange = (polarity: number) =>
    this.setState(() => ({ polarity }));

  handleStepChange = (step: number) => this.setState(() => ({ step }));

  renderNameInput = () => {
    const { name } = this.state;
    return <Input label="Name" onChange={this.handleNameChange} value={name} />;
  };

  renderIconPicker = () => (
    <View>
      <Text>Icon:</Text>
      <Text style={{ fontSize: 64, backgroundColor: 'transparent' }}>
        {this.state.icon}
      </Text>
      <EmojiSelector onEmojiSelected={this.handleIconChange} />
    </View>
  );

  renderSaveButton = () => {
    const { isEditing } = this.state;

    if (isEditing)
      return (
        <Button
          title="Save"
          onPress={this.handleEditHabit}
          disabled={isDisabled(this.state)}
        />
      );

    return (
      <Button
        title="Save"
        onPress={this.handleNewHabit}
        disabled={isDisabled(this.state)}
      />
    );
  };

  renderDelete = () => {
    const { isEditing, system } = this.state;

    if (!isEditing || system) return null;

    return (
      <Button
        title="Delete"
        onPress={this.handleDeleteHabit}
        disabled={isDisabled(this.state)}
      />
    );
  };

  renderPolarityInput = () => {
    const { polarity: polaritySelected } = this.state;
    return (
      <View style={styles.polarityWrap}>
        <Text>Rating:</Text>
        {POLARITIES.map(polarity => (
          <TouchableHighlight
            key={`polarityInput-${polarity}`}
            onPress={() => this.handlePolarityChange(polarity)}
          >
            <View style={styles.polarityInput}>
              <Text
                style={
                  polarity === polaritySelected
                    ? styles.selectedRating
                    : undefined
                }
              >
                {polarity}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    );
  };

  renderInitialStep = () => {
    return (
      <View>
        {this.renderNameInput()}
        {this.renderPolarityInput()}
        {this.renderSaveButton()}
        {this.renderDelete()}
        {this.renderIconPicker()}
      </View>
    );
  };

  renderMetricsStep = () => {
    return (
      <View>
        <Text>step 2 for metric config</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FormWizard
          saveButton={this.renderSaveButton()}
          steps={[this.renderInitialStep(), this.renderMetricsStep()]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  polarityWrap: {
    flexDirection: 'row',
  },
  polarityInput: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRating: {
    fontWeight: 'bold',
    color: colorVariables.selected,
  },
});

const mapStateToProps = (state, props) => {
  const habitId = props.navigation.getParam('habitId');
  const habit = state.habits[habitId];

  return {
    habit,
  };
};

const mapDispatchToProps = dispatch => ({
  handleEditHabit: habit => {
    dispatch(reduxHabits.updateHabit(habit));
  },
  handleNewHabit: habit => {
    dispatch(reduxHabits.newHabitThunk(habit));
  },
  deleteHabit: habit => dispatch(reduxHabits.deleteHabitThunk(habit)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitForm);
