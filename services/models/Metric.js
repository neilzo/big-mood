import Realm from 'realm';

class Metric extends Realm.Object {}
Metric.schema = {
  name: 'Metric',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    description: 'string?',
    type: 'string',
    enabled: 'bool',
    system: 'bool',
    icon: 'string',
    createdAt: 'date',
    createdBy: 'string?',
    modifiedAt: 'date',
    modifiedBy: 'string?',
    deleted: 'bool?',
    deletedAt: 'date?',
    metricProgress: 'MetricProgress[]',
  },
};

export default Metric;
