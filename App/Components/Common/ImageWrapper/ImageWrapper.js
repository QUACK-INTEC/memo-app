/* eslint-disable react/no-unused-state */
import React from 'react';
import { Image, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { toBaseDesignPx } from '../../../Core/Theme';

// TODO: Implementar isLoading

class ImageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { style, uri, memoSrc } = this.props;
    return <Image {...this.props} source={memoSrc || { uri }} style={[styles.image, style]} />;
  }
}

const styles = StyleSheet.create({
  image: {
    width: toBaseDesignPx(256),
    height: toBaseDesignPx(256),
  },
});

ImageWrapper.defaultProps = {
  memoSrc: null,
  style: null,
  uri: 'https://t3.ftcdn.net/jpg/01/17/72/36/240_F_117723612_z7zQmUrrpG4IRGQLvgX5nwtwC18ke3qU.jpg',
};

ImageWrapper.propTypes = {
  memoSrc: PropTypes.number,
  style: ViewPropTypes.style,
  uri: PropTypes.string,
};

export default ImageWrapper;
