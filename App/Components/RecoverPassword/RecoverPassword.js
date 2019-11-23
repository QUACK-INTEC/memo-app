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
  const { email } = objValues;

  if (!email) {
    errors.email = 'Campo obligatorio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Correo electronico invalido';
  }

  return errors;
};

class RecoverPassword extends Component {
  handleOnSubmit = objValues => {
    const { onSubmit } = this.props;
    onSubmit(objValues);
  };

  handleBackToLogin = () => {
    const { onBack } = this.props;
    onBack();
  };

  getInitialsValue = () => {
    const { initialsValue } = this.props;

    return {
      email: null,
      ...initialsValue,
    };
  };

  renderForm = objForm => {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View>
            <Text.Medium
              text="Ingrese su mail para enviar un código de reestablecimiento de contraseña"
              style={styles.title}
            />
            <FormikInput
              label="Email"
              name="email"
              containerStyle={styles.input}
              keyboardType="email-address"
              returnKeyType="done"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Enviar"
              containerStyle={styles.sencRecoveryButton}
              onPress={objForm.handleSubmit}
              disabled={!objForm.isValid}
            />
            <Button label="Atrás" secondary onPress={this.handleBackToLogin} />
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
  sencRecoveryButton: {
    ...spacers.MB_7,
  },
});

RecoverPassword.defaultProps = {
  onSubmit: () => null,
  onBack: () => null,
  initialsValue: null,
};

RecoverPassword.propTypes = {
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
  initialsValue: PropTypes.shape({
    email: PropTypes.string,
  }),
};

export default RecoverPassword;
