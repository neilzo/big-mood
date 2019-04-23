import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import moodService from '../../services/mood';
import { getMoods } from '../../redux/mood';
import MoodInterface from '../../types/mood';

interface Props {
  moods: Array<MoodInterface>;
  getData: () => void;
  onMoodPress: (mood: object) => void;
  selectedMood: MoodInterface;
}
interface State {
  selectedMood: MoodInterface;
}
class MoodList extends Component<Props, State> {
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
