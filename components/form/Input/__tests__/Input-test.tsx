import React from 'react';
import Input from '../Input';
import { createComponent } from '../../../../helpers/renderer'; // todo resolve imports to avid that ugly thang

const mockProps = {
  onChange: () => {},
  value: 'someVal',
};

describe('Input', () => {
  it('renders correctly', () => {
    expect(
      createComponent(<Input {...mockProps} />).toJSON()
    ).toMatchSnapshot();
  });

  it('renders with a label', () => {
    expect(
      createComponent(<Input {...mockProps} label="Suh Dude" />).toJSON()
    ).toMatchSnapshot();
  });
});
