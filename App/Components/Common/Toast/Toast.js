import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// Theme
import { colors, toBaseDesignPx, spacers, fonts, constants } from '../../../Core/Theme';

import Text from '../Text';

class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      message: null,
    };
    this.timeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  setToastVisible = (strMessage, timeout = 3000) => {
    this.setState(
      {
        isVisible: true,
        message: strMessage,
      },
      () => {
        this.timeout = setTimeout(() => {
          this.setState({
            isVisible: false,
            message: null,
          });
        }, timeout);
      }
    );
  };

  renderToast = () => {
    const { isVisible, message } = this.state;
    const { titleStyle, onPress } = this.props;
    const activeOpacity = onPress ? 0.2 : 0;
    if (isVisible) {
      return (
        <View style={styles.toastStyle}>
          <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
            <View style={styles.textContainer}>
              <Text.Medium text={message} style={[styles.titleStyle, titleStyle]} />
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
  titleStyle: null,
};

Toast.propTypes = {
  onPress: PropTypes.func,
  titleStyle: PropTypes.shape({}),
};

export default Toast;
