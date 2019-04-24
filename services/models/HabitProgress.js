import Realm from 'realm';

class HabitProgress extends Realm.Object {}
HabitProgress.schema = {
  name: 'HabitProgress',
  primaryKey: 'id',
  properties: {
    id: 'string',
    completed: 'bool?',
    habit: 'string',
    day: 'string'
  }
};

export default HabitProgress;
