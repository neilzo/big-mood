import uuid from 'uuid/v4';
import realm from './models/index';
import store from '../redux/store';
import MetricProgressInterface from '../types/metricProgress';
import * as reduxMetricProgress from '../redux/metricProgress';

const getMetricProgressById = (id: string) => {
  return realm.objectForPrimaryKey('MetricProgress', id);
};

const getMetricProgress = () => {
  const metricProgresses = realm.objects('MetricProgress');

  store.dispatch(
    reduxMetricProgress.populateMetricProgressesThunk({ metricProgresses })
  );

  return metricProgresses;
};

export const createMetricProgresses = async (newObjects = []) => {
  return new Promise(resolve => {
    realm.write(() => {
      const now = new Date();
      const metricProgresses: Array<MetricProgressInterface> = [];

      newObjects.forEach(progress => {
        const { habit, metric, day, entry, name, type, value } = progress;

        const params = {
          id: uuid(),
          name,
          type,
          value,
          metric,
          day,
          entry,
          habit,
          createdAt: now,
          modifiedAt: now,
        };

        const metricProgress: MetricProgressInterface = realm.create(
          'MetricProgress',
          params
        );
        metricProgresses.push(metricProgress);
      });

      store.dispatch(
        reduxMetricProgress.populateMetricProgressesThunk({ metricProgresses })
      );

      resolve(metricProgresses);
    });
  });
};

// const editMetricProgress = (opts: MetricProgressInterface) => {
//   realm.write(() => {
//     const now = new Date();
//     const { id, name, icon, polarity } = opts;
//     const metric: MetricProgressInterface = getMetricProgressById(id);

//     metric.name = name;
//     metric.icon = icon;
//     metric.polarity = polarity;
//     metric.modifiedAt = now;

//     store.dispatch(reduxMetricProgress.editMetricProgress({ metric }));
//   });
// };

// const deleteMetricProgress = (metric: MetricProgressInterface) => {
//   realm.write(() => {
//     const id = metric.id;
//     realm.delete(metric);
//     store.dispatch(reduxMetricProgress.deleteMetricProgress({ id }));
//   });
// };

export default {
  createMetricProgresses,
  getMetricProgress,
  // editMetricProgress,
  // deleteMetricProgress
};
