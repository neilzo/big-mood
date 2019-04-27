import uuid from 'uuid/v4';
import realm from './models/index';
import store from '../redux/store';
import HabitProgressInterface from '../types/habit';
import * as reduxHabitProgressProgress from '../redux/habit';

const getHabitProgressById = (id: string) => {
  return realm.objectForPrimaryKey('HabitProgress', id);
};

const getHabitProgress = () => {
  const habits = realm.objects('HabitProgress');
  store.dispatch(reduxHabitProgressProgress.getHabitProgress({ habits }));

  return habits;
};

const createHabitProgress = opts => {
  realm.write(() => {
    const now = new Date();
    const { completed } = opts;

    // need day/habit parents
    const params = {
      id: uuid(),
      completed,
      createdAt: now,
      modifiedAt: now
    };

    const habit = realm.create('HabitProgress', params);
    store.dispatch(reduxHabitProgressProgress.newHabitProgress({ habit }));
  });
};

// const editHabitProgress = (opts: HabitProgressInterface) => {
//   realm.write(() => {
//     const now = new Date();
//     const { id, name, icon, polarity } = opts;
//     const habit: HabitProgressInterface = getHabitProgressById(id);

//     habit.name = name;
//     habit.icon = icon;
//     habit.polarity = polarity;
//     habit.modifiedAt = now;

//     store.dispatch(reduxHabitProgressProgress.editHabitProgress({ habit }));
//   });
// };

// const deleteHabitProgress = (habit: HabitProgressInterface) => {
//   realm.write(() => {
//     const id = habit.id;
//     realm.delete(habit);
//     store.dispatch(reduxHabitProgressProgress.deleteHabitProgress({ id }));
//   });
// };

export default {
  createHabitProgress
  // editHabitProgress,
  // deleteHabitProgress
};
