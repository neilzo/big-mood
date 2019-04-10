import uuid from 'uuidv4';
import moment from 'moment';
import realm from './models/index';

const getDay = day => {
  return realm.objects('Day').filtered('id == $0', day.id)[0];
};

const getCurrentDay = () => {
  const yesterday = moment()
    .subtract(1, 'day')
    .toString();
  const tomorrow = moment()
    .add(1, 'day')
    .toString();
  return realm
    .objects('Day')
    .filtered('createdAt > $0 && createdAt < $1', yesterday, tomorrow)[0];
};

const getDays = () => {
  return realm.objects('Day').sorted('createdAt');
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

const deleteDay = (item: object) => {
  realm.write(() => {
    realm.delete(item);
  });
};

const addEntryToDay = ({ entry }) => {
  realm.write(() => {
    const day = getCurrentDay();

    day.entries.push(entry);
  });
};

export default { createDay, getDays, deleteDay, addEntryToDay, getCurrentDay };
