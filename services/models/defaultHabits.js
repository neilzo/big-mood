const sleep = {
  name: 'Sleep',
  enabled: true,
  system: true,
  icon: '😴',
  polarity: 1,
  metrics: [
    { name: 'duration', type: 'number', icon: '⏳' },
    { name: 'temperature', type: 'number', icon: '🌡' },
    { name: 'bedtime', type: 'time', icon: '🛌' },
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
  metrics: [{ name: 'calories', type: 'number', icon: '🔢' }],
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
  metrics: [{ name: 'drinks', type: 'number', icon: '🍻' }],
};

export default {
  good: [sleep, exercise, diet, friends],
  neutral: [],
  bad: [drinking, cannabis],
  all: [sleep, exercise, diet, friends, drinking],
};
