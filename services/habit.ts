import uuid from 'uuidv4';
import realm from './models/index';
import defaultHabits from './models/defaultHabits';
import store from '../redux/store';
import HabitInterface from '../types/habit';
import * as reduxHabits from '../redux/habit';

const getHabitById = (id: string) => {
  return realm.objectForPrimaryKey('Habit', id);
};

const getHabits = () => {
  return realm.objects('Habit').sorted('rating');
};

const getEnabledHabits = () => {
  return realm
    .objects('Habit')
    .filtered('enabled')
    .sorted('rating');
};

const createHabit = opts => {
  realm.write(() => {
    const now = new Date();
    const { name, icon, rating } = opts;
    const params = {
      id: uuid(),
      name,
      icon,
      rating,
      createdAt: now,
      modifiedAt: now,
      system: false,
      enabled: true
    };

    const habit = realm.create('Habit', params);
    store.dispatch(reduxHabits.newHabit({ habit }));
  });
};

const editHabit = opts => {
  realm.write(() => {
    const now = new Date();
    const { id, habitName, icon, rating } = opts;
    const habit: HabitInterface = getHabitById(id);

    habit.habitName = habitName;
    habit.icon = icon;
    habit.rating = rating;
    habit.modifiedAt = now;

    store.dispatch(reduxHabits.editHabit({ habit }));
  });
};

const installDefaultHabits = () => {
  realm.write(() => {
    const now = Date();
    defaultHabits.all.forEach(habit => {
      const { habitName, icon, rating } = habit;
      realm.create('Habit', {
        id: uuid(),
        habitName,
        icon,
        rating,
        createdAt: now,
        modifiedAt: now
      });
    });
  });
};

const deleteHabit = (habit: HabitInterface) => {
  realm.write(() => {
    const id = habit.id;
    realm.delete(habit);
    store.dispatch(reduxHabits.deleteHabit({ id }));
  });
};

export default {
  createHabit,
  getHabits,
  installDefaultHabits,
  editHabit,
  deleteHabit
};
