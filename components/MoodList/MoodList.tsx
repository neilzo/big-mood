import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from 'react-native';
import groupedBy from 'lodash/groupBy';
import size from 'lodash/size';

import moodService from '../../services/mood';
import { getMoods } from '../../redux/mood';
import MoodInterface from '../../types/mood';
import colorVariables from '../colorVariables';

interface Props {
  moods: Array<MoodInterface>;
  getData: () => void;
  onMoodPress: (mood: object) => void;
  selectedMood: MoodInterface;
  grouped: boolean;
}
interface State {
  selectedMood: MoodInterface;
}
class MoodList extends Component<Props, State> {
  static defaultProps = {
    grouped: false,
    moods: [],
  };

  componentDidMount() {
    this.props.getData();
  }

  installDefaultMoods = () => {
    moodService.installDefaultMoods();
  };

  renderRow = (item: MoodInterface) => {
    const selectedStyles =
      this.props.selectedMood &&
      item.moodName === this.props.selectedMood.moodName
        ? styles.selected
        : styles.notSelected;

    return (
      <TouchableHighlight
        key={item.id}
        onPress={() => this.props.onMoodPress(item)}
      >
        <View key={item.id} style={styles.listItem}>
          <Text style={selectedStyles}>{item.icon}</Text>
          <Text style={selectedStyles}>{item.moodName}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  renderGrouped = () => {
    const { moods } = this.props;
    const ratingsGrouped = groupedBy(moods, mood => mood.rating);

    // todo: make this more performant
    return Object.keys(ratingsGrouped)
      .map(ratingKey => (
        <View key={`rating-${ratingKey}`} style={styles.groupedWrap}>
          {ratingsGrouped[ratingKey].map(mood => (
            <TouchableHighlight
              key={mood.id}
              onPress={() => this.props.onMoodPress(mood)}
              style={styles.groupedTouchWrap}
            >
              <View key={mood.id} style={styles.groupedItem}>
                <Text>{mood.icon}</Text>
                <Text>{mood.moodName}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      ))
      .reverse();
  };

  renderMoods = () => {
    const { grouped, moods } = this.props;

    if (!size(moods)) return null;

    if (grouped) return this.renderGrouped();

    return <View style={styles.list}>{moods.map(this.renderRow)}</View>;
  };

  render() {
    const { moods } = this.props;
    return (
      <View style={styles.container}>
        {!size(moods) && (
          <Button
            title="Install Default Moods"
            onPress={this.installDefaultMoods}
          />
        )}
        {this.renderMoods()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'stretch',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  selected: {
    color: colorVariables.selected,
    fontWeight: 'bold',
  },
  notSelected: {},
  groupedTouchWrap: {
    alignSelf: 'stretch',
  },
  groupedWrap: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: colorVariables.borderColor,
  },
  groupedItem: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: colorVariables.borderColor,
    backgroundColor: colorVariables.white,
    padding: 10,
  },
});

const mapStateToProps = state => {
  const { moods } = state;
  return { moods: Object.values(moods) };
};

const mapDispatchToProps = dispatch => ({
  getData: () => {
    const moods = moodService.getMoods();
    dispatch(getMoods({ moods }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoodList);
