import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, spacers, toBaseDesignPx, fonts } from '../../Core/Theme';

// Common
import InLineComponent from '../Common/InLineComponent';
import Text from '../Common/Text';

class SubjectCalendar extends React.Component {
  handleOnPress = () => {
    const { onPress, disabled } = this.props;

    if (!disabled) {
      return onPress();
    }

    return null;
  };

  render() {
    const { subjectSchedule, subjectName, disabled } = this.props;
    return (
      <TouchableOpacity
        onPress={this.handleOnPress}
        style={styles.viewStyle}
        activeOpacity={disabled ? 1 : 0.2}
      >
        <InLineComponent viewStyle={styles.inLineComponentStyle}>
          <Text.SemiBold text={subjectName} style={styles.subjectStyle} />
          <Text.Light
            numberOfLines={2}
            ellipsizeMode="tail"
            text={subjectSchedule}
            style={styles.scheduleStyle}
          />
        </InLineComponent>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    borderLeftWidth: toBaseDesignPx(7),
    borderLeftColor: colors.GREEN_LIGHT,
    backgroundColor: colors.GREEN_OPACITY_LIGHT,
    borderBottomRightRadius: toBaseDesignPx(5),
    borderTopRightRadius: toBaseDesignPx(5),
  },
  inLineComponentStyle: {
    ...spacers.ML_13,
    ...spacers.MR_13,
    flex: 1,
    justifyContent: 'space-between',
  },
  scheduleStyle: {
    ...spacers.MT_14,
    ...spacers.MB_14,
    color: colors.GRAY,
  },
  subjectStyle: {
    alignSelf: 'center',
    color: colors.GRAY,
    ...fonts.SIZE_XS,
    ...spacers.MT_14,
    ...spacers.MB_14,
    width: toBaseDesignPx(185),
  },
});

SubjectCalendar.defaultProps = {
  onPress: () => null,
  disabled: null,
  subjectName: null,
  subjectSchedule: null,
};

SubjectCalendar.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  subjectName: PropTypes.string,
  subjectSchedule: PropTypes.string,
};

export default SubjectCalendar;
