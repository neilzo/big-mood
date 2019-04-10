import uuid from 'uuidv4';
import realm from './models/index';

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
  });
};

const deleteEntry = (item: object) => {
  realm.write(() => {
    realm.delete(item);
  });
};

export default { createEntry, getEntries, deleteEntry };
