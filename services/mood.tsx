import uuid from 'uuidv4';
import realm from './models/index';
import defaultMoods from './models/defaultMoods';

const getMood = () => {};

const getMoods = () => {
  return realm.objects('Mood').sorted('rating');
};

const createMood = (note: string) => {
  realm.write(() => {
    const now = new Date();
    // realm.create('Mood', { note, createdAt: now, modifiedAt: now });
  });
};

const installDefaultMoods = () => {
  realm.write(() => {
    const now = Date();
    defaultMoods.all.forEach(mood => {
      const { moodName, icon, rating } = mood;
      realm.create('Mood', {
        id: uuid(),
        moodName,
        icon,
        rating,
        createdAt: now,
        modifiedAt: now
      });
    });
  });
};

const deleteMood = (item: object) => {
  realm.write(() => {
    realm.delete(item);
  });
};

export default { createMood, getMoods, installDefaultMoods };
