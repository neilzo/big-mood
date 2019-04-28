import EntryInterface from './entry';
import HabitProgressInterface from './habitProgress';

export default interface Day {
  id: string;
  entries: Array<EntryInterface>;
  habitProgress: Array<HabitProgressInterface>;
  createdAt: Date;
}
