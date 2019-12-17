import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, spacers, toBaseDesignPx, fonts } from '../../Core/Theme';

// Common
import InLineComponent from '../Common/InLineComponent';
import Text from '../Common/Text';
import Avatar from '../Common/Avatar';
import ImageWrapper from '../Common/ImageWrapper';

class EventCalendar extends React.Component {
  handleOnPress = () => {
    const { onPress, disabled } = this.props;

    if (!disabled) {
      return onPress();
    }

    return null;
  };

  getEventStyle = () => {
    const { isPrivate } = this.props;
    return isPrivate ? styles.privateEventStyle : styles.publicEventStyle;
  };

  render() {
    const {
      subjectName,
      eventTitle,
      eventStartTime,
      avatarSrc,
      avatarUri,
      initialsText,
      author,
      badgeSrc,
      badgeUri,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={this.handleOnPress}
        style={[styles.viewStyle, this.getEventStyle()]}
      >
        <Text.Medium text={`Evento en ${subjectName}`} style={styles.subjectStyle} />
        <Text.SemiBold text={eventTitle} style={styles.eventStyle} />
        <Text.Light text={`Hora: ${eventStartTime}`} style={styles.timeStyle} />
        <InLineComponent viewStyle={styles.inLineComponentStyle}>
          <Avatar
            src={avatarSrc}
            uri={avatarUri}
            initialsText={initialsText}
            style={styles.avatarStyle}
            textStyle={styles.avatarTextStyle}
          />
          <Text.Medium
            text={author}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.authorStyle}
          />
          <ImageWrapper memoSrc={badgeSrc} uri={badgeUri} style={styles.badgeStyle} />
        </InLineComponent>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    borderLeftWidth: toBaseDesignPx(7),
    borderBottomRightRadius: toBaseDesignPx(5),
    borderTopRightRadius: toBaseDesignPx(5),
  },
  publicEventStyle: {
    backgroundColor: colors.PURPLE_LIGHT,
    borderLeftColor: colors.PURPLE,
  },
  privateEventStyle: {
    backgroundColor: colors.ORANGE_LIGHT,
    borderLeftColor: colors.ORANGE,
  },
  inLineComponentStyle: {
    justifyContent: 'flex-end',
    ...spacers.MB_2,
  },
  subjectStyle: {
    ...fonts.SIZE_XS,
    ...spacers.ML_13,
    ...spacers.MT_14,
    ...spacers.MB_1,
    color: colors.GRAY,
  },
  eventStyle: {
    ...fonts.SIZE_S,
    ...spacers.ML_13,
    ...spacers.MB_1,
    color: colors.GRAY,
  },
  timeStyle: {
    ...fonts.SIZE_XS,
    ...spacers.ML_13,
    ...spacers.MB_9,
    color: colors.GRAY,
  },
  avatarStyle: {
    height: toBaseDesignPx(16),
    width: toBaseDesignPx(16),
    borderRadius: toBaseDesignPx(8),
    justifyContent: 'flex-end',
    ...spacers.MR_1,
  },
  authorStyle: {
    ...fonts.SIZE_XS,
    color: colors.GRAY,
    justifyContent: 'flex-end',
    ...spacers.MR_1,
  },
  badgeStyle: {
    width: toBaseDesignPx(11.5),
    height: toBaseDesignPx(11.5),
    justifyContent: 'flex-end',
    ...spacers.MR_2,
  },
  avatarTextStyle: {
    ...fonts.SIZE_XS,
  },
});

EventCalendar.defaultProps = {
  onPress: () => null,
  disabled: null,
  isPrivate: null,
  avatarSrc: null,
  avatarUri: null,
  initialsText: null,
  badgeSrc: null,
  badgeUri: null,
};

EventCalendar.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  subjectName: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool,
  eventTitle: PropTypes.string.isRequired,
  eventStartTime: PropTypes.string.isRequired,
  avatarSrc: PropTypes.number,
  avatarUri: PropTypes.string,
  initialsText: PropTypes.string,
  author: PropTypes.string.isRequired,
  badgeSrc: PropTypes.number,
  badgeUri: PropTypes.string,
};

export default EventCalendar;
