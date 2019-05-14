import uuid from 'uuid/v4';
import realm from './models/index';
import store from '../redux/store';
import MetricInterface from '../types/metric';
import * as reduxMetrics from '../redux/metric';

const getMetricById = (id: string) => {
  return realm.objectForPrimaryKey('Metric', id);
};

const getMetrics = () => {
  const metrics = realm.objects('Metric');

  store.dispatch(reduxMetrics.getMetrics({ metrics }));

  return metrics;
};

const getEnabledMetrics = () => {
  return realm.objects('Metric').filtered('enabled');
};

const createMetric = (opts: MetricInterface) => {
  realm.write(() => {
    const now = new Date();
    const { name, icon, polarity } = opts;
    const params = {
      id: uuid(),
      name,
      icon,
      polarity,
      createdAt: now,
      modifiedAt: now,
      system: false,
      enabled: true,
    };

    const metric = realm.create('Metric', params);
    store.dispatch(reduxMetrics.newMetric({ metric }));
  });
};

const editMetric = (opts: MetricInterface) => {
  realm.write(() => {
    const now = new Date();
    const { id, name, icon, polarity } = opts;
    const metric: MetricInterface = getMetricById(id);

    metric.name = name;
    metric.icon = icon;
    metric.polarity = polarity;
    metric.modifiedAt = now;

    store.dispatch(reduxMetrics.editMetric({ metric }));
  });
};

const deleteMetric = (metric: MetricInterface) => {
  realm.write(() => {
    const id = metric.id;
    realm.delete(metric);
    store.dispatch(reduxMetrics.deleteMetric({ id }));
  });
};

const toggleMetric = (metric: MetricInterface) => {
  realm.write(() => {
    const metricObj: MetricInterface = getMetricById(metric.id);

    metricObj.enabled = !metric.enabled;

    store.dispatch(reduxMetrics.editMetric({ metric: metricObj }));
  });
};

export default {
  createMetric,
  getMetrics,
  editMetric,
  deleteMetric,
  toggleMetric,
};
