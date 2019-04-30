import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import Icon from '../../Icon/Icon';
import colorVariables from '../../colorVariables';

interface Props {
  containerStyle?: object;
  onChange: (selected: boolean) => void;
  checked?: boolean;
}
const Checkbox = ({
  containerStyle,
  onChange = () => {},
  checked = false,
}: Props) => {
  const [selected, setSelected] = useState(checked);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        const newSelected = !selected;
        setSelected(newSelected);
        onChange(newSelected);
      }}
    >
      <View style={containerStyle}>
        {!selected && <Icon name="checkbox-blank-outline" size={20} />}
        {selected && (
          <Icon
            name="checkbox-marked-outline"
            size={20}
            color={colorVariables.selected}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default Checkbox;
