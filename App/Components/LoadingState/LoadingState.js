import React from 'react';
import { View, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

import Modal from '../Common/Modal';
import { toBaseDesignPx, colors } from '../../Core/Theme';
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

const LoadingStateModal = props => {
  const { isVisible } = props;
  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      style={styles.modal}
    >
      <View style={styles.modalContainerLoader}>
        <LoadingState />
      </View>
    </Modal>
  );
};

const BaseLoadingState = {
  Small: objProps => <LoadingState {...objProps} />,
  Medium: objProps => <LoadingState {...objProps} size={LOADER_SIZE.MEDIUM} />,
  Large: objProps => <LoadingState {...objProps} size={LOADER_SIZE.LARGE} />,
  Modal: objProps => <LoadingStateModal {...objProps} />,
};

const styles = StyleSheet.create({
  modal: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerLoader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: toBaseDesignPx(175),
    height: toBaseDesignPx(175),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: toBaseDesignPx(35),
  },
});

LoadingState.defaultProps = {
  size: null,
};

LoadingState.propTypes = {
  size: PropTypes.string,
};

LoadingStateModal.defaultProps = {
  isVisible: false,
};

LoadingStateModal.propTypes = {
  isVisible: PropTypes.bool,
};

export default BaseLoadingState;
