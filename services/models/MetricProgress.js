import Realm from 'realm';

class MetricProgress extends Realm.Object {}
MetricProgress.schema = {
  name: 'MetricProgress',
  primaryKey: 'id',
  properties: {
    id: 'string',
    type: 'string',
    value: 'string?',
    metric: 'string',
    habit: 'string',
    entry: 'string',
    day: 'string',
    createdAt: 'date',
    modifiedAt: 'date',
  },
};

export default MetricProgress;
