import MoodInterface from './mood';
import WeatherInterface from './weather';

export default interface Entry {
  mood: MoodInterface;
  note: string;
  weather: WeatherInterface;
  id: string;
  createdAt: Date;
  modifiedAt: Date;
}
