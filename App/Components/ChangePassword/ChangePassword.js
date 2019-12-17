import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { spacers, colors, fonts, constants } from '../../Core/Theme';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';
import Text from '../Common/Text';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';

const validation = objValues => {
  const errors = {};
  const { password, passwordVerify } = objValues;

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

  return errors;
};

class ChangePassword extends Component {
  handleOnSubmit = objValues => {
    const { onSubmit } = this.props;
    onSubmit(objValues);
  };

  handleBackArrow = () => {
    const { onBackArrow } = this.props;
    onBackArrow();
  };

  renderHeader = () => {
    const { canNavigate } = this.props;
    if (canNavigate) {
      return (
        <View style={styles.headerBackIconContainer}>
          <Icon
            name="chevron-circle-left"
            type={ICON_TYPE.FONT_AWESOME}
            size={ICON_SIZE.TINY}
            color={colors.GRAY}
            onPress={this.handleBackArrow}
          />
        </View>
      );
    }
    return null;
  };

  handleGoBackToLogIn = () => {
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

  renderGoToLogInButton = () => {
    const { hasLogInOption } = this.props;
    if (hasLogInOption) {
      return (
        <Button label="Volver a iniciar sesión" secondary onPress={this.handleGoBackToLogIn} />
      );
    }
    return null;
  };

  renderForm = objForm => {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View>
            <Text.Medium text="Ingrese su nueva contraseña: " style={styles.title} />
            <FormikInput
              label="Nueva contraseña"
              name="password"
              containerStyle={styles.input}
              returnKeyType="done"
              secureTextEntry
            />
            <FormikInput
              label="Repita la contraseña"
              name="passwordVerify"
              containerStyle={styles.input}
              returnKeyType="done"
              secureTextEntry
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Enviar"
              containerStyle={styles.continueButton}
              onPress={objForm.handleSubmit}
              disabled={!objForm.isValid}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };

  render() {
    return (
      <>
        <View style={styles.headerInfoContainer}>{this.renderHeader()}</View>
        <Formik
          validate={validation}
          onSubmit={this.handleOnSubmit}
          initialValues={this.getInitialsValue()}
          component={this.renderForm}
        />
      </>
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
  headerBackIconContainer: {
    ...spacers.ML_14,
    ...spacers.MB_4,
  },
  headerInfoContainer: { marginTop: constants.DEVICE.STATUS_BAR_HEIGHT },
});

ChangePassword.defaultProps = {
  onSubmit: () => null,
  onBack: () => null,
  onBackArrow: () => null,
  initialsValue: null,
  hasLogInOption: false,
  canNavigate: false,
};

ChangePassword.propTypes = {
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
  initialsValue: PropTypes.shape({
    password: PropTypes.string,
    passwordVerify: PropTypes.string,
  }),
  hasLogInOption: PropTypes.bool,
  onBackArrow: PropTypes.func,
  canNavigate: PropTypes.bool,
};

export default ChangePassword;
