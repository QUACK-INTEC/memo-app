import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

import { ScrollView } from 'react-native-gesture-handler';
import ModalForm from '../ModalForm';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';
import Text from '../Common/Text';
import { toBaseDesignPx, fonts, colors, spacers, constants } from '../../Core/Theme';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentInsetBottom: 100,
    };
  }

  handleCloseEventForm = () => {
    const { onCloseModal } = this.props;
    onCloseModal();
  };

  handleOnToggleAddFile = (isOn, objForm) => {
    const { setFieldValue } = objForm;
    setFieldValue('hasFile', isOn);
    this.setState(prevState => ({
      contentInsetBottom: isOn
        ? prevState.contentInsetBottom + 50
        : prevState.contentInsetBottom - 50,
    }));
  };

  handleOnSubmit = objValues => {
    const { onSubmit } = this.props;
    onSubmit(objValues);
  };

  handleOnToggleHasDate = isOn => {
    this.setState(prevState => ({
      contentInsetBottom: isOn
        ? prevState.contentInsetBottom + 120
        : prevState.contentInsetBottom - 120,
    }));
  };

  renderForm = objForm => {
    const { contentInsetBottom } = this.state;
    const { optionsClasses, isEditing } = this.props;
    const { values } = objForm;
    const { startDate, endDate, hasDate, hasFile } = values;
    const titleText = isEditing ? 'Editar' : 'Crear';
    const hasADate = hasDate || (endDate && startDate);
    const contentInset = hasADate ? contentInsetBottom + 120 : contentInsetBottom;
    const dinamicHeightAndroid = constants.isAndroid
      ? { height: constants.DEVICE.HEIGHT / 2 }
      : null;
    return (
      <>
        <Text.SemiBold text={`${titleText} Publicación`} style={styles.titleForm} />
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
          <ScrollView
            bounces={false}
            contentInset={{ bottom: contentInset }}
            style={[{ flex: 1 }, dinamicHeightAndroid]}
          >
            <FormikInput
              type="dropdown"
              options={optionsClasses}
              placeholder="Seleccione la clase para este evento..."
              label="Clase"
              name="section"
              disabled={isEditing}
              labelStyle={styles.labelStyle}
              enablesReturnKeyAutomatically
              returnKeyType="next"
            />
            <FormikInput
              label="Titulo"
              name="title"
              labelStyle={styles.labelStyle}
              containerStyle={styles.containerTextInput}
              enablesReturnKeyAutomatically
              returnKeyType="done"
            />
            <FormikInput
              label="Descripción"
              name="description"
              labelStyle={styles.labelStyle}
              containerStyle={styles.containerTextInput}
              returnKeyType="done"
            />
            <FormikInput
              type="dropdown"
              options={[
                { value: 'public', label: 'Publico' },
                { value: 'private', label: 'Privado' },
              ]}
              labelStyle={styles.labelStyle}
              label="Tipo de evento"
              name="type"
              containerStyle={{ width: toBaseDesignPx(164.5), ...spacers.MT_3 }}
              enablesReturnKeyAutomatically
            />
            <View style={styles.containerToggleInput}>
              <FormikInput
                type="toggle"
                label="Tiene fecha?"
                name="hasDate"
                labelStyle={styles.labelToggleInput}
              />
            </View>
            {hasDate ? (
              <View style={styles.containerTimePicker}>
                <FormikInput
                  type="datepicker"
                  label="Fecha del evento"
                  name="dateTime"
                  labelStyle={{ ...fonts.SIZE_S, ...spacers.MT_3 }}
                  containerStyle={{ flex: 1, ...spacers.MR_2 }}
                />
                <View style={{ flexDirection: 'row', ...spacers.MT_8 }}>
                  <FormikInput
                    type="timepicker"
                    label="Hora de inicio"
                    name="startDate"
                    time={startDate}
                    labelStyle={{ ...fonts.SIZE_S, ...spacers.MT_3 }}
                    containerStyle={{ flex: 1, width: toBaseDesignPx(10), ...spacers.MR_2 }}
                  />
                  <FormikInput
                    type="timepicker"
                    label="Hora final"
                    name="endDate"
                    time={endDate}
                    labelStyle={{ ...fonts.SIZE_S, ...spacers.MT_3 }}
                    containerStyle={{ flex: 1, width: toBaseDesignPx(10) }}
                  />
                </View>
              </View>
            ) : null}
            <View style={styles.containerToggleInput}>
              <FormikInput
                type="toggle"
                label="Anexar archivo?"
                name="hasFile"
                labelStyle={styles.labelToggleInput}
              />
            </View>

            {hasFile ? (
              <FormikInput
                type="fileinput"
                labelStyle={styles.labelStyle}
                label="Archivos adjuntos"
                name="attachments"
                containerStyle={{ ...spacers.MT_3 }}
                enablesReturnKeyAutomatically
              />
            ) : null}
          </ScrollView>
        </KeyboardAwareScrollView>
        <View style={styles.containerBottom}>
          <Button
            label={isEditing ? 'Guardar' : 'Crear'}
            containerStyle={styles.submitButton}
            onPress={objForm.handleSubmit}
            disabled={!objForm.isValid}
          />
          <Button
            label="Cancelar"
            secondary
            containerStyle={styles.cancelButton}
            onPress={this.handleCloseEventForm}
          />
        </View>
      </>
    );
  };

  render() {
    const { isVisible, initialValues, validation } = this.props;
    return (
      <ModalForm isVisible={isVisible} onCloseModal={this.handleCloseEventForm}>
        <Formik
          validate={validation}
          onSubmit={this.handleOnSubmit}
          initialValues={initialValues}
          component={this.renderForm}
        />
      </ModalForm>
    );
  }
}

const styles = StyleSheet.create({
  titleForm: {
    ...fonts.SIZE_XL,
    textAlign: 'center',
    ...spacers.MT_4,
    ...spacers.MB_4,
    color: colors.GRAY,
  },
  labelStyle: { ...fonts.SIZE_S },
  containerTextInput: { ...spacers.MT_3 },
  containerToggleInput: { ...spacers.MT_13 },
  labelToggleInput: { marginLeft: 0, color: colors.GRAY },
  containerTimePicker: {
    ...spacers.MT_8,
  },
  containerBottom: {
    backgroundColor: colors.WHITE,
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  submitButton: { ...spacers.ML_4, ...spacers.MR_4 },
  cancelButton: { ...spacers.MT_8, ...spacers.MB_4, ...spacers.ML_4, ...spacers.MR_4 },
});

EventForm.defaultProps = {
  optionsClasses: [],
};

EventForm.propTypes = {
  optionsClasses: PropTypes.arrayOf(PropTypes.shape()),
  isVisible: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape().isRequired,
  validation: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default EventForm;
