import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { spacers, colors, fonts } from '../../Core/Theme';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';
import Text from '../Common/Text';

const validation = objValues => {
  const errors = {};
  const { recoveryCode } = objValues;

  if (!recoveryCode) {
    errors.recoveryCode = 'Campo obligatorio';
  }

  return errors;
};

class PasswordRecoveryCode extends Component {
  handleOnSubmit = objValues => {
    const { onSubmit } = this.props;
    onSubmit(objValues);
  };

  handleBackToSendCode = () => {
    const { onBack } = this.props;
    onBack();
  };

  getInitialsValue = () => {
    const { initialsValue } = this.props;

    return {
      recoveryCode: null,
      ...initialsValue,
    };
  };

  renderForm = objForm => {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View>
            <Text.Medium
              text="Ingrese el código que le fue enviado a su mail ingresado anteriormente"
              style={styles.title}
            />
            <FormikInput
              label="Código"
              name="recoveryCode"
              containerStyle={styles.input}
              returnKeyType="done"
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Continuar"
              containerStyle={styles.continueButton}
              onPress={objForm.handleSubmit}
              disabled={!objForm.isValid}
            />
            <Button label="Atrás" secondary onPress={this.handleBackToSendCode} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };

  render() {
    return (
      <Formik
        validate={validation}
        onSubmit={this.handleOnSubmit}
        initialValues={this.getInitialsValue()}
        component={this.renderForm}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...spacers.MA_10,
    flex: 1,
  },
  title: { color: colors.GRAY, ...fonts.SIZE_S, ...spacers.MT_15 },
  input: {
    ...spacers.MT_7,
  },
  buttonsContainer: {
    ...spacers.MT_6,
  },
  continueButton: {
    ...spacers.MB_7,
  },
});

PasswordRecoveryCode.defaultProps = {
  onSubmit: () => null,
  onBack: () => null,
  initialsValue: null,
};

PasswordRecoveryCode.propTypes = {
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
  initialsValue: PropTypes.shape({
    recoveryCode: PropTypes.string,
  }),
};

export default PasswordRecoveryCode;
