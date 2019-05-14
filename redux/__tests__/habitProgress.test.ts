import habitProgressReducer, {
  newHabitProgress,
  deleteHabitProgress,
  editHabitProgress,
  getHabitProgresses,
} from '../habitProgress';
// import habitProgressService from '../../services/habitProgress';

// habitProgressService.createHabitProgresses = jest.fn();
// habitProgressService.getHabitProgress = jest.fn();

describe('habitProgressReducer', () => {
  it('should handle an empty action', () => {
    expect(habitProgressReducer({}, { type: '' })).toEqual({});
  });

  describe('getHabitProgresses', () => {
    it('should add multiple progress items', () => {
      const action = getHabitProgresses({
        habits: {
          habitId: {
            name: 'Sleep',
            icon: 'zzz',
          },
          habitId2: {
            name: 'Diet',
            icon: 'noms',
          },
        },
        habitProgress: [
          { day: 'id', habit: 'habitId', completed: true },
          { day: 'id2', habit: 'habitId2', completed: false },
        ],
      });

      expect(habitProgressReducer({}, action)).toEqual({
        id: [
          {
            day: 'id',
            completed: true,
            habit: 'habitId',
            habitIcon: 'zzz',
            habitName: 'Sleep',
          },
        ],
        id2: [
          {
            day: 'id2',
            completed: false,
            habit: 'habitId2',
            habitIcon: 'noms',
            habitName: 'Diet',
          },
        ],
      });
    });

    it('should add items to existing days', () => {
      const initialState = {
        dayId: [
          {
            day: 'dayId',
            id: 'id',
            habit: 'habitId',
            habitIcon: 'zzz',
            habitName: 'Sleep',
          },
        ],
      };
      const action = getHabitProgresses({
        habits: {
          habitId: {
            name: 'Sleep',
            icon: 'zzz',
          },
          habitId2: {
            name: 'Diet',
            icon: 'noms',
          },
        },
        habitProgress: [{ day: 'dayId', id: 'id2', habit: 'habitId2' }],
      });

      expect(habitProgressReducer(initialState, action)).toEqual({
        dayId: [
          {
            day: 'dayId',
            id: 'id',
            habit: 'habitId',
            habitIcon: 'zzz',
            habitName: 'Sleep',
          },
          {
            day: 'dayId',
            id: 'id2',
            habit: 'habitId2',
            habitIcon: 'noms',
            habitName: 'Diet',
          },
        ],
      });
    });
  });

  describe('newProgressHabit', () => {
    it('should add a progess item', () => {
      const action = newHabitProgress({
        habitProgress: { day: 'id', completed: true },
      });

      expect(habitProgressReducer({}, action)).toEqual({
        id: { day: 'id', completed: true },
      });
    });
  });

  describe('editProgressHabit', () => {
    it('should edit a progess item', () => {
      const initialState = {
        id: { day: 'id', completed: true },
      };
      const action = editHabitProgress({
        habitProgress: { day: 'id', completed: false },
      });

      expect(habitProgressReducer(initialState, action)).toEqual({
        id: { day: 'id', completed: false },
      });
    });
  });

  describe('deleteHabitProgress', () => {
    it('shuld delete a progress item', () => {
      const initialState = {
        id: [{ day: 'id', id: 'hpId' }, { day: 'id2', id: 'hpId2' }],
        id3: [{ day: 'id3', id: 'hpId3' }],
      };
      const action = deleteHabitProgress({
        dayId: 'id',
        habitProgressId: 'hpId',
      });

      expect(habitProgressReducer(initialState, action)).toEqual({
        id: [{ day: 'id2', id: 'hpId2' }],
        id3: [{ day: 'id3', id: 'hpId3' }],
      });
    });
  });
});
