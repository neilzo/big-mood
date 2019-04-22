import uuid from 'uuidv4';
import realm from './models/index';
import defaultMoods from './models/defaultMoods';

const getMood = () => {};

const getMoods = () => {
  return realm.objects('Mood').sorted('rating');
};

const createMood = opts => {
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

    realm.create('Mood', params);
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
