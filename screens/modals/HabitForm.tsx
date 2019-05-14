import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';
import uuid from 'uuid/v4';
import get from 'lodash/get';

import HabitInterface from '../../types/habit';
import MetricInterface, { METRIC_TYPES } from '../../types/metric';
import * as reduxHabits from '../../redux/habit';
import * as reduxMetrics from '../../redux/metric';
import colorVariables from '../../components/colorVariables';
import FormWizard from '../../components/form/FormWizard/FormWizard';
import Input from '../../components/form/Input/Input';
import Icon from '../../components/Icon/Icon';
import Select from '../../components/form/Select/Select';

const POLARITIES = [-1, 0, 1];
const TYPE_OPTIONS = METRIC_TYPES.map(type => ({
  label: type,
  value: type,
}));

interface Metric {
  id: string;
  name: string;
  type: string;
}
interface Props {
  navigation: any;
  habit: HabitInterface;
  metrics: Array<MetricInterface>;
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
  handleEditHabit: (habit: {
    id: string;
    icon: string;
    name: string;
    polarity: number;
  }) => void;
  handleDeleteHabit: (habit: HabitInterface) => void;
}
interface State {
  id: string;
  name: string;
  icon: string;
  polarity: number;
  system: boolean;
  isEditing: boolean;
  metrics: {
    [id: string]: Metric;
  };
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
      id,
      name,
      icon,
      polarity,
      system,
      isEditing: Boolean(id),
      metrics: {},
    };
  }

  componentDidMount() {
    this.props.getMetrics();
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
    const { handleDeleteHabit, navigation, habit } = this.props;
    const { navigate } = navigation;

    handleDeleteHabit(habit);
    navigate('HabitSettings');
  };

  handleNewMetric = () => {
    const id: string = uuid();
    this.setState(prevState => ({
      metrics: {
        ...prevState.metrics,
        [id]: { id, name: '', type: '' },
      },
    }));
  };

  handleIconChange = (icon: string) => this.setState(() => ({ icon }));

  handleNameChange = (name: string) => this.setState(() => ({ name }));

  handlePolarityChange = (polarity: number) =>
    this.setState(() => ({ polarity }));

  handleMetricTypeChange = (id: string, type: string) =>
    this.setState(prevState => ({
      metrics: {
        ...prevState.metrics,
        [id]: {
          ...prevState.metrics[id],
          type,
        },
      },
    }));

  handleMetricNameChange = (id: string, name: string) =>
    this.setState(prevState => ({
      metrics: {
        ...prevState.metrics,
        [id]: {
          ...prevState.metrics[id],
          name,
        },
      },
    }));

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
        {this.renderIconPicker()}
      </View>
    );
  };

  renderMetrics = () => {
    const { metrics } = this.state;
    const combined = Object.values(metrics).concat(this.props.metrics);

    const metricItems = combined.map(metric => (
      <View key={`${metric.id}`} style={styles.metricItem}>
        <Input
          label="Name"
          onChange={text => this.handleMetricNameChange(metric.id, text)}
          value={metric.name}
        />
        <Select
          metricId={metric.id}
          label="Type"
          options={TYPE_OPTIONS}
          onChange={this.handleMetricTypeChange}
          value={metric.type}
        />
      </View>
    ));

    return (
      <View style={styles.metricWrap}>
        {metricItems}
        <TouchableWithoutFeedback onPress={this.handleNewMetric}>
          <View style={styles.addMetricInput}>
            <Icon name="plus" size={25} />
            <Text>Add new metric</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  renderMetricsStep = () => {
    return this.renderMetrics();
  };

  render() {
    return (
      <View style={styles.container}>
        <FormWizard
          step={1}
          deleteButton={this.renderDelete()}
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
  addMetricInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricWrap: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  metricItemWrap: {},
  metricItem: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colorVariables.borderColor,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
});

const mapStateToProps = (state, props: Props) => {
  const habitId = props.navigation.getParam('habitId');
  const habit = state.habits[habitId];
  const metrics = reduxMetrics.getMetricsByHabit(state, habitId);

  return {
    habit,
    metrics,
  };
};

const mapDispatchToProps = dispatch => ({
  handleEditHabit: (habit: HabitInterface) => {
    dispatch(reduxHabits.updateHabit(habit));
  },
  handleNewHabit: (habit: HabitInterface) => {
    dispatch(reduxHabits.newHabitThunk(habit));
  },
  handleDeleteHabit: (habit: HabitInterface) =>
    dispatch(reduxHabits.deleteHabitThunk(habit)),
  getMetrics: () => dispatch(reduxMetrics.getMetricsThunk()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitForm);
