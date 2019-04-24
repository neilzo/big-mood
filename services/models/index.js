import Realm, { schemaVersion } from 'realm';

import Entry, { Weather } from './Entry';
import Mood from './Mood';
import Day from './Day';
import Habit from './Habit';

export default new Realm({
  schema: [Weather, Habit, Day, Entry, Mood],
  schemaVersion: 3
  // migration: (oldRealm, newRealm) => {
  //   const oldObjects = oldRealm.objects('Habit');
  //   const newObjects = newRealm.objects('Habit');

  //   // loop through all objects and set the name property in the new schema
  //   for (let i = 0; i < oldObjects.length; i++) {
  //     delete newObjects[i].completed;
  //   }
  // }
});
