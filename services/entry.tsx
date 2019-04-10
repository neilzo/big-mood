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

const deleteEntry = (item: object) => {
  realm.write(() => {
    realm.delete(item);
  });
};

export default { createEntry, getEntries, deleteEntry };
