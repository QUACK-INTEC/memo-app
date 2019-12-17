import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { spacers, toBaseDesignPx, colors, constants } from '../../Core/Theme';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';

const validation = objValues => {
  const errors = {};
  const { user, claveUniversidad, university } = objValues;

  if (!university) {
    errors.university = 'Requerido';
  }
  if (!claveUniversidad) {
    errors.claveUniversidad = 'Requerido';
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

  getInitialsValue = () => {
    const { initialsValue } = this.props;

    return {
      user: null,
      claveUniversidad: null,
      university: null,
      ...initialsValue,
    };
  };

  renderForm = objForm => {
    const { universities } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View>
            <FormikInput
              type="dropdown"
              options={universities}
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
              name="claveUniversidad"
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
    ...spacers.MR_10,
    ...spacers.ML_10,
    ...spacers.MB_10,
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
  headerBackIconContainer: {
    ...spacers.ML_14,
    ...spacers.MB_4,
  },
  headerInfoContainer: { marginTop: constants.DEVICE.STATUS_BAR_HEIGHT },
});

SyncForm.defaultProps = {
  onSubmit: () => null,
  onBackArrow: () => null,
  initialsValue: null,
  canNavigate: false,
};

SyncForm.propTypes = {
  onSubmit: PropTypes.func,
  onBackArrow: PropTypes.func,
  canNavigate: PropTypes.bool,
  initialsValue: PropTypes.shape({
    user: PropTypes.string,
    claveUniversidad: PropTypes.string,
    university: PropTypes.string,
  }),
  universities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      syncCode: PropTypes.string,
    })
  ).isRequired,
};

export default SyncForm;
