import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import moodService from '../../services/mood';
import { getMoods } from '../../state/mood';

// TODO move this somewhere central
interface Mood {
  moodName: string;
  icon: string;
  rating: number;
}

interface Props {
  moods: Array<Mood>;
  getData: () => void;
  onMoodPress: (mood: object) => void;
  selectedMood: object;
}
interface State {
  selectedMood: Mood;
}
class MoodList extends Component<Props, State> {
  componentDidMount() {
    this.props.getData();
  }

  _keyExtractor = item => item.id;

  installDefaultMoods = () => {
    moodService.installDefaultMoods();
  };

  renderRow = (item: Mood) => {
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

  renderMoods = () => {
    return (
      <View style={styles.list}>{this.props.moods.map(this.renderRow)}</View>
    );
  };

  renderGrouped = () => {};

  render() {
    return (
      <View style={styles.container}>
        {/* <Button
          title="Install Default Moods"
          onPress={this.installDefaultMoods}
        /> */}
        {this.renderMoods()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginVertical: 10
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  selected: {
    color: 'red'
  },
  notSelected: {}
});

const mapStateToProps = state => {
  const { moods } = state;
  return { moods: Object.values(moods) };
};

const mapDispatchToProps = dispatch => ({
  getData: () => {
    const moods = moodService.getMoods();
    dispatch(getMoods({ moods }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoodList);
