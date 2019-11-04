import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { fonts } from '../../../Core/Theme';

class BaseText extends React.Component {
  renderText = () => {
    const { style, text, predefinedStyle } = this.props;
    return (
      <Text {...this.props} style={[predefinedStyle, style]}>
        {text}
      </Text>
    );
  };

  render() {
    return this.renderText();
  }
}

const SimpleBaseText = {
  Black: objProps => <BaseText {...objProps} predefinedStyle={styles.black} />,
  ItalicBlack: objProps => <BaseText {...objProps} predefinedStyle={styles.italicBold} />,
  Bold: objProps => <BaseText {...objProps} predefinedStyle={styles.bold} />,
  ExtraBold: objProps => <BaseText {...objProps} predefinedStyle={styles.extraBold} />,
  ItalicBold: objProps => <BaseText {...objProps} predefinedStyle={styles.italicBold} />,
  Light: objProps => <BaseText {...objProps} predefinedStyle={styles.light} />,
  ExtraLight: objProps => <BaseText {...objProps} predefinedStyle={styles.extraLight} />,
  ItalicLight: objProps => <BaseText {...objProps} predefinedStyle={styles.italicLight} />,
  Medium: objProps => <BaseText {...objProps} predefinedStyle={styles.medium} />,
  MediumItalic: objProps => <BaseText {...objProps} predefinedStyle={styles.mediumItalic} />,
  SemiBold: objProps => <BaseText {...objProps} predefinedStyle={styles.semiBold} />,
  SemiBoldItalic: objProps => <BaseText {...objProps} predefinedStyle={styles.semiBoldItalic} />,
  Thin: objProps => <BaseText {...objProps} predefinedStyle={styles.thin} />,
  thinItalic: objProps => <BaseText {...objProps} predefinedStyle={styles.thinItalic} />,
};

const styles = StyleSheet.create({
  black: {
    ...fonts.BLACK,
    ...fonts.SIZE_S,
  },
  italicBlack: {
    ...fonts.ITALIC_BLACK,
    ...fonts.SIZE_S,
  },
  bold: {
    ...fonts.BOLD,
    ...fonts.SIZE_S,
  },
  extraBold: {
    ...fonts.EXTRA_BOLD,
    ...fonts.SIZE_S,
  },
  italicBold: {
    ...fonts.ITALIC_BOLD,
    ...fonts.SIZE_S,
  },
  light: {
    ...fonts.LIGHT,
    ...fonts.SIZE_S,
  },
  extraLight: {
    ...fonts.EXTRA_LIGHT,
    ...fonts.SIZE_S,
  },
  italicLight: {
    ...fonts.ITALIC_LIGHT,
    ...fonts.SIZE_S,
  },
  medium: {
    ...fonts.MEDIUM,
    ...fonts.SIZE_S,
  },
  mediumItalic: {
    ...fonts.MEDIUM_ITALIC,
    ...fonts.SIZE_S,
  },
  semiBold: {
    ...fonts.SEMI_BOLD,
    ...fonts.SIZE_S,
  },
  semiBoldItalic: {
    ...fonts.SEMI_BOLD_ITALIC,
    ...fonts.SIZE_S,
  },
  thin: {
    ...fonts.THIN,
    ...fonts.SIZE_S,
  },
  thinItalic: {
    ...fonts.THIN_ITALIC,
    ...fonts.SIZE_S,
  },
});

BaseText.defaultProps = {
  text: null,
};

BaseText.propTypes = {
  text: PropTypes.string,
};

export default SimpleBaseText;
