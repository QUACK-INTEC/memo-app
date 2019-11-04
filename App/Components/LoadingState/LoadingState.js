import React from 'react';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

import { toBaseDesignPx } from '../../Core/Theme';
import { LOADER_SIZE } from './Constants';

const SOURCE_ANIMATION_LOADER = require('../../Core/Assets/Animations/loading.json');

class LoadingState extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  getSize = () => {
    const { size } = this.props;

    switch (size) {
      case LOADER_SIZE.MEDIUM:
        return {
          width: toBaseDesignPx(175),
          height: toBaseDesignPx(175),
        };
      case LOADER_SIZE.LARGE:
        return {
          width: toBaseDesignPx(225),
          height: toBaseDesignPx(225),
        };
      default:
        return {
          width: toBaseDesignPx(125),
          height: toBaseDesignPx(125),
        };
    }
  };

  setRefAnimation = ref => {
    this.animation = ref;
  };

  render() {
    const loaderStyle = this.getSize();

    return (
      <LottieView ref={this.setRefAnimation} style={loaderStyle} source={SOURCE_ANIMATION_LOADER} />
    );
  }
}

const BaseLoadingState = {
  Small: objProps => <LoadingState {...objProps} />,
  Medium: objProps => <LoadingState {...objProps} size={LOADER_SIZE.MEDIUM} />,
  Large: objProps => <LoadingState {...objProps} size={LOADER_SIZE.LARGE} />,
};

LoadingState.defaultProps = {
  size: null,
};

LoadingState.propTypes = {
  size: PropTypes.string,
};

export default BaseLoadingState;
