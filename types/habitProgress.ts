export default interface HabitProgress {
  id: string;
  completed?: boolean;
  habit: string;
  day: string;
  createdAt: Date;
  modifiedAt: Date;
}
