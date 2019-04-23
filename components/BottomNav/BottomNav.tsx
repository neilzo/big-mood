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
}: {
  onPress: () => {};
  onLongPress: () => {};
  testID: string;
  accessibilityLabel: string;
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
const TabBarComponent = (props: any) => (
  <BottomTabBar
    {...props}
    getButtonComponent={({ route }: { route: object }) => {
      if (HIDDEN_TABS.includes(route.routeName)) {
        return HiddenView;
      }
      return TouchableWithoutFeedbackWrapper;
    }}
  />
);

export default TabBarComponent;
