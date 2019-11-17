import React from 'react';

import { View } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ScrollView } from 'react-native-gesture-handler';
import ModalForm from '../ModalForm';
import FormikInput from '../FormikInput';
import Button from '../Common/Button';
import Text from '../Common/Text';
import { toBaseDesignPx, fonts, colors } from '../../Core/Theme';
import ToggleButton from '../Common/Toggle';

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
      <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
        <Text.Medium text="Crear Publicación" />
        <ScrollView>
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
            labelStyle={{ ...fonts.SIZE_S }}
            enablesReturnKeyAutomatically
            returnKeyType="done"
          />
          <FormikInput
            label="Descripción"
            name="description"
            labelStyle={{ ...fonts.SIZE_S }}
            returnKeyType="done"
          />
          <FormikInput
            type="dropdown"
            options={[
              { value: 'public', label: 'Publico' },
              { value: 'privado', label: 'Privado' },
            ]}
            labelStyle={{ ...fonts.SIZE_S }}
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
              labelStyle={{ ...fonts.SIZE_S }}
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
            <FormikInput
              type="dropdown"
              options={[
                { value: 'public', label: 'Publico' },
                { value: 'privado', label: 'Privado' },
              ]}
              labelStyle={{ ...fonts.SIZE_S }}
              label="Tipo de evento"
              name="type"
              containerStyle={{ width: toBaseDesignPx(164.5) }}
              enablesReturnKeyAutomatically
            />
          ) : null}
        </ScrollView>

        <View>
          <Button
            label="Continuar"
            // containerStyle={styles.createAccountButton}
            // onPress={objForm.handleSubmit}
            // disabled={!objForm.isValid}
          />
        </View>
      </KeyboardAwareScrollView>
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
