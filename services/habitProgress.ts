import uuid from 'uuid/v4';
import realm from './models/index';
import store from '../redux/store';
import HabitProgressInterface from '../types/habitProgress';
import HabitProgressModel from './models/HabitProgress';
import * as reduxHabitProgress from '../redux/habitProgress';

const getHabitProgressById = (
  id: string
): HabitProgressModel.schema | undefined => {
  return realm.objectForPrimaryKey('HabitProgress', id);
};

const getHabitProgress = () => {
  const habitProgresses = realm.objects('HabitProgress');

  store.dispatch(
    reduxHabitProgress.populateHabitProgressesThunk({ habitProgresses })
  );

  return habitProgresses;
};

export const createHabitProgresses = async (newObjects = []) => {
  return new Promise(resolve => {
    realm.write(() => {
      const now = new Date();
      const habitProgresses: Array<Realm.Object> = [];

      newObjects.forEach(progress => {
        const { completed, habit, day, entry } = progress;

        const params = {
          id: uuid(),
          habit,
          day,
          entry,
          completed,
          createdAt: now,
          modifiedAt: now,
        };

        const habitProgress: HabitProgressModel.schema = realm.create(
          'HabitProgress',
          params
        );
        habitProgresses.push(habitProgress);
      });

      store.dispatch(
        reduxHabitProgress.populateHabitProgressesThunk({ habitProgresses })
      );

      resolve(habitProgresses);
    });
  });
};

const createHabitProgress = (data: HabitProgressInterface) => {};

const editHabitProgress = (opts: HabitProgressInterface) => {
  realm.write(() => {
    const now = new Date();
    const { id, habit: habitId, day, entry, completed } = opts;
    const habit = getHabitProgressById(id);

    if (!habit) return; // todo throw error on failed lookup

    habit.day = day;
    habit.entry = entry;
    habit.habit = habitId;
    habit.completed = completed;
    habit.modifiedAt = now;

    store.dispatch(reduxHabitProgress.editHabitProgress({ habit }));
  });
};

const deleteHabitProgress = (habit: HabitProgressInterface) => {
  realm.write(() => {
    const id = habit.id;
    realm.delete(habit);
    store.dispatch(reduxHabitProgress.deleteHabitProgress({ id }));
  });
};

export default {
  createHabitProgress,
  createHabitProgresses,
  getHabitProgress,
  editHabitProgress,
  deleteHabitProgress,
};
