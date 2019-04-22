import React from 'react';
import { BottomTabBar } from 'react-navigation-tabs';
import { View, TouchableWithoutFeedback } from 'react-native';

const HIDDEN_TABS = ['EditEntry', 'Details', 'EditSetting', 'MoodSettings'];

const HiddenView = () => <View style={{ display: 'none' }} />;
const TouchableWithoutFeedbackWrapper = ({
  onPress,
  onLongPress,
  testID,
  accessibilityLabel,
  ...props
}) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    onLongPress={onLongPress}
    testID={testID}
    hitSlop={{
      left: 15,
      right: 15,
      top: 5,
      bottom: 5
    }}
    accessibilityLabel={accessibilityLabel}
  >
    <View {...props} />
  </TouchableWithoutFeedback>
);
const TabBarComponent = props => (
  <BottomTabBar
    {...props}
    getButtonComponent={({ route }) => {
      if (HIDDEN_TABS.includes(route.routeName)) {
        return HiddenView;
      }
      return TouchableWithoutFeedbackWrapper;
    }}
  />
);

export default TabBarComponent;
