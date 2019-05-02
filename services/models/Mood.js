import Realm from 'realm';

class Mood extends Realm.Object {}
Mood.schema = {
  name: 'Mood',
  primaryKey: 'id',
  properties: {
    id: 'string',
    moodName: 'string',
    description: 'string?',
    icon: 'string',
    rating: 'int',
    createdAt: 'date',
    modifiedAt: 'date',
    enabled: 'bool',
    system: 'bool',
    deleted: 'bool?',
    deletedAt: 'date?',
  },
};

export default Mood;
