import React from 'react';

import { View } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ScrollView } from 'react-native-gesture-handler';
import ModalForm from '../ModalForm';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';
import Text from '../Common/Text';
import { toBaseDesignPx, fonts, colors, spacers } from '../../Core/Theme';
import ToggleButton from '../Common/Toggle';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canAddFile: false,
      hasDate: false,
      contentInsetBottom: 100,
    };
  }

  handleCloseEventForm = () => {
    const { onCloseModal } = this.props;
    onCloseModal();
  };

  handleOnToggleAddFile = isOn => {
    this.setState(prevState => ({
      canAddFile: isOn,
      contentInsetBottom: isOn
        ? prevState.contentInsetBottom + 50
        : prevState.contentInsetBottom - 50,
    }));
  };

  // TODO:  Handle on submit form
  handleOnSubmit = objValues => {
    const { onSubmit } = this.props;
    onSubmit(objValues);
  };

  handleOnToggleHasDate = isOn => {
    this.setState(prevState => ({
      hasDate: isOn,
      contentInsetBottom: isOn
        ? prevState.contentInsetBottom + 50
        : prevState.contentInsetBottom - 50,
    }));
  };

  renderForm = objForm => {
    const { canAddFile, hasDate, contentInsetBottom } = this.state;
    return (
      <>
        <Text.SemiBold
          text="Crear Publicación"
          style={{
            ...fonts.SIZE_XL,
            textAlign: 'center',
            ...spacers.MT_4,
            ...spacers.MB_4,
            color: colors.GRAY,
          }}
        />
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
          <ScrollView
            bounces={false}
            alwaysBounceVertical={false}
            automaticallyAdjustContentInsets={false}
            contentInset={{ top: 0, bottom: contentInsetBottom }}
          >
            <FormikInput
              type="dropdown"
              options={[{ value: 'inteligencia_artificial', label: 'Inteligencia Artificial' }]}
              placeholder="Seleccione la clase para este evento..."
              label="Clase"
              name="clase"
              labelStyle={{ ...fonts.SIZE_S }}
              enablesReturnKeyAutomatically
              returnKeyType="next"
            />
            <FormikInput
              label="Titulo"
              name="title"
              labelStyle={{ ...fonts.SIZE_S, ...spacers.MT_3 }}
              enablesReturnKeyAutomatically
              returnKeyType="done"
            />
            <FormikInput
              label="Descripción"
              name="description"
              labelStyle={{ ...fonts.SIZE_S, ...spacers.MT_3 }}
              returnKeyType="done"
            />
            <FormikInput
              type="dropdown"
              options={[
                { value: 'public', label: 'Publico' },
                { value: 'private', label: 'Privado' },
              ]}
              labelStyle={{ ...fonts.SIZE_S }}
              label="Tipo de evento"
              name="type"
              containerStyle={{ width: toBaseDesignPx(164.5), ...spacers.MT_3 }}
              enablesReturnKeyAutomatically
            />
            <View style={{ ...spacers.MT_14 }}>
              <ToggleButton
                label="Anexar archivo?"
                onChange={this.handleOnToggleAddFile}
                labelStyle={{ marginLeft: 0, color: colors.GRAY }}
              />
            </View>

            {canAddFile ? (
              <FormikInput
                type="dropdown"
                options={[
                  { value: 'public', label: 'Publico' },
                  { value: 'privado', label: 'Privado' },
                ]}
                labelStyle={{ ...fonts.SIZE_S }}
                label="Tipo de evento"
                name="type"
                containerStyle={{ width: toBaseDesignPx(164.5), ...spacers.MT_3 }}
                enablesReturnKeyAutomatically
              />
            ) : null}
            <View style={{ ...spacers.MT_13 }}>
              <ToggleButton
                label="Tiene fecha?"
                onChange={this.handleOnToggleHasDate}
                labelStyle={{ marginLeft: 0, color: colors.GRAY }}
              />
            </View>
            {hasDate ? (
              <View
                style={{
                  flexDirection: 'row',
                  ...spacers.MT_8,
                }}
              >
                <FormikInput
                  type="timepicker"
                  label="Hora de inicio"
                  name="startTime"
                  labelStyle={{ ...fonts.SIZE_S, ...spacers.MT_3 }}
                  containerStyle={{ flex: 1, width: toBaseDesignPx(10), ...spacers.MR_2 }}
                />
                <FormikInput
                  type="timepicker"
                  label="Hora final"
                  name="endTime"
                  labelStyle={{ ...fonts.SIZE_S, ...spacers.MT_3 }}
                  containerStyle={{ flex: 1, width: toBaseDesignPx(10) }}
                />
              </View>
            ) : null}
          </ScrollView>
        </KeyboardAwareScrollView>
        <View
          style={{
            backgroundColor: colors.WHITE,
            flex: 1,
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Button
            label="Continuar"
            containerStyle={{ ...spacers.ML_4, ...spacers.MR_4 }}
            onPress={objForm.handleSubmit}
            disabled={!objForm.isValid}
          />
          <Button
            label="Cancelar"
            secondary
            containerStyle={{ ...spacers.MT_8, ...spacers.MB_4, ...spacers.ML_4, ...spacers.MR_4 }}
            onPress={this.handleCloseEventForm}
          />
        </View>
      </>
    );
  };

  render() {
    const { isVisible } = this.props;
    return (
      <ModalForm isVisible={isVisible} onCloseModal={this.handleCloseEventForm}>
        <Formik
          // validate={validation}
          onSubmit={this.handleOnSubmit}
          initialValues={{ clase: null }}
          component={this.renderForm}
        />
      </ModalForm>
    );
  }
}

export default EventForm;
