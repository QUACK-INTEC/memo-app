import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { spacers, toBaseDesignPx } from '../../Core/Theme';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';
import ImagePicker from '../Common/ImagePicker';

const validation = objValues => {
  const errors = {};
  const { email, name, lastname, password } = objValues;

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
      name: null,
      profileImage: null,
      ...initialsValue,
    };
  };

  renderForm = objForm => {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <ImagePicker
            style={styles.imagePicker}
            onChangeImage={strImageUri => {
              objForm.setFieldValue('profileImage', strImageUri);
            }}
          />
          <View>
            <FormikInput
              label="Nombre"
              name="name"
              containerStyle={styles.input}
              autoFocus
              enablesReturnKeyAutomatically
              returnKeyType="done"
            />
            <FormikInput
              label="Apellido"
              name="lastname"
              containerStyle={styles.input}
              returnKeyType="done"
            />
            <FormikInput
              label="Email"
              name="email"
              containerStyle={styles.input}
              keyboardType="email-address"
              returnKeyType="done"
              autoCapitalize="none"
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
              label="Continuar"
              containerStyle={styles.createAccountButton}
              onPress={objForm.handleSubmit}
              disabled={!objForm.isValid}
            />
            <Button
              label="Ya tengo una cuenta creada!"
              secondary
              onPress={this.handleBackToLogin}
            />
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
    justifyContent: 'center',
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
