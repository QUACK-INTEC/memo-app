import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { spacers, toBaseDesignPx } from '../../Core/Theme';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';
import ImagePicker from '../Common/ImagePicker';
import Link from '../Common/Link';

const validation = objValues => {
  const errors = {};
  const { email, firstName, lastName, password, passwordVerify } = objValues;

  if (!firstName) {
    errors.firstName = 'Campo obligatorio';
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(firstName)) {
    errors.firstName = 'Nombre inválido';
  }

  if (!lastName) {
    errors.lastName = 'Campo obligatorio';
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ  ]+$/.test(lastName)) {
    errors.lastName = 'Apellido inválido';
  }

  if (!password) {
    errors.password = 'Campo obligatorio';
  } else if (password.length < 8) {
    errors.password = 'Debe tener al menos 8 caracteres';
  } else if (!/.*[0-9].*/.test(password)) {
    errors.password = 'Debe incluir al menos un número.';
  } else if (!/.*[a-z].*/.test(password)) {
    errors.password = 'Debe incluir al menos una minúscula.';
  } else if (!/.*[A-Z].*/.test(password)) {
    errors.password = 'Debe incluir al menos una mayúscula.';
  }

  if (!passwordVerify) {
    errors.passwordVerify = '*';
  } else if (passwordVerify !== password) {
    errors.passwordVerify = '*';
  }
  if (!email) {
    errors.email = 'Campo obligatorio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Correo electrónico inválido';
  }

  return errors;
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.passwordVerifyInput = React.createRef();
  }

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
      firstName: null,
      lastName: null,
      password: null,
      ...initialsValue,
    };
  };

  renderForm = objForm => {
    const { isLoading } = this.props;
    return (
      <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
        <View style={styles.container}>
          <ImagePicker
            style={styles.imagePicker}
            onChangeImage={strImageUri => {
              objForm.setFieldValue('profileImage', strImageUri);
            }}
          />
          <FormikInput
            label="Nombre"
            name="firstName"
            containerStyle={styles.input}
            enablesReturnKeyAutomatically
            returnKeyType="next"
            onSubmitEditing={() => {
              this.lastNameInput.focus();
            }}
            disabled={isLoading}
          />
          <FormikInput
            inputRef={input => {
              this.lastNameInput = input;
            }}
            label="Apellido"
            name="lastName"
            containerStyle={styles.input}
            returnKeyType="next"
            onSubmitEditing={() => {
              this.emailInput.focus();
            }}
            disabled={isLoading}
          />
          <FormikInput
            inputRef={input => {
              this.emailInput = input;
            }}
            label="Email"
            name="email"
            containerStyle={styles.input}
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={() => {
              this.passwordInput.focus();
            }}
            disabled={isLoading}
          />
          <FormikInput
            inputRef={input => {
              this.passwordInput = input;
            }}
            label="Contraseña"
            name="password"
            containerStyle={styles.input}
            returnKeyType="next"
            secureTextEntry
            onSubmitEditing={() => {
              this.passwordVerifyInput.focus();
            }}
            disabled={isLoading}
          />
          <FormikInput
            inputRef={input => {
              this.passwordVerifyInput = input;
            }}
            label="Confirmar contraseña"
            name="passwordVerify"
            containerStyle={styles.input}
            returnKeyType="done"
            secureTextEntry
            disabled={isLoading}
          />

          <View style={styles.buttonsContainer}>
            <Button
              label="Continuar"
              containerStyle={styles.createAccountButton}
              onPress={objForm.handleSubmit}
              disabled={!objForm.isValid}
            />
            <View style={styles.linkContainer}>
              <Link text="Ya tengo una cuenta!" onPress={this.handleBackToLogin} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    ...spacers.MT_4,
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
    alignItems: 'center',
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
