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
import TimePicker from '../Common/TimePickerWrapper';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      canAddFile: false,
      hasDate: false,
    };
  }

  handleCloseEventForm = () => {
    this.setState({
      isVisible: false,
    });
  };

  handleOnToggleAddFile = isOn => {
    this.setState({
      canAddFile: isOn,
    });
  };

  handleOnToggleHasDate = isOn => {
    this.setState({
      hasDate: isOn,
    });
  };

  renderForm = () => {
    const { canAddFile, hasDate } = this.state;
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
            contentContainerStyle={{
              ...spacers.MB_15,
              flex: 1,
              backgroundColor: 'red',
            }}
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
                { value: 'privado', label: 'Privado' },
              ]}
              labelStyle={{ ...fonts.SIZE_S, ...spacers.MT_3 }}
              label="Tipo de evento"
              name="type"
              containerStyle={{ width: toBaseDesignPx(164.5) }}
              enablesReturnKeyAutomatically
            />
            <ToggleButton.Medium
              label="Anexar archivo?"
              onToggle={this.handleOnToggleAddFile}
              labelStyle={{ marginLeft: 0, color: colors.GRAY }}
            />
            {canAddFile ? (
              <FormikInput
                type="dropdown"
                options={[
                  { value: 'public', label: 'Publico' },
                  { value: 'privado', label: 'Privado' },
                ]}
                labelStyle={{ ...fonts.SIZE_S, ...spacers.MT_3 }}
                label="Tipo de evento"
                name="type"
                containerStyle={{ width: toBaseDesignPx(164.5) }}
                enablesReturnKeyAutomatically
              />
            ) : null}
            <ToggleButton.Medium
              label="Tiene fecha?"
              onToggle={this.handleOnToggleHasDate}
              labelStyle={{ marginLeft: 0, color: colors.GRAY }}
            />
            {hasDate ? (
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', ...spacers.MT_8 }}
              >
                <TimePicker
                  text="Hora de inicio"
                  textStyle={{ ...fonts.SIZE_S, color: colors.GRAY }}
                  containerStyle={{ width: toBaseDesignPx(160.5) }}
                />
                <TimePicker
                  text="Hora final"
                  textStyle={{ ...fonts.SIZE_S, color: colors.GRAY }}
                  containerStyle={{ width: toBaseDesignPx(160.5) }}
                />
              </View>
            ) : null}
          </ScrollView>
        </KeyboardAwareScrollView>
        {/* <View
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
            // onPress={objForm.handleSubmit}
            // disabled={!objForm.isValid}
          />
          <Button
            label="Cancelar"
            secondary
            containerStyle={{ ...spacers.MT_8, ...spacers.MB_4, ...spacers.ML_4, ...spacers.MR_4 }}
            // onPress={objForm.handleSubmit}
            // disabled={!objForm.isValid}
          />
        </View> */}
      </>
    );
  };

  render() {
    const { isVisible, canAddFile } = this.state;
    console.log({ props: this.props, canAddFile });
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
