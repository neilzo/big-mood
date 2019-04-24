import Realm from 'realm';

class Behavior extends Realm.Object {}
Behavior.schema = {
  name: 'Behavior',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    description: 'string?',
    completed: 'bool?',
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

export default Behavior;
