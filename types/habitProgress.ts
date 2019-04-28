export default interface HabitProgress {
  id: string;
  completed?: boolean;
  habit: string;
  day: string;
  entry: string;
  createdAt: Date;
  modifiedAt: Date;
}
