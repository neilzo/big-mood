const moodLowest = {
  moodName: 'Awful',
  rating: 1,
  icon: '😖',
  system: true,
};

const moodLow = {
  moodName: 'Bad',
  rating: 2,
  icon: '🙁',
  system: true,
};

const moodMedium = {
  moodName: 'Meh',
  rating: 3,
  icon: '😑',
  system: true,
};

const moodHigh = {
  moodName: 'Good',
  rating: 4,
  icon: '😃',
  system: true,
};

const moodHigest = {
  moodName: 'Rad',
  rating: 5,
  icon: '😁',
  system: true,
};

export default {
  1: moodLowest,
  2: moodLow,
  3: moodMedium,
  4: moodHigh,
  5: moodHigest,
  all: [moodLowest, moodLow, moodMedium, moodHigh, moodHigest],
};
