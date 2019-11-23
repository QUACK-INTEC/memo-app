import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, toBaseDesignPx, spacers, fonts, constants } from '../../../Core/Theme';

import Modal from '../Modal';
import Text from '../Text';
import InLineComponent from '../InLineComponent';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Icon';

class EnforcedToast extends React.Component {
  handleCloseToast = () => {
    const { onCloseModal } = this.props;
    onCloseModal();
  };

  renderText = () => {
    const { isCloseable, title, titleStyle } = this.props;
    if (isCloseable) {
      return (
        <InLineComponent>
          <Text.Medium text={title} style={[styles.titleStyle, titleStyle]} />
          <View style={styles.iconViewStyle}>
            <Icon
              name="times"
              type={ICON_TYPE.FONT_AWESOME}
              size={ICON_SIZE.TINY}
              color={colors.WHITE}
              onPress={this.handleCloseToast}
            />
          </View>
        </InLineComponent>
      );
    }
    return <Text.Medium text={title} style={[styles.titleStyle, titleStyle]} />;
  };

  render() {
    const { isVisible, onPress } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        {...this.props}
        onCloseModal={this.handleCloseToast}
        style={styles.modalStyle}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={styles.modalViewContainer}>{this.renderText()}</View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  iconViewStyle: {
    alignSelf: 'flex-end',
    ...spacers.MB_2,
    flex: 1,
    alignItems: 'flex-end',
  },
  modalStyle: {
    justifyContent: 'flex-start',
    marginTop: constants.DEVICE.STATUS_BAR_HEIGHT,
  },
  modalViewContainer: {
    backgroundColor: colors.GRAY,
    borderRadius: toBaseDesignPx(8),
    justifyContent: 'center',
  },
  titleStyle: {
    color: colors.WHITE,
    ...spacers.ML_3,
    ...spacers.MR_3,
    ...spacers.MB_13,
    ...spacers.MT_13,
    alignSelf: 'flex-start',
    ...fonts.SIZE_S,
  },
});

EnforcedToast.defaultProps = {
  onPress: () => null,
  onCloseModal: () => null,
  title: null,
  titleStyle: null,
  isVisible: null,
  isCloseable: null,
};

EnforcedToast.propTypes = {
  onPress: PropTypes.func,
  onCloseModal: PropTypes.func,
  title: PropTypes.string,
  titleStyle: PropTypes.shape({}),
  isVisible: PropTypes.bool,
  isCloseable: PropTypes.bool,
};

export default EnforcedToast;
