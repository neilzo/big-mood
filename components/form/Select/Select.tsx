import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import colorVariables from '../../colorVariables';

interface Option {
  label: string;
  value: string;
}

interface Props {
  metricId: string;
  onChange: (id: string, type: string) => void;
  label?: string;
  value: string;
  options: Array<Option>;
}
const Select = ({ onChange, label, value, options, metricId }: Props) => {
  const [open, setOpen] = useState(false);
  const modal = (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => setOpen(false)}
    >
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <TouchableHighlight onPress={() => setOpen(false)}>
            <Text>Cancel</Text>
          </TouchableHighlight>
          <Text>Done</Text>
        </View>
        <View style={styles.modalOptionWrap}>
          {options.map((option, i) => (
            <TouchableHighlight
              key={`${option.value}-${i}`}
              onPress={() => {
                onChange(metricId, option.value);
                setOpen(false);
              }}
            >
              <View style={styles.modalOption}>
                <Text style={styles.modalOptionLabel}>{option.label}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableHighlight onPress={() => setOpen(true)}>
        <View>
          {!value && <Text>Select a value</Text>}
          {Boolean(value) && <Text>{value}</Text>}
        </View>
      </TouchableHighlight>
      {open && modal}
    </View>
  );
};

Select.defaultProps = {
  options: [],
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginTop: 15,
  },
  label: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: colorVariables.white,
    borderWidth: 1,
    borderRadius: colorVariables.borderRadius,
    borderColor: colorVariables.borderColor,
    alignSelf: 'stretch',
    height: 50,
    padding: 15,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#aaa',
    opacity: 0.5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#efefef',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    paddingBottom: 40,
    backgroundColor: colorVariables.white,
  },
  modalOptionWrap: {
    paddingHorizontal: 50,
  },
  modalOption: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 10,
  },
});

export default Select;
