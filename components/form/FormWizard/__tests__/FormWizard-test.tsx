import React from 'react';
import FormWizard, { isLastStep } from '../FormWizard';
import { View, Text } from 'react-native';
import { createComponent } from '../../../../helpers/renderer'; // todo resolve imports to avid that ugly thang

jest.mock('../../../Icon/Icon', () => 'Icon');

const mockProps = {
  steps: [<View />, <View />],
  saveButton: (
    <View>
      <Text>Save, dude</Text>
    </View>
  ),
};

describe('FormWizard', () => {
  it('renders correctly', () => {
    expect(
      createComponent(<FormWizard {...mockProps} />).toJSON()
    ).toMatchSnapshot();
  });

  it('renders with a delete button', () => {
    expect(
      createComponent(
        <FormWizard
          {...mockProps}
          deleteButton={
            <View>
              <Text>Delete meee</Text>
            </View>
          }
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  describe('isLastStep', () => {
    it('should return true if the step is the last', () => {
      expect(isLastStep(1, [{}, {}])).toBe(true);
    });

    it('should return false if the step is NOT the last', () => {
      expect(isLastStep(0, [{}, {}])).toBe(false);
    });
  });
});
