import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export const isLastStep = (step: number, steps: Array<Element>) =>
  step === steps.length - 1;

interface Props {
  step: number;
  steps: Array<Element>;
  saveButton: Element;
  deleteButton?: Element | null;
}
interface State {
  step: number;
}
export default class FormWizard extends Component<Props, State> {
  static defaultProps = {
    step: 0,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      step: props.step,
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
    const isEnd: boolean = isLastStep(step, steps);

    if (isEnd) return null;

    return <Button title="Next" onPress={this.handleNextPress} />;
  };

  renderSaveButton = () => {
    const { saveButton, steps } = this.props;
    const { step } = this.state;
    const isEnd: boolean = isLastStep(step, steps);

    if (!isEnd) return null;

    return saveButton;
  };

  renderDeleteButton = () => {
    const { deleteButton } = this.props;

    return deleteButton;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderBackButton()}
        {this.renderNextButton()}
        {this.renderStep()}
        {this.renderBackButton()}
        {this.renderNextButton()}
        {this.renderSaveButton()}
        {this.renderDeleteButton()}
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
});
