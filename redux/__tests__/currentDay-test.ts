import currentDayReducer from '../currentDay';

describe('currentDayReducer', () => {
  describe('setEntryDay', () => {
    it('should return initialState', () => {
      expect(
        currentDayReducer('', { type: 'SET_ENTRY_DAY', payload: { dayId: '' } })
      ).toBe('');
    });

    it('should set dayId', () => {
      expect(
        currentDayReducer('', {
          type: 'SET_ENTRY_DAY',
          payload: { dayId: 'dayId' },
        })
      ).toBe('dayId');
    });
  });
});
