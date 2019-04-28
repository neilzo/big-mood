import Realm, { schemaVersion } from 'realm';

import Entry, { Weather } from './Entry';
import Mood from './Mood';
import Day from './Day';
import Habit from './Habit';
import HabitProgress from './HabitProgress';

export default new Realm({
  schema: [Weather, Habit, HabitProgress, Day, Entry, Mood],
  schemaVersion: 5,
  migration: (oldRealm, newRealm) => {
    const oldHabits = oldRealm.objects('HabitProgress');
    const newHabits = newRealm.objects('HabitProgress');

    for (let i = 0; i < oldHabits.length; i++) {
      newHabits[i].entry = '';
    }
  }
});
