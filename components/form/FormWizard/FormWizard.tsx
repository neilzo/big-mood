import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

interface Props {
  steps: Array<object>;
  saveButton: object;
}
interface State {
  step: number;
}
export default class FormWizard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      step: 0,
    };
  }

  handleNextPress = () =>
    this.setState((prevState: State) => ({ step: prevState.step + 1 }));

  handleBackPress = () =>
    this.setState((prevState: State) => ({ step: prevState.step - 1 }));

  renderStep = () => {
    const { steps } = this.props;
    const { step } = this.state;

    return steps[step];
  };

  renderBackButton = () => {
    const { step } = this.state;

    if (step === 0) return null;

    return <Button title="Back" onPress={this.handleBackPress} />;
  };

  renderNextButton = () => {
    const { steps } = this.props;
    const { step } = this.state;
    const isLastStep = step === steps.length - 1;

    if (isLastStep) return null;

    return <Button title="Next" onPress={this.handleNextPress} />;
  };

  renderSaveButton = () => {
    const { saveButton, steps } = this.props;
    const { step } = this.state;
    const isLastStep = step === steps.length - 1;

    if (!isLastStep) return null;

    return saveButton;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderBackButton()}
        {this.renderNextButton()}
        {this.renderStep()}
        {this.renderSaveButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  entryWrap: {
    alignItems: 'center',
  },
});
