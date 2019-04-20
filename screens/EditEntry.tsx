import React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import EntryForm from '../components/EntryForm/EntryForm';
import entryService from '../services/entry';
import dateHelper from '../helpers/date';

interface Props {
  navigation: any;
}
export default class EditEntry extends Component<Props> {
  handleEditEntry = entry => {
    entryService.editEntry(entry);
    this.props.navigation.navigate('Details', { entry });
  };

  render() {
    const { navigation } = this.props;
    const entry = navigation.getParam('entry');
    return (
      <View style={styles.container}>
        <Text style={styles.dateHeader}>
          {dateHelper.getPrettyDate(entry.createdAt)}
        </Text>
        <EntryForm entry={entry} editEntry={this.handleEditEntry} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  dateHeader: {
    fontSize: 20,
    marginVertical: 10
  }
});
