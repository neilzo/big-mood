const sleep = {
  name: 'Sleep',
  enabled: true,
  system: true,
  icon: '😴',
  polarity: 1
};

const exercise = {
  name: 'Exercise',
  enabled: true,
  system: true,
  icon: '💪',
  polarity: 1
};

const diet = {
  name: 'Diet',
  enabled: true,
  system: true,
  icon: '🥗',
  polarity: 1
};

const friends = {
  name: 'Friends',
  enabled: true,
  system: true,
  icon: '👥',
  polarity: 1
};

const drugs = {
  name: 'Drugs',
  enabled: true,
  system: true,
  icon: '💊',
  polarity: -1
};

const drinking = {
  name: 'Drinking',
  enabled: true,
  system: true,
  icon: '🍷',
  polarity: -1
};

export default {
  good: [sleep, exercise, diet, friends],
  neutral: [],
  bad: [drinking, drugs],
  all: [sleep, exercise, diet, friends, drinking]
};
