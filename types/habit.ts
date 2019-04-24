export default interface HabitInterface {
  id: string;
  name: string;
  description: string;
  completed?: boolean;
  enabled: boolean;
  system: boolean;
  icon: string;
  polarity: number;
  createdAt: Date;
  createdBy?: string;
  modifiedAt: Date;
  modifiedBy?: string;
  deleted?: boolean;
  deletedAt: boolean;
}
