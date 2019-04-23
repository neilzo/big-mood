export default interface Mood {
  id: string;
  moodName: string;
  description?: string;
  icon: string;
  rating: number;
  createdAt: Date;
  modifiedAt: Date;
  enabled: boolean;
  system: boolean;
  deleted?: boolean;
  deletedAt?: Date;
}
