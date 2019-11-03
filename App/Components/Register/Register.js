import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { spacers } from '../../Core/Theme';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';

const validation = objValues => {
  const errors = {};
  const { email, name, lastname, password, passwordVerify } = objValues;

  if (!name) {
    errors.name = 'Required';
  }

  if (!lastname) {
    errors.lastname = 'Required';
  }

  if (!password) {
    errors.password = 'Required';
  } else if (password.length < 4) {
    errors.password = 'Poor password';
  }

  if (!passwordVerify) {
    errors.passwordVerify = 'Required';
  }

  if (password && passwordVerify) {
    if (passwordVerify !== password) {
      errors.passwordVerify = "Don't match with your password";
    }
  }

  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};
class Register extends Component {
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
      lastname: null,
      password: null,
      passwordVerify: null,
      name: null,
      ...initialsValue,
    };
  };

  renderForm = objForm => {
    return (
      <View style={styles.container}>
        <FormikInput label="Nombre" name="name" />
        <FormikInput label="Apellido" name="lastname" />
        <FormikInput label="Email" name="email" />
        <FormikInput label="Contraseña" name="password" />
        <FormikInput label="Confirme su contraseña" name="passwordVerify" />
        <View style={styles.buttonsContainer}>
          <Button
            label="Continuar"
            containerStyle={styles.createAccountButton}
            onPress={objForm.handleSubmit}
            disabled={!objForm.isValid}
          />
          <Button label="Ya tengo una cuenta creada!" secondary onPress={this.handleBackToLogin} />
        </View>
      </View>
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
    ...spacers.MA_7,
  },
  buttonsContainer: {
    ...spacers.MT_15,
  },
  createAccountButton: {
    ...spacers.MB_7,
  },
});

Register.defaultProps = {
  onSubmit: () => null,
  onBack: () => null,
  initialsValue: null,
};

Register.propTypes = {
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
  initialsValue: PropTypes.shape({
    email: PropTypes.string,
    lastname: PropTypes.string,
    password: PropTypes.string,
    passwordVerify: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default Register;
