import uuid from 'uuid/v4';
import realm from './models/index';
import store from '../redux/store';
import HabitProgressInterface from '../types/habitProgress';
import * as reduxHabitProgress from '../redux/habitProgress';

const getHabitProgressById = (
  id: string
): HabitProgressInterface | undefined => {
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
      const habitProgresses: Array<HabitProgressInterface> = [];

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

        const habitProgress: HabitProgressInterface = realm.create(
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

const createHabitProgress = data => {};

const editHabitProgress = (opts: HabitProgressInterface) => {
  realm.write(() => {
    const now = new Date();
    const { id, habit: habitId, day, entry, completed } = opts;
    const habit: HabitProgressInterface | undefined = getHabitProgressById(id);

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
