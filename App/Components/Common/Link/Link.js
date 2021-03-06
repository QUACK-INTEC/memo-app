import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, fonts, toBaseDesignPx } from '../../../Core/Theme';

// Common
import ImageWrapper from '../ImageWrapper';
import InLineComponent from '../InLineComponent';
import Text from '../Text';

class Link extends React.Component {
  handleOnPress = () => {
    const { onPress, disabled } = this.props;

    if (!disabled) {
      return onPress();
    }

    return null;
  };

  renderLeftIcon = () => {
    const { leftMemoSrc, leftUri } = this.props;

    if (leftMemoSrc || leftUri) {
      return <ImageWrapper memoSrc={leftMemoSrc} uri={leftUri} style={styles.badgeStyle} />;
    }

    return null;
  };

  renderRightIcon = () => {
    const { rightMemoSrc, rightUri } = this.props;

    if (rightMemoSrc || rightUri) {
      return <ImageWrapper memoSrc={rightMemoSrc} uri={rightUri} style={styles.badgeStyle} />;
    }

    return null;
  };

  render() {
    const { text, textStyle } = this.props;
    return (
      <TouchableOpacity onPress={this.handleOnPress}>
        <InLineComponent leftChild={this.renderLeftIcon} rightChild={this.renderRightIcon}>
          <Text.Black {...this.props} style={[styles.textStyle, textStyle]} text={text} />
        </InLineComponent>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: { textDecorationLine: 'underline', color: colors.GRAY, ...fonts.SIZE_XS },
  badgeStyle: {
    width: toBaseDesignPx(11.5),
    height: toBaseDesignPx(11.5),
    justifyContent: 'flex-end',
  },
});

Link.defaultProps = {
  textStyle: null,
  leftMemoSrc: null,
  leftUri: null,
  rightMemoSrc: null,
  rightUri: null,
  disabled: null,
  onPress: () => null,
};

Link.propTypes = {
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.shape({}),
  leftMemoSrc: PropTypes.number,
  leftUri: PropTypes.string,
  rightMemoSrc: PropTypes.number,
  rightUri: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Link;
