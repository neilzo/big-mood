import Realm from 'realm';

class Habit extends Realm.Object {}
Habit.schema = {
  name: 'Habit',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    description: 'string?',
    enabled: 'bool',
    system: 'bool',
    icon: 'string',
    polarity: 'int',
    createdAt: 'date',
    createdBy: 'string?',
    modifiedAt: 'date',
    modifiedBy: 'string?',
    deleted: 'bool?',
    deletedAt: 'date?'
  }
};

export default Habit;
