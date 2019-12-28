import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  constructor(props) {
    super(props);
    this.passwordInput = React.createRef();
  }

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
    const { isLoading } = this.props;

    return (
      <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
        <SafeAreaView style={styles.container}>
          <FormikInput
            label="Email"
            name="email"
            keyboardType="email-address"
            containerStyle={styles.inputMail}
            enablesReturnKeyAutomatically
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
            returnKeyType="done"
            secureTextEntry
            disabled={isLoading}
          />
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
        </SafeAreaView>
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
    ...spacers.ML_5,
    ...spacers.MR_5,
    ...spacers.MB_5,
    flex: 2,
  },
  inputMail: {
    ...spacers.MB_3,
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
