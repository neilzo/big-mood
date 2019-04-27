import Realm from 'realm';

class Day extends Realm.Object {}
Day.schema = {
  name: 'Day',
  primaryKey: 'id',
  properties: {
    id: 'string',
    entries: 'Entry[]',
    habitProgress: 'HabitProgress[]',
    averageMoodRating: 'float?',
    averageWeatherDescription: 'string?',
    averageWeatherTemperature: 'int?',
    createdAt: 'date',
    modifiedAt: 'date'
  }
};

export default Day;
