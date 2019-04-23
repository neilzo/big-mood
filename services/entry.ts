import uuid from 'uuidv4';
import realm from './models/index';
import dayService from './day';
import store from '../redux/store';

const getEntry = (id: string) => {
  return realm.objectForPrimaryKey('Entry', id);
};

const getEntries = () => {
  return realm.objects('Entry').sorted('createdAt');
};

const createEntry = ({
  note,
  mood,
  weather
}: {
  note: string;
  mood: object;
  weather: object;
}) => {
  let entry;

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
    // dayService.addEntryToDay(params);
  });

  const entries = realm.objects('Entry');
  const currentDay = dayService.getCurrentDay();

  if (currentDay) {
    dayService.addEntryToDay({ entry });
    return;
  }

  dayService.createDay({ entry });
};

const editEntry = ({ id, newEntryData }) => {
  realm.write(() => {
    const entry = getEntry(id);
    const now = new Date();

    entry.mood = newEntryData.mood;
    entry.note = newEntryData.note;
    entry.modifiedAt = now;
  });
};

const deleteEntry = (item: object) => {
  realm.write(() => {
    realm.delete(item);
  });
};

export default { createEntry, getEntries, deleteEntry, editEntry };
