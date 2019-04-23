import EntryInterface from './entry';

export default interface Day {
  id: string;
  entries: Array<EntryInterface>;
  createdAt: Date;
}
