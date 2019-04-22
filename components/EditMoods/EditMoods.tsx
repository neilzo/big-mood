import React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight
} from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';
import colorVariables from '../colorVariables';

const RATINGS = [1, 2, 3, 4, 5];

interface Props {}
interface State {
  name: string;
  icon: string;
  rating: number;
}
export default class EditMoods extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { name, icon, rating } = this.props;

    this.state = {
      name,
      icon,
      rating
    };
  }

  handleSave = () => {};

  handleIconChange = (icon: string) => this.setState(() => ({ icon }));

  handleNameChange = (name: string) => this.setState(() => ({ name }));

  handleRatingChange = (rating: number) => this.setState(() => ({ rating }));

  renderNameInput = () => (
    <View>
      <Text>Name:</Text>
      <TextInput style={styles.input} onChangeText={this.handleNameChange} />
    </View>
  );

  renderIconPicker = () => (
    <View>
      <Text>Icon:</Text>
      <Text style={{ fontSize: 64, backgroundColor: 'transparent' }}>
        {this.state.icon}
      </Text>
      <EmojiSelector onEmojiSelected={this.handleIconChange} />
    </View>
  );

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
      <View style={styles.container}>
        {this.renderNameInput()}
        {this.renderRatingInput()}
        {this.renderIconPicker()}
        <Button title="Save" onPress={this.handleSave} />
      </View>
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
