import EntryInterface from './entry';
import HabitInterface from './habit';

export default interface Day {
  id: string;
  entries: Array<EntryInterface>;
  habits: Array<HabitInterface>;
  createdAt: Date;
}
