import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, spacers, toBaseDesignPx } from '../../Core/Theme';

// Common
import InLineComponent from '../Common/InLineComponent';
import Text from '../Common/Text';

class SubjectCalendar extends React.Component {
  renderSubjectName = () => {
    const { subjectName } = this.props;
    return <Text.SemiBold text={subjectName} style={styles.subjectStyle} />;
  };

  renderSubjectSchedule = () => {
    const { subjectSchedule } = this.props;
    return <Text.Light text={subjectSchedule} style={styles.scheduleStyle} />;
  };

  handleOnPress = () => {
    const { onPress, disabled } = this.props;

    if (!disabled) {
      return onPress();
    }

    return null;
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handleOnPress} style={styles.viewStyle}>
        <InLineComponent
          leftChild={this.renderSubjectName}
          rightChild={this.renderSubjectSchedule}
          viewStyle={styles.inLineComponentStyle}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    borderLeftWidth: toBaseDesignPx(7),
    borderLeftColor: colors.GREEN_LIGHT,
    backgroundColor: 'rgba(120, 180, 145, 0.3)',
    borderRadius: toBaseDesignPx(5),
  },
  inLineComponentStyle: {
    justifyContent: 'space-between',
  },
  scheduleStyle: {
    justifyContent: 'flex-end',
    ...spacers.MR_8,
    alignSelf: 'center',
    ...spacers.MT_14,
    ...spacers.MB_14,
    color: colors.GRAY,
  },
  subjectStyle: {
    justifyContent: 'flex-start',
    ...spacers.ML_13,
    alignSelf: 'center',
    color: colors.GRAY,
    ...spacers.MT_14,
    ...spacers.MB_14,
    width: toBaseDesignPx(220),
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
