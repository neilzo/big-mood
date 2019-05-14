import Realm, { schemaVersion } from 'realm';

import Entry, { Weather } from './Entry';
import Mood from './Mood';
import Day from './Day';
import Habit from './Habit';
import Metric from './Metric';
import HabitProgress from './HabitProgress';
import MetricProgress from './MetricProgress';

export default new Realm({
  schema: [
    Weather,
    Habit,
    HabitProgress,
    Metric,
    MetricProgress,
    Day,
    Entry,
    Mood,
  ],
  schemaVersion: 10,
  migration: (oldRealm, newRealm) => {
    const oldMetrics = oldRealm.objects('Metric');
    const newMetrics = newRealm.objects('Metric');

    for (let i = 0; i < oldMetrics.length; i++) {
      newMetrics[i].habit = '';
    }
  },
});
