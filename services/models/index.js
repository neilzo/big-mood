import Realm, { schemaVersion } from 'realm';

import Entry, { Weather } from './Entry';
import Mood from './Mood';
import Day from './Day';

export default new Realm({
  schema: [Weather, Day, Entry, Mood],
  schemaVersion: 1
});
