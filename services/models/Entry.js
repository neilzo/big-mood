import Realm from 'realm';

export class Weather extends Realm.Object {}
Weather.schema = {
  name: 'Weather',
  properties: {
    description: 'string?',
    icon: 'string?',
    temperature: 'int?'
  }
};

class Entry extends Realm.Object {}
Entry.schema = {
  name: 'Entry',
  primaryKey: 'id',
  properties: {
    id: 'string',
    mood: { type: 'Mood' },
    note: 'string',
    weather: { type: 'Weather' },
    createdAt: 'date',
    modifiedAt: 'date'
  }
};

export default Entry;
