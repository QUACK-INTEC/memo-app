import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { spacers, toBaseDesignPx } from '../../Core/Theme';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';
import LinkComponent from '../Common/Link';

const validation = objValues => {
  const errors = {};
  const { email, password } = objValues;

  if (!password) {
    errors.password = 'Requerido';
  }

  if (!email) {
    errors.email = 'Requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Correo electronico invalido';
  }

  return errors;
};

class LoginForm extends Component {
  handleOnSubmit = objValues => {
    const { onSubmit } = this.props;
    onSubmit(objValues);
  };

  handleRegister = () => {
    const { onRegister } = this.props;
    onRegister();
  };

  handlePasswordRecovery = () => {
    const { onPasswordRecovery } = this.props;
    onPasswordRecovery();
  };

  getInitialsValue = () => {
    const { initialsValue } = this.props;

    return {
      email: null,
      password: null,
      ...initialsValue,
    };
  };

  renderForm = objForm => {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View>
            <FormikInput
              label="Email"
              name="email"
              keyboardType="email-address"
              containerStyle={styles.input}
              enablesReturnKeyAutomatically
              returnKeyType="next"
            />
            <FormikInput
              label="Contraseña"
              name="password"
              containerStyle={styles.input}
              returnKeyType="done"
              secureTextEntry
            />
            <FormikInput
              type="datepicker"
              label="Fecha Inicial"
              name="fechainicial"
              containerStyle={styles.input}
              returnKeyType="done"
              secureTextEntry
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Entrar"
              containerStyle={styles.createAccountButton}
              onPress={objForm.handleSubmit}
              disabled={!objForm.isValid}
            />
            <Button label="Registrarte" secondary onPress={this.handleRegister} />
            <View style={styles.linkContainer}>
              <LinkComponent text="Recuperar Contraseña" onPress={this.handlePasswordRecovery} />
            </View>
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
    ...spacers.MA_5,
    flex: 1,
  },
  input: {
    ...spacers.MT_7,
  },
  buttonsContainer: {
    ...spacers.MT_6,
  },
  imagePicker: {
    alignSelf: 'center',
    height: toBaseDesignPx(120),
    width: toBaseDesignPx(120),
    borderRadius: toBaseDesignPx(60),
  },
  createAccountButton: {
    ...spacers.MB_7,
  },
  linkContainer: {
    ...spacers.MT_5,
    alignItems: 'center',
  },
});

LoginForm.defaultProps = {
  onSubmit: () => null,
  onRegister: () => null,
  onPasswordRecovery: () => null,
  initialsValue: null,
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  onRegister: PropTypes.func,
  onPasswordRecovery: PropTypes.func,
  initialsValue: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};

export default LoginForm;
