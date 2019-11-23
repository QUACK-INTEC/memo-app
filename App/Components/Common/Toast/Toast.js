import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// Theme
import { colors, toBaseDesignPx, spacers, fonts, constants } from '../../../Core/Theme';

import Text from '../Text';

class Toast extends React.Component {
  renderToast = () => {
    const { title, titleStyle, isVisible, onPress } = this.props;
    if (isVisible) {
      return (
        <View style={styles.toastStyle}>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.textContainer}>
              <Text.Medium text={title} style={[styles.titleStyle, titleStyle]} />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  render() {
    return this.renderToast();
  }
}

const styles = StyleSheet.create({
  toastStyle: {
    justifyContent: 'flex-start',
    marginTop: constants.DEVICE.STATUS_BAR_HEIGHT,
    ...spacers.ML_2,
    ...spacers.MR_2,
  },
  textContainer: {
    backgroundColor: colors.GRAY,
    borderRadius: toBaseDesignPx(8),
    justifyContent: 'center',
    opacity: 0.7,
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

Toast.defaultProps = {
  onPress: () => null,
  title: null,
  titleStyle: null,
  isVisible: null,
};

Toast.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  titleStyle: PropTypes.shape({}),
  isVisible: PropTypes.bool,
};

export default Toast;
