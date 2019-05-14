import { createReducer, createAction, createSelector } from 'redux-starter-kit';
import sortBy from 'lodash/sortBy';

import metricService from '../services/metric';
import MetricInterface from '../types/metric';

export const getMetrics = createAction('GET_METRICS');
export const editMetric = createAction('EDIT_METRIC');
export const newMetric = createAction('NEW_METRIC');
export const deleteMetric = createAction('DELETE_METRIC');

export const getMetricsThunk = () => () => metricService.getMetrics();

export const updateMetric = (metric: MetricInterface) => () =>
  metricService.editMetric(metric);

export const newMetricThunk = (metric: MetricInterface) => () =>
  metricService.createMetric(metric);

export const deleteMetricThunk = (metric: MetricInterface) => () =>
  metricService.deleteMetric(metric);

interface State {
  [id: string]: MetricInterface;
}

const initialState = {};

const metricsReducer = createReducer(initialState, {
  [getMetrics]: (state: State, action) => {
    action.payload.metrics.forEach((metric: MetricInterface) => {
      state[metric.id] = metric;
    });
  },
  [editMetric]: (state, action) => {
    return { ...state, [action.payload.metric.id]: action.payload.metric };
  },
  [newMetric]: (state, { payload: { metric } }) => {
    return { ...state, [metric.id]: metric };
  },
  [deleteMetric]: (state, action) => {
    const id = action.payload.id;
    const newState = Object.assign({}, state);

    delete newState[id];

    return { ...newState };
  },
});

export const getSortedMetrics = createSelector(
  ['metrics'],
  (metrics: MetricInterface) => {
    return sortBy(Object.values(metrics), metric => metric.name.toLowerCase());
  }
);

export const getSortedEnabled = createSelector(
  [getSortedMetrics],
  (enabledMetrics: Array<MetricInterface>) => {
    return enabledMetrics.filter((metric: MetricInterface) => metric.enabled);
  }
);

export const getMetricsByHabit = (state, habitId: string) => {
  return Object.values(state.metrics || []).filter(
    metric => metric.habit === habitId
  );
  // return createSelector(
  //   ['metrics'],
  //   metrics => Object.values(metrics).filter(metric => metric.habit === habitId)
  // );
};

export default metricsReducer;
