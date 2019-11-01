import React from 'react';
import { Text, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { fonts } from '../../../Core/Theme';

const TextBlack = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.black, style]}>
      {text}
    </Text>
  );
};

const TextItalicBlack = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.italicBlack, style]}>
      {text}
    </Text>
  );
};

const TextBold = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.bold, style]}>
      {text}
    </Text>
  );
};

const TextExtraBold = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.extraBold, style]}>
      {text}
    </Text>
  );
};

const TextItalicBold = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.italicBold, style]}>
      {text}
    </Text>
  );
};

const TextLight = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.light, style]}>
      {text}
    </Text>
  );
};

const TextExtraLight = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.extraLight, style]}>
      {text}
    </Text>
  );
};

const TextItalicLight = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.italicLight, style]}>
      {text}
    </Text>
  );
};

const TextMedium = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.medium, style]}>
      {text}
    </Text>
  );
};

const TextMediumItalic = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.mediumItalic, style]}>
      {text}
    </Text>
  );
};

const TextSemiBold = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.semiBold, style]}>
      {text}
    </Text>
  );
};

const TextSemiBoldItalic = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.semiBoldItalic, style]}>
      {text}
    </Text>
  );
};

const TextThin = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.thin, style]}>
      {text}
    </Text>
  );
};

const TextThinItalic = objProps => {
  const { style, text } = objProps;
  return (
    <Text {...objProps} style={[styles.thinItalic, style]}>
      {text}
    </Text>
  );
};

const BaseText = {
  Black: TextBlack,
  ItalicBlack: TextItalicBlack,
  Bold: TextBold,
  ExtraBold: TextExtraBold,
  ItalicBold: TextItalicBold,
  Light: TextLight,
  ExtraLight: TextExtraLight,
  ItalicLight: TextItalicLight,
  Medium: TextMedium,
  MediumItalic: TextMediumItalic,
  SemiBold: TextSemiBold,
  SemiBoldItalic: TextSemiBoldItalic,
  Thin: TextThin,
  thinItalic: TextThinItalic,
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
    ...fonts.extraBold,
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
  style: null,
};

BaseText.propTypes = {
  text: PropTypes.string,
  style: ViewPropTypes.style,
};

export default BaseText;
