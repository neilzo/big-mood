import { createReducer, createAction } from 'redux-starter-kit';
import uniqBy from 'lodash/uniqBy';
import findIndex from 'lodash/findIndex';

import metricProgressService from '../services/metricProgress';
import MetricProgressInterface from '../types/metricProgress';

export const getMetricProgresses = createAction(
  'GET_METRIC_PROGRESS_PROGRESSES'
);
export const editMetricProgress = createAction('EDIT_METRIC_PROGRESS');
export const newMetricProgress = createAction('NEW_METRIC_PROGRESS');
export const deleteMetricProgress = createAction('DELETE_METRIC_PROGRESS');

export const updateMetricProgress = (
  metricProgress: MetricProgressInterface
) => () => metricProgressService.editMetricProgress(metricProgress);

export const newMetricProgressThunk = (
  metricProgress: MetricProgressInterface
) => () => metricProgressService.createMetricProgress(metricProgress);

export const deleteMetricProgressThunk = (
  metricProgress: MetricProgressInterface
) => () => metricProgressService.deleteMetricProgress(metricProgress);

export const populateMetricProgressesThunk = ({ metricProgresses }) => (
  dispatch,
  getState
) => {
  const state = getState();
  const metrics = state.metrics;
  const progressToObjects = metricProgresses.map(progress => ({ ...progress }));

  dispatch(getMetricProgresses({ metrics, metricProgress: progressToObjects }));
};

interface State {
  [id: string]: Array<MetricProgressInterface>;
}

const initialState = {};

const metricProgressReducer = createReducer(initialState, {
  [getMetricProgresses]: (state: State, action) => {
    const newState = Object.assign({}, state);

    action.payload.metricProgress.forEach(
      (metricProgress: MetricProgressInterface) => {
        let day = newState[metricProgress.day];
        const metric = action.payload.metrics[metricProgress.metric];
        const enhancedMetricProgress = {
          ...metricProgress,
          metricName: metric.name,
          metricIcon: metric.icon,
        };

        if (!day) {
          newState[metricProgress.day] = [enhancedMetricProgress];
        } else {
          newState[metricProgress.day] = uniqBy(
            day.concat([enhancedMetricProgress]),
            progress => {
              return progress.id;
            }
          );
        }
      }
    );

    return newState;
  },
  [editMetricProgress]: (state, action) => {
    const metricProgress = action.payload.metricProgress;

    state[metricProgress.day] = metricProgress;
  },
  [newMetricProgress]: (state: State, action) => {
    const metricProgress = action.payload.metricProgress;

    state[metricProgress.day] = metricProgress;
  },
  [deleteMetricProgress]: (state: State, action) => {
    const dayId = action.payload.dayId;
    const metricProgressId = action.payload.metricProgressId;
    const day = state[dayId];
    const index = findIndex(
      day,
      metricProgress => metricProgress.id === metricProgressId
    );

    day.splice(index, 1);
  },
});

export default metricProgressReducer;
