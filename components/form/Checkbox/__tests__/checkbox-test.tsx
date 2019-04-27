import React from 'react';
import Checkbox from '../Checkbox';
import { createComponent } from '../../../../helpers/renderer'; // todo resolve imports to avid that ugly thang

jest.mock('../../../Icon/Icon', () => 'Icon');

const mockProps = {
  onChange: () => {}
};

describe('Checkbox', () => {
  it('renders correctly', () => {
    expect(
      createComponent(<Checkbox {...mockProps} />).toJSON()
    ).toMatchSnapshot();
  });

  it('renders with checked', () => {
    expect(
      createComponent(<Checkbox {...mockProps} checked />).toJSON()
    ).toMatchSnapshot();
  });
});
