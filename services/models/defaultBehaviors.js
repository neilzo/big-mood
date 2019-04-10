const sleep = {
  behaviorName: 'Sleep',
  enabled: true,
  editable: false,
  icon: '😴',
  polarity: 1
};

const exercise = {
  behaviorName: 'Exercise',
  enabled: true,
  editable: false,
  icon: '💪',
  polarity: 1
};

const diet = {
  behaviorName: 'Diet',
  enabled: true,
  editable: false,
  icon: '🥗',
  polarity: 1
};

const friends = {
  behaviorName: 'Friends',
  enabled: true,
  editable: false,
  icon: '👥',
  polarity: 1
};

const drugs = {
  behaviorName: 'Drugs',
  enabled: true,
  editable: false,
  icon: '💊',
  polarity: -1
};

const drinking = {
  behaviorName: 'Drinking',
  enabled: true,
  editable: false,
  icon: '🍷',
  polarity: -1
};

export default {
  good: [sleep, exercise, diet, friends],
  neutral: [],
  bad: [drinking, drugs],
  all: [sleep, exercise, diet, friends, drinking]
};
