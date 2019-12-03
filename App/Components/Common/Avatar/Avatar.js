import React from 'react';
import { StyleSheet, ViewPropTypes, View } from 'react-native';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';

// Theme
import { colors, toBaseDesignPx, spacers } from '../../../Core/Theme';

// Common
import ImageWrapper from '../ImageWrapper';
import Text from '../Text';

class Avatar extends React.Component {
  renderAvatar = () => {
    const { src, uri, initialsText, style, textStyle } = this.props;

    if (src || uri) {
      return (
        <ImageWrapper {...this.props} style={[styles.avatarStyle, style]} memoSrc={src} uri={uri} />
      );
    }

    return (
      <View {...this.props} style={[styles.avatarStyle, style]}>
        <View style={[style, styles.textViewStyle]}>
          <Text.Medium text={initialsText} style={[styles.textStyle, textStyle]} />
        </View>
      </View>
    );
  };

  render() {
    return this.renderAvatar();
  }
}

const styles = StyleSheet.create({
  avatarStyle: {
    height: toBaseDesignPx(94),
    width: toBaseDesignPx(94),
    borderRadius: toBaseDesignPx(47),
    backgroundColor: colors.GRAY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textViewStyle: {
    width: toBaseDesignPx(94),
    height: toBaseDesignPx(94),
    alignItems: 'center',
    justifyContent: 'center',
    ...spacers.MR_0,
    ...spacers.ML_0,
    ...spacers.MB_0,
    ...spacers.MT_0,
  },
  textStyle: {
    color: colors.GRAY,
    fontSize: RFValue(48),
    textAlign: 'center',
    ...spacers.ML_1,
    ...spacers.MT_1,
    ...spacers.MB_1,
    ...spacers.MR_1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

Avatar.defaultProps = {
  src: null,
  uri: null,
  initialsText: null,
  style: null,
  textStyle: null,
};

Avatar.propTypes = {
  src: PropTypes.number,
  uri: PropTypes.string,
  initialsText: PropTypes.string,
  style: ViewPropTypes.style,
  textStyle: PropTypes.shape({}),
};

export default Avatar;
