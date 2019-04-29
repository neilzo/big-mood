import uuid from 'uuid/v4';
import moment from 'moment';
import realm from './models/index';
import { createHabitProgresses } from './habitProgress';
import store from '../redux/store';

import * as reduxDays from '../redux/day';
import DayInterface from '../types/day';
import EntryInterface from '../types/entry';
import HabitProgressInterface from '../types/habitProgress';

const getDayById = (id: string) => {
  return realm.objectForPrimaryKey('Day', id);
};

const getDayByEntry = (entryCreatedAt: Date) => {
  const days = realm.objects('Day');
  return days.filter((day: DayInterface) => {
    return moment(day.createdAt).isSame(entryCreatedAt, 'day');
  })[0];
};

const getCurrentDay = () => {
  const yesterday = moment()
    .endOf('day')
    .subtract(1, 'day')
    .toString();
  const tomorrow = moment()
    .startOf('day')
    .add(1, 'day')
    .toString();
  return realm
    .objects('Day')
    .filtered('createdAt > $0 && createdAt < $1', yesterday, tomorrow)[0];
};

const getDays = () => {
  return realm.objects('Day');
};

const createDayWithEntry = ({ entry }: { entry: object }) => {
  return new Promise(resolve => {
    realm.write(() => {
      const now = new Date();
      const params = {
        id: uuid(),
        entries: [entry],
        habitProgress: [],
        createdAt: now,
        modifiedAt: now,
      };

      const day = realm.create('Day', params);

      resolve(day);
    });
  });
};

const addHabitProgressToDay = async ({ habitProgress, day, entry }) => {
  const habitsWithDay = habitProgress.map(habit => {
    return { ...habit, day: day.id, entry: entry.id };
  });

  const habitProgressObj = await createHabitProgresses(habitsWithDay);

  realm.write(() => {
    habitProgressObj.forEach(progress => day.habitProgress.push(progress));
  });
};

const deleteDay = (id: string) => {
  realm.write(() => {
    const day: DayInterface = getDayById(id);
    const entries: Array<EntryInterface> = day.entries;

    entries.forEach(entry => {
      realm.delete(entry.weather);
    });
    realm.delete(entries);
    realm.delete(day.habitProgress);
    realm.delete(day);
  });
};

const updateDay = async ({
  entry,
  habitProgress,
}: {
  entry: EntryInterface;
  habitProgress: Array<HabitProgressInterface>;
}) => {
  const day: DayInterface = getCurrentDay();
  const habitsWithDay = habitProgress.map(habit => {
    return { ...habit, day: day.id, entry: entry.id };
  });
  const habitProgressObjs = await createHabitProgresses(habitsWithDay);

  realm.write(() => {
    day.entries.push(entry);

    habitProgressObjs.forEach(progress => {
      const habitExits = day.habitProgress.find(
        existingProgress => existingProgress.habit === progress.habit
      );

      if (!habitExits) day.habitProgress.push(progress);
    });

    store.dispatch(reduxDays.editDay({ day }));
  });
};

const createDay = async ({ entry, habitProgress = [] }) => {
  const day = await createDayWithEntry({ entry });
  await addHabitProgressToDay({ habitProgress, day, entry });

  store.dispatch(reduxDays.newDay({ day }));

  return day;
};

export default {
  createDay,
  createDayWithEntry,
  getDays,
  deleteDay,
  getCurrentDay,
  getDayById,
  getDayByEntry,
  updateDay,
};
