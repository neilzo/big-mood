import uuid from 'uuid/v4';
import realm from './models/index';

import defaultHabits from './models/defaultHabits';

import store from '../redux/store';
import HabitInterface from '../types/habit';
import MetricInterface from '../types/metric';
import * as reduxHabits from '../redux/habit';
import * as reduxMetrics from '../redux/metric';

const getHabitById = (id: string) => {
  return realm.objectForPrimaryKey('Habit', id);
};

const getHabits = () => {
  const habits = realm.objects('Habit');

  store.dispatch(reduxHabits.getHabits({ habits }));

  return habits;
};

const getEnabledHabits = () => {
  return realm.objects('Habit').filtered('enabled');
};

const createHabit = (opts: HabitInterface) => {
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

    const habit = realm.create('Habit', params);
    store.dispatch(reduxHabits.newHabit({ habit }));
  });
};

const editHabit = (opts: HabitInterface) => {
  realm.write(() => {
    const now = new Date();
    const { id, name, icon, polarity } = opts;
    const habit: HabitInterface = getHabitById(id);

    habit.name = name;
    habit.icon = icon;
    habit.polarity = polarity;
    habit.modifiedAt = now;

    store.dispatch(reduxHabits.editHabit({ habit }));
  });
};

const installDefaultHabits = () => {
  realm.write(() => {
    const now = Date();
    const habits: Array<HabitInterface> = [];

    defaultHabits.all.forEach((habit: HabitInterface) => {
      const metricsArr: Array<MetricInterface> = [];
      const { name, icon, polarity, system, metrics } = habit;

      const habitObj: HabitInterface = realm.create('Habit', {
        id: uuid(),
        name,
        icon,
        polarity,
        createdAt: now,
        modifiedAt: now,
        system,
        enabled: true,
      });

      metrics.forEach((metric: MetricInterface) => {
        const metricObj = realm.create('Metric', {
          id: uuid(),
          name: metric.name,
          type: metric.type,
          enabled: true,
          system: true,
          icon: metric.icon,
          habit: habitObj.id,
          createdAt: now,
          modifiedAt: now,
        });

        metricsArr.push(metricObj);

        store.dispatch(reduxMetrics.getMetrics({ metrics: metricsArr }));
      });

      habitObj.metrics = metricsArr;

      habits.push(habitObj);
    });

    store.dispatch(reduxHabits.getHabits({ habits }));
  });
};

const deleteHabit = (habit: HabitInterface) => {
  realm.write(() => {
    const id = habit.id;
    realm.delete(habit);
    store.dispatch(reduxHabits.deleteHabit({ id }));
  });
};

const toggleHabit = (habit: HabitInterface) => {
  realm.write(() => {
    const habitObj: HabitInterface = getHabitById(habit.id);

    habitObj.enabled = !habit.enabled;

    store.dispatch(reduxHabits.editHabit({ habit: habitObj }));
  });
};

export default {
  createHabit,
  getHabits,
  installDefaultHabits,
  editHabit,
  deleteHabit,
  toggleHabit,
};
