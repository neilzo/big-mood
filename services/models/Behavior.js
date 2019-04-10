import Realm from 'realm';

class Behavior extends Realm.Object {}
Behavior.schema = {
  name: 'Behavior',
  primaryKey: 'id',
  properties: {
    id: 'string',
    behaviorName: 'string',
    description: 'string?',
    enabled: 'bool',
    editable: 'bool',
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
