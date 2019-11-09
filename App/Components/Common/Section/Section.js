import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { spacers, colors } from '../../../Core/Theme';

// Common
import Text from '../Text';

class Section extends React.Component {
  renderSection = () => {
    const { viewStyle, title, titleStyle, children } = this.props;
    const textStyle = {
      ...styles.titleStyle,
      ...titleStyle,
    };
    return (
      <View style={[styles.viewStyle, viewStyle]}>
        <Text.SemiBold text={title} style={textStyle} />
        {children}
      </View>
    );
  };

  render() {
    return this.renderSection();
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    color: colors.GRAY_LIGHT,
    ...spacers.MB_9,
  },
  viewStyle: {
    ...spacers.ML_3,
  },
});

Section.defaultProps = {
  viewStyle: null,
  titleStyle: null,
  title: null,
};

Section.propTypes = {
  viewStyle: ViewPropTypes.style,
  titleStyle: PropTypes.shape({}),
  title: PropTypes.string,
};

export default Section;
