import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, fonts, toBaseDesignPx } from '../../../Core/Theme';

// Common
import Text from '../Text';
import TimePicker from '../TimePicker';

class TimePickerWrapper extends React.Component {
  renderText = () => {
    const { label, labelStyle } = this.props;
    if (label) {
      return <Text.SemiBold text={label} style={[styles.textStyle, labelStyle]} />;
    }

    return null;
  };

  render() {
    const { time, timeStyle, containerStyle, onChange } = this.props;
    return (
      <>
        <View style={[styles.mainView, containerStyle]}>
          {this.renderText()}
          <TimePicker onChange={onChange} time={time} style={[styles.timeStyle, timeStyle]} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    borderBottomWidth: toBaseDesignPx(2),
    borderColor: colors.GRAY_LIGHT,
  },
  textStyle: { color: colors.GRAY, ...fonts.SIZE_XS },
  timeStyle: { color: colors.GRAY },
});

TimePickerWrapper.defaultProps = {
  label: null,
  time: null,
  labelStyle: null,
  timeStyle: null,
  containerStyle: null,
  onChange: () => null,
};

TimePickerWrapper.propTypes = {
  label: PropTypes.string,
  time: PropTypes.string,
  labelStyle: PropTypes.shape({}),
  timeStyle: PropTypes.shape({}),
  containerStyle: PropTypes.shape({}),
  onChange: PropTypes.func,
};

export default TimePickerWrapper;
