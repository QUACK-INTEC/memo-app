import React from 'react';
import { StyleSheet, ViewPropTypes, View } from 'react-native';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';

// Theme
import { fonts, colors, toBaseDesignPx } from '../../../Core/Theme';

// Common
import ImageWrapper from '../ImageWrapper';
import Text from '../Text';

class Avatar extends React.Component {
  renderAvatar = () => {
    const { src, uri, initialsText, style } = this.props;

    if (src || uri) {
      return (
        <ImageWrapper {...this.props} style={[styles.avatarStyle, style]} memoSrc={src} uri={uri} />
      );
    }

    return (
      <View {...this.props} style={[styles.avatarStyle, style]}>
        <Text.Medium text={initialsText} style={styles.textStyle} />
      </View>
    );
  };

  render() {
    return <View>{this.renderAvatar()}</View>;
  }
}

const styles = StyleSheet.create({
  avatarStyle: {
    height: toBaseDesignPx(188),
    width: toBaseDesignPx(188),
    borderRadius: toBaseDesignPx(94),
    backgroundColor: colors.GRAY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    ...fonts.SIZE_XXXL,
    color: colors.GRAY,
    fontSize: RFValue(48),
  },
});

Avatar.defaultProps = {
  src: null,
  uri: null,
  initialsText: null,
  style: null,
};

Avatar.propTypes = {
  src: PropTypes.number,
  uri: PropTypes.string,
  initialsText: PropTypes.string,
  style: ViewPropTypes.style,
};

export default Avatar;
