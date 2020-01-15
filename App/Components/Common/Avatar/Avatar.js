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
    const { src, uri, initialsText, style, textStyle, textBorderStyle } = this.props;

    if (src || uri) {
      return (
        <ImageWrapper {...this.props} style={[styles.avatarStyle, style]} memoSrc={src} uri={uri} />
      );
    }

    return (
      <View
        {...this.props}
        style={[styles.avatarStyle, styles.textBorderStyle, style, textBorderStyle]}
      >
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
  textBorderStyle: {
    height: toBaseDesignPx(110),
    width: toBaseDesignPx(110),
    borderRadius: toBaseDesignPx(100),
  },
  textViewStyle: {
    width: toBaseDesignPx(110),
    height: toBaseDesignPx(110),
    alignItems: 'center',
    justifyContent: 'center',
    ...spacers.MR_0,
    ...spacers.ML_0,
    ...spacers.MB_0,
    ...spacers.MT_0,
  },
  textStyle: {
    color: colors.GRAY,
    fontSize: RFValue(40),
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
  textBorderStyle: null,
};

Avatar.propTypes = {
  src: PropTypes.number,
  uri: PropTypes.string,
  initialsText: PropTypes.string,
  style: ViewPropTypes.style,
  textStyle: PropTypes.shape({}),
  textBorderStyle: PropTypes.shape({}),
};

export default Avatar;
