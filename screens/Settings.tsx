import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SettingItem from '../components/SettingItem/SettingItem';
import { Routes } from '../Navigator';

interface Props {
  navigation: any;
}
export default class Settings extends Component<Props> {
  handleSettingPress = (settingRoute: string) => {
    const { navigate } = this.props.navigation;
    navigate(settingRoute);
  };

  render() {
    return (
      <View style={styles.container}>
        <SettingItem
          settingRoute={Routes.MoodSettings.key}
          title="Edit Moods"
          icon="😀"
          onPress={this.handleSettingPress}
        />
        <SettingItem
          settingRoute={Routes.HabitSettings.key}
          title="Edit Habits"
          icon="🥅"
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
    alignItems: 'center',
  },
});
