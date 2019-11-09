import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Modal from '../Common/Modal';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import { colors, spacers } from '../../Core/Theme';

class ModalForm extends React.Component {
  handleOnCloseModal = () => {
    const { onCloseModal } = this.props;
    onCloseModal();
  };

  render() {
    const { children } = this.props;

    return (
      <Modal
        {...this.props}
        style={styles.modalContainer}
        onSwipeComplete={this.handleOnCloseModal}
        onBackdropPress={this.handleOnCloseModal}
        swipeDirection="down"
        hideModalContentWhileAnimating
      >
        <View style={styles.modalViewContainer}>
          <Icon
            type={ICON_TYPE.FONT_AWESOME}
            size={ICON_SIZE.TINY}
            name="chevron-down"
            color={colors.GRAY}
            style={styles.iconDown}
            onPress={this.handleOnCloseModal}
          />

          {children}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  iconDown: {
    alignSelf: 'center',
  },
  modalContainer: {
    ...spacers.MT_15,
    ...spacers.MA_0,
  },
  modalViewContainer: {
    ...spacers.PA_7,
    flex: 1,
    backgroundColor: colors.WHITE,
    borderTopEndRadius: 32,
    borderTopStartRadius: 32,
  },
});

ModalForm.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalForm;
