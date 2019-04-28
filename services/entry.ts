import uuid from 'uuid/v4';
import realm from './models/index';
import dayService from './day';
import store from '../redux/store';

import EntryInterface from '../types/entry';
import HabitProgressInterface from '../types/habitProgress';

const getEntry = (id: string) => {
  return realm.objectForPrimaryKey('Entry', id);
};

const getEntries = () => {
  return realm.objects('Entry').sorted('createdAt');
};

const createEntry = ({
  entry: entryData,
  habitProgress
}: {
  entry: EntryInterface;
  habitProgress: Array<HabitProgressInterface>;
}) => {
  let entry;
  const { mood, note, weather } = entryData;

  realm.write(() => {
    const now = new Date();
    const params = {
      id: uuid(),
      mood,
      note,
      createdAt: now,
      modifiedAt: now,
      weather
    };

    entry = realm.create('Entry', params);
  });

  const currentDay = dayService.getCurrentDay();

  if (currentDay) {
    dayService.updateDay({ entry, habitProgress });
    return;
  }

  dayService.createDay({ entry, habitProgress });
};

const editEntry = ({
  id,
  newEntryData
}: {
  id: string;
  newEntryData: EntryInterface;
}) => {
  realm.write(() => {
    const entry: EntryInterface = getEntry(id);
    const now = new Date();

    entry.mood = newEntryData.mood;
    entry.note = newEntryData.note;
    entry.modifiedAt = now;

    return entry;
  });
};

const deleteEntry = (item: object) => {
  realm.write(() => {
    realm.delete(item);
  });
};

export default { createEntry, getEntries, deleteEntry, editEntry };
