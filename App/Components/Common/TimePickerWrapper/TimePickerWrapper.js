import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, fonts } from '../../../Core/Theme';

// Common
import Text from '../Text';
import TimePicker from '../TimePicker';

class TimePickerWrapper extends React.Component {
  renderText = () => {
    const { text, textStyle } = this.props;
    if (text) {
      return <Text.SemiBold text={text} style={[styles.textStyle, textStyle]} />;
    }

    return null;
  };

  render() {
    const { time, timeStyle } = this.props;
    return (
      <>
        {this.renderText()}
        <TimePicker time={time} style={[styles.timeStyle, timeStyle]} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: { color: colors.GRAY_LIGHT, ...fonts.SIZE_XS },
  timeStyle: { textDecorationLine: 'underline', color: colors.GRAY, ...fonts.SIZE_XS },
});

TimePickerWrapper.defaultProps = {
  text: null,
  time: null,
  textStyle: null,
  timeStyle: null,
};

TimePickerWrapper.propTypes = {
  text: PropTypes.string,
  time: PropTypes.string,
  textStyle: PropTypes.shape({}),
  timeStyle: PropTypes.shape({}),
};

export default TimePickerWrapper;
