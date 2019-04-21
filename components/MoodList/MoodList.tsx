import React from 'react';
import { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import mood from '../../services/mood';

interface Props {
  onMoodPress: (mood: object) => void;
  selectedMood: object;
}
export default class MoodList extends Component<Props> {
  constructor(props: Props) {
    super(props);
    const moods = mood.getMoods();

    this.state = {
      moods
    };
  }

  _keyExtractor = item => item.id;

  installDefaultMoods = () => {
    mood.installDefaultMoods();
    this.updateDataSource();
  };

  updateDataSource = (props = this.props) => {
    this.setState(() => ({
      moods: mood.getMoods()
    }));
  };

  renderRow = item => {
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
      <View style={styles.list}>{this.state.moods.map(this.renderRow)}</View>
    );
  };

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
