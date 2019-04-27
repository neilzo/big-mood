import Realm, { schemaVersion } from 'realm';

import Entry, { Weather } from './Entry';
import Mood from './Mood';
import Day from './Day';
import Habit from './Habit';
import HabitProgress from './HabitProgress';

export default new Realm({
  schema: [Weather, Habit, HabitProgress, Day, Entry, Mood],
  schemaVersion: 4,
  migration: (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects('Day');
    const newObjects = newRealm.objects('Day');
    const oldHabits = oldRealm.objects('Habit');
    const newHabits = newRealm.objects('Habit');

    // loop through all objects and set the name property in the new schema
    for (let i = 0; i < oldObjects.length; i++) {
      delete newObjects[i].habits;
      newObjects[i].habitProgress = [];
    }

    for (let i = 0; i < oldHabits.length; i++) {
      newHabits[i].habitProgress = [];
    }
  }
});
