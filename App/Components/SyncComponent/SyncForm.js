import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { spacers, toBaseDesignPx } from '../../Core/Theme';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';

const validation = objValues => {
  const errors = {};
  const { user, password, university } = objValues;

  if (!university) {
    errors.university = 'Requerido';
  }
  if (!password) {
    errors.password = 'Requerido';
  }

  if (!user) {
    errors.user = 'Requerido';
  }

  return errors;
};

class SyncForm extends Component {
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
      user: null,
      password: null,
      university: null,
      ...initialsValue,
    };
  };

  renderForm = objForm => {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View>
            <FormikInput
              type="dropdown"
              options={[{ label: 'INTEC', value: '1' }]}
              placeholder="Seleccione su universidad"
              label="Universidad"
              name="university"
              containerStyle={styles.input}
              enablesReturnKeyAutomatically
              returnKeyType="next"
            />
            <FormikInput
              label="Usuario"
              name="user"
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
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Sincronizar mi cuenta"
              containerStyle={styles.createAccountButton}
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

SyncForm.defaultProps = {
  onSubmit: () => null,
  onRegister: () => null,
  initialsValue: null,
};

SyncForm.propTypes = {
  onSubmit: PropTypes.func,
  onRegister: PropTypes.func,
  initialsValue: PropTypes.shape({
    user: PropTypes.string,
    password: PropTypes.string,
    university: PropTypes.string,
  }),
};

export default SyncForm;
