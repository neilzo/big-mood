import uuid from 'uuid/v4';
import moment from 'moment';
import realm from './models/index';
import store from '../redux/store';
import * as reduxDays from '../redux/day';
import DayInterface from '../types/day';
import EntryInterface from '../types/entry';

const getDayById = (id: string) => {
  return realm.objectForPrimaryKey('Day', id);
};

const getDayByEntry = (entryCreatedAt: string) => {
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

const createDay = ({ entry }: { entry: object }) => {
  realm.write(() => {
    const now = new Date();
    const params = {
      id: uuid(),
      entries: [entry],
      createdAt: now,
      modifiedAt: now
    };
    realm.create('Day', params);
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
    realm.delete(day);
  });
};

const addEntryToDay = ({ entry }: { entry: EntryInterface }) => {
  realm.write(() => {
    const day: DayInterface = getCurrentDay();

    day.entries.push(entry);

    store.dispatch(reduxDays.editDay({ day }));
  });
};

export default {
  createDay,
  getDays,
  deleteDay,
  addEntryToDay,
  getCurrentDay,
  getDayById,
  getDayByEntry
};
