import React from 'react';
import ButtonIcon from '../ButtonIcon';
import { createComponent } from '../../../helpers/renderer'; // todo resolve imports to avid that ugly thang

jest.mock('../../Icon/Icon', () => 'Icon');

const mockProps = {
  onPress: () => {},
  icon: 'rocket',
};

describe('ButtonIcon', () => {
  it('renders correctly', () => {
    expect(
      createComponent(<ButtonIcon {...mockProps} />).toJSON()
    ).toMatchSnapshot();
  });

  it('renders correctly with size', () => {
    expect(
      createComponent(<ButtonIcon {...mockProps} size={50} />).toJSON()
    ).toMatchSnapshot();
  });

  it('respects containerStyle prop', () => {
    expect(
      createComponent(
        <ButtonIcon {...mockProps} size={50} containerStyle={{ margin: 20 }} />
      ).toJSON()
    ).toMatchSnapshot();
  });
});
