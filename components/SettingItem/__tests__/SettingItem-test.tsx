import React from 'react';
import SettingItem from '../SettingItem';
import { createComponent } from '../../../helpers/renderer'; // todo resolve imports to avid that ugly thang

jest.mock('../../Icon/Icon', () => 'Icon');

const mockProps = {
  title: 'Terrace House',
  icon: 'chess-king',
  settingRoute: 'MoodSettings',
  onPress: () => {},
};

describe('SettingItem', () => {
  it('renders correctly', () => {
    expect(
      createComponent(<SettingItem {...mockProps} />).toJSON()
    ).toMatchSnapshot();
  });
});
