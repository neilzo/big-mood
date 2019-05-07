const sleep = {
  name: 'Sleep',
  enabled: true,
  system: true,
  icon: '😴',
  polarity: 1,
  metrics: [
    { duration: undefined },
    { temperature: undefined },
    { sleepAt: undefined },
  ],
};

const exercise = {
  name: 'Exercise',
  enabled: true,
  system: true,
  icon: '💪',
  polarity: 1,
  metrics: [],
};

const diet = {
  name: 'Diet',
  enabled: true,
  system: true,
  icon: '🥗',
  polarity: 1,
  metrics: [{ calories: undefined }],
};

const friends = {
  name: 'Friends',
  enabled: true,
  system: true,
  icon: '👥',
  polarity: 1,
  metrics: [],
};

const cannabis = {
  name: 'Cannabis',
  enabled: true,
  system: true,
  icon: '🌲',
  polarity: -1,
  metrics: [],
};

const drinking = {
  name: 'Drinking',
  enabled: true,
  system: true,
  icon: '🍷',
  polarity: -1,
  metrics: [{ amount: undefined }],
};

export default {
  good: [sleep, exercise, diet, friends],
  neutral: [],
  bad: [drinking, cannabis],
  all: [sleep, exercise, diet, friends, drinking],
};
