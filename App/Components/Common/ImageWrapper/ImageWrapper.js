/* eslint-disable react/no-unused-state */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

// TODO: Implementar isLoading & Source Dinamico
class ImageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { src, style, uri } = this.props;
    return (
      <Image
        source={src ? require('../../../Core/Assets/Images/LogoMemo.jpg') : { uri }}
        style={style}
      />
    );
  }
}

ImageWrapper.defaultProps = {
  src: null,
  style: null,
  uri: 'https://t3.ftcdn.net/jpg/01/17/72/36/240_F_117723612_z7zQmUrrpG4IRGQLvgX5nwtwC18ke3qU.jpg',
};

ImageWrapper.propTypes = {
  src: PropTypes.string,
  style: ViewPropTypes.style,
  uri: PropTypes.string,
};

export default ImageWrapper;
