import Realm from 'realm';

import Entry from './Entry';
import Mood from './Mood';

export default new Realm({ schema: [Entry, Mood] });
