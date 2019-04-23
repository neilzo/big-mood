export default interface Entry {
  mood: {
    icon: string;
  };
  note: string;
  weather: object;
  id: string;
  createdAt: Date;
}
