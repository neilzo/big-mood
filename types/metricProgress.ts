export default interface MetricProgress {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  value: string;
  metric: string;
  habit: string;
  entry: string;
  day: string;
  createdAt: Date;
  modifiedAt: Date;
}
