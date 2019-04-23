import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';

import moodService from '../../services/mood';
import { updateMood } from '../../state/mood';
import colorVariables from '../../components/colorVariables';

const RATINGS = [1, 2, 3, 4, 5];

interface Props {
  navigation: any;
}
interface State {
  id: string;
  moodName: string;
  icon: string;
  rating: number;
  isEditing: boolean;
}

const isDisabled = (state: State) => {
  return !state.icon || !state.moodName || !state.rating;
};

class MoodForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const mood = this.props.navigation.getParam('mood') || {};
    const { id, moodName, icon, rating } = mood;

    this.state = {
      id,
      moodName,
      icon,
      rating,
      isEditing: Boolean(id)
    };
  }

  handleNewMood = () => {
    const { moodName, icon, rating } = this.state;
    moodService.createMood({ moodName, icon, rating });
  };

  handleEditMood = () => {
    const { navigate } = this.props.navigation;
    const { id, moodName, icon, rating } = this.state;

    this.props.handleEditMood({ id, moodName, icon, rating });

    navigate('MoodSettings');
  };

  handleIconChange = (icon: string) => this.setState(() => ({ icon }));

  handleNameChange = (moodName: string) => this.setState(() => ({ moodName }));

  handleRatingChange = (rating: number) => this.setState(() => ({ rating }));

  renderNameInput = () => {
    const { moodName } = this.state;
    return (
      <View>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.handleNameChange}
          value={moodName}
        />
      </View>
    );
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
          title="Edit Save"
          onPress={this.handleEditMood}
          disabled={isDisabled(this.state)}
        />
      );

    return (
      <Button
        title="Save"
        onPress={this.handleNewMood}
        disabled={isDisabled(this.state)}
      />
    );
  };

  renderRatingInput = () => {
    const { rating } = this.state;
    return (
      <View style={styles.ratingWrap}>
        <Text>Rating:</Text>
        {RATINGS.map(ratingNum => (
          <TouchableHighlight
            key={`ratingInput-${ratingNum}`}
            onPress={() => this.handleRatingChange(ratingNum)}
          >
            <View style={styles.ratingInput}>
              <Text
                style={rating === ratingNum ? styles.selectedRating : undefined}
              >
                {ratingNum}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    );
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderNameInput()}
        {this.renderRatingInput()}
        {this.renderSaveButton()}
        {this.renderIconPicker()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    backgroundColor: colorVariables.white,
    borderColor: colorVariables.borderColor,
    borderWidth: 1,
    borderRadius: colorVariables.borderRadius,
    width: 300,
    height: 50,
    padding: 15
  },
  ratingWrap: {
    flexDirection: 'row'
  },
  ratingInput: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedRating: {
    fontWeight: 'bold',
    color: colorVariables.selected
  }
});

const mapDispatchToProps = dispatch => ({
  handleEditMood: mood => {
    dispatch(updateMood(mood));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(MoodForm);
