enum METRIC_TYPE {
  String = 'string',
  Number = 'number',
  Bool = 'bool',
  Time = 'time',
}

export const METRIC_TYPES = [
  METRIC_TYPE.String,
  METRIC_TYPE.Number,
  METRIC_TYPE.Bool,
  METRIC_TYPE.Time,
];

export default interface MetricInterface {
  id: string;
  name: string;
  description?: string;
  type: METRIC_TYPE;
  enabled: boolean;
  system: boolean;
  icon: string;
  createdAt: Date;
  createdBy?: string;
  modifiedAt: Date;
  modifiedBy?: string;
  deleted?: boolean;
  deletedAt: boolean;
}
