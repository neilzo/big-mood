import Realm from 'realm';

class Entry extends Realm.Object {}
Entry.schema = {
  name: 'Entry',
  primaryKey: 'id',
  properties: {
    id: 'string',
    mood: { type: 'Mood' },
    note: 'string',
    // weather: {
    //   description: 'string?',
    //   icon: 'string?',
    //   temperature: 'int?'
    // },
    createdAt: 'date',
    modifiedAt: 'date'
  }
};

export default Entry;
