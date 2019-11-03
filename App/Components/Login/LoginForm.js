import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, SafeAreaView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { spacers, toBaseDesignPx } from '../../Core/Theme';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';

const validation = objValues => {
  const errors = {};
  const { email, password } = objValues;

  if (!password) {
    errors.password = 'Required';
  } else if (password.length < 4) {
    errors.password = 'Poor password';
  }

  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
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

  getInitialsValue = () => {
    const { initialsValue } = this.props;

    return {
      email: null,
      lastname: null,
      password: null,
      name: null,
      profileImage: null,
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
              containerStyle={styles.input}
              // autoFocus
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
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Entrar"
              containerStyle={styles.createAccountButton}
              onPress={objForm.handleSubmit}
              disabled={!objForm.isValid}
            />
            <Button label="Registrarte" secondary onPress={this.handleRegister} />
            <Text>Recuperar Contraseña</Text>
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
    // justifyContent: 'center',
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
});

LoginForm.defaultProps = {
  onSubmit: () => null,
  onRegister: () => null,
  initialsValue: null,
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  onRegister: PropTypes.func,
  initialsValue: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};

export default LoginForm;
