import uuid from 'uuidv4';
import realm from './models/index';
import dayService from './day';

const getEntry = () => {};

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
    realm.create('Entry', params);
    // dayService.addEntryToDay(params);
  });

  const entries = realm.objects('Entry');
  const currentDay = dayService.getCurrentDay();
  const lastEntry = entries[entries.length - 1];

  if (currentDay) {
    dayService.addEntryToDay({ entry: lastEntry });
    return;
  }

  dayService.createDay({ entry: lastEntry });
};

const deleteEntry = (item: object) => {
  realm.write(() => {
    realm.delete(item);
  });
};

export default { createEntry, getEntries, deleteEntry };
