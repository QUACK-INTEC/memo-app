import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { spacers, toBaseDesignPx, fonts, colors } from '../../Core/Theme';

// Common
import InLineComponent from '../Common/InLineComponent';
import Text from '../Common/Text';
import Avatar from '../Common/Avatar';
import ImageWrapper from '../Common/ImageWrapper';

class ParticipantCard extends React.Component {
  handleOnPress = () => {
    const { onPress, disabled } = this.props;

    if (!disabled) {
      return onPress();
    }

    return null;
  };

  render() {
    const {
      participantName,
      style,
      avatarSrc,
      avatarUri,
      initialsText,
      badgeSrc,
      badgeUri,
    } = this.props;
    return (
      <TouchableOpacity style={[styles.buttonStyle, style]} onPress={this.handleOnPress}>
        <InLineComponent>
          <Avatar
            src={avatarSrc}
            uri={avatarUri}
            initialsText={initialsText}
            style={styles.avatarStyle}
            textStyle={styles.avatarTextStyle}
          />
          <Text.Medium text={participantName} style={styles.participantStyle} />
          <ImageWrapper memoSrc={badgeSrc} uri={badgeUri} style={styles.badgeStyle} />
        </InLineComponent>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  avatarStyle: {
    height: toBaseDesignPx(32),
    width: toBaseDesignPx(32),
    borderRadius: toBaseDesignPx(16),
    ...spacers.MR_8,
    ...spacers.ML_8,
  },
  participantStyle: {
    ...fonts.SIZE_XS,
    color: colors.GRAY_LIGHT,
    ...spacers.MR_1,
  },
  badgeStyle: {
    width: toBaseDesignPx(12),
    height: toBaseDesignPx(12),
  },
  avatarTextStyle: {
    ...fonts.SIZE_XL,
  },
  buttonStyle: {
    borderRadius: toBaseDesignPx(4),
    borderColor: colors.GRAY,
    borderWidth: toBaseDesignPx(1),
    backgroundColor: colors.WHITE,
    ...spacers.PA_2,
    ...spacers.ML_7,
    ...spacers.MR_7,
  },
});

ParticipantCard.defaultProps = {
  style: null,
  avatarSrc: null,
  avatarUri: null,
  initialsText: null,
  badgeSrc: null,
  badgeUri: null,
  onPress: () => null,
  disabled: null,
};

ParticipantCard.propTypes = {
  participantName: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  avatarSrc: PropTypes.number,
  avatarUri: PropTypes.string,
  initialsText: PropTypes.string,
  badgeSrc: PropTypes.number,
  badgeUri: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ParticipantCard;
