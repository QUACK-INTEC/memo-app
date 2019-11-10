import React from 'react';
import { StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, fonts } from '../../../Core/Theme';

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

  renderLeftIcon() {
    const { leftMemoSrc, leftMemoUri } = this.props;

    if (leftMemoSrc || leftMemoUri) {
      return <ImageWrapper memoSrc={leftMemoSrc} uri={leftMemoUri} />;
    }

    return null;
  }

  renderRightIcon() {
    const { rightMemoSrc, rightMemoUri } = this.props;

    if (rightMemoSrc || rightMemoUri) {
      return <ImageWrapper memoSrc={rightMemoSrc} uri={rightMemoUri} />;
    }

    return null;
  }

  render() {
    const { text, textStyle } = this.props;
    return (
      <TouchableOpacity onPress={this.handleOnPress}>
        <InLineComponent>
          {this.renderLeftIcon()}
          <Text.Black style={[styles.textStyle, textStyle]} text={text} />
          {this.renderRightIcon()}
        </InLineComponent>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: { textDecorationLine: 'underline', color: colors.GRAY, ...fonts.SIZE_XS },
});

Link.defaultProps = {
  textStyle: null,
  leftMemoSrc: null,
  leftMemoUri: null,
  rightMemoSrc: null,
  rightMemoUri: null,
  disabled: null,
  onPress: () => null,
};

Link.propTypes = {
  text: PropTypes.string.isRequired,
  textStyle: ViewPropTypes.style,
  leftMemoSrc: PropTypes.string,
  leftMemoUri: PropTypes.string,
  rightMemoSrc: PropTypes.string,
  rightMemoUri: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Link;
