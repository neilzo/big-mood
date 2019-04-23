import uuid from 'uuidv4';
import realm from './models/index';
import defaultMoods from './models/defaultMoods';
import store from '../redux/store';
import * as reduxMoods from '../redux/mood';

const getMoodById = (id: string) => {
  return realm.objectForPrimaryKey('Mood', id);
};

const getMoods = () => {
  return realm.objects('Mood').sorted('rating');
};

const getEnabledMoods = () => {
  return realm
    .objects('Mood')
    .filtered('enabled')
    .sorted('rating');
};

const createMood = opts => {
  realm.write(() => {
    const now = new Date();
    const { moodName, icon, rating } = opts;
    const params = {
      id: uuid(),
      moodName,
      icon,
      rating,
      createdAt: now,
      modifiedAt: now,
      system: false,
      enabled: true
    };

    const mood = realm.create('Mood', params);
    store.dispatch(reduxMoods.newMood({ mood }));
  });
};

const editMood = opts => {
  realm.write(() => {
    const now = new Date();
    const { id, moodName, icon, rating } = opts;
    const mood = getMoodById(id);

    mood.moodName = moodName;
    mood.icon = icon;
    mood.rating = rating;
    mood.modifiedAt = now;

    store.dispatch(reduxMoods.editMood({ mood }));
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

export default { createMood, getMoods, installDefaultMoods, editMood };
