import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SettingItem from '../components/SettingItem/SettingItem';

interface Props {
  navigation: any;
}
export default class Settings extends Component<Props> {
  handleSettingPress = () => {
    const { navigate } = this.props.navigation;
    navigate('MoodSettings');
  };

  render() {
    return (
      <View style={styles.container}>
        <SettingItem
          title="Edit Moods"
          icon="😀"
          onPress={this.handleSettingPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    //justifyContent: 'center',
    alignItems: 'center'
  }
});
