import Realm from 'realm';

import Entry, { Weather } from './Entry';
import Mood from './Mood';

export default new Realm({ schema: [Weather, Entry, Mood] });
