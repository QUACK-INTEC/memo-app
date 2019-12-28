import React from 'react';
import { View, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

import Modal from '../Common/Modal';
import { toBaseDesignPx, colors } from '../../Core/Theme';
import { LOADER_SIZE } from './Constants';

const SOURCE_ANIMATION_LOADER = require('../../Core/Assets/Animations/loading.json');
const SOURCE_ANIMATION_EMPTY_FOR_TODAY = require('../../Core/Assets/Animations/emptyForToday2.json');
const SOURCE_ANIMATION_EMPTY_BOX = require('../../Core/Assets/Animations/emptyBox.json');

class LoadingState extends React.Component {
  componentDidMount() {
    if (this.animation) {
      this.animation.play();
    }
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
          width: toBaseDesignPx(105),
          height: toBaseDesignPx(105),
        };
    }
  };

  setRefAnimation = ref => {
    this.animation = ref;
  };

  getAnimationSource = () => {
    const { noEventToday, isEmpty } = this.props;

    if (noEventToday) {
      return SOURCE_ANIMATION_EMPTY_FOR_TODAY;
    }

    if (isEmpty) {
      return SOURCE_ANIMATION_EMPTY_BOX;
    }

    return SOURCE_ANIMATION_LOADER;
  };

  render() {
    const loaderStyle = this.getSize();
    const animationSrc = this.getAnimationSource();
    const { withoutLottie } = this.props;

    if (withoutLottie) {
      return null;
    }

    return <LottieView ref={this.setRefAnimation} style={loaderStyle} source={animationSrc} />;
  }
}

const LoadingStateModal = props => {
  const { isVisible, withoutLottie } = props;
  const styleWithoutLottie = withoutLottie ? { backgroundColor: colors.TRANSPARENT } : null;

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      style={styles.modal}
      backdropColor={withoutLottie ? colors.TRANSPARENT : 'black'}
    >
      <View style={[styles.modalContainerLoader, styleWithoutLottie]}>
        <LoadingState withoutLottie={withoutLottie} />
      </View>
    </Modal>
  );
};

const BaseLoadingState = {
  Small: objProps => <LoadingState {...objProps} />,
  Medium: objProps => <LoadingState {...objProps} size={LOADER_SIZE.MEDIUM} />,
  Large: objProps => <LoadingState {...objProps} size={LOADER_SIZE.LARGE} />,
  Modal: objProps => <LoadingStateModal {...objProps} />,
  NoEvents: objProps => <LoadingState {...objProps} noEventToday size={LOADER_SIZE.MEDIUM} />,
  Empty: objProps => <LoadingState {...objProps} isEmpty size={LOADER_SIZE.MEDIUM} />,
  withoutLottie: objProps => <LoadingStateModal withoutLottie {...objProps} />,
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
    width: toBaseDesignPx(115),
    height: toBaseDesignPx(115),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: toBaseDesignPx(35),
  },
});

LoadingState.defaultProps = {
  size: null,
  noEventToday: false,
  isEmpty: false,
  withoutLottie: false,
};

LoadingState.propTypes = {
  size: PropTypes.string,
  noEventToday: PropTypes.bool,
  isEmpty: PropTypes.bool,
  withoutLottie: PropTypes.bool,
};

LoadingStateModal.defaultProps = {
  isVisible: false,
  withoutLottie: false,
};

LoadingStateModal.propTypes = {
  isVisible: PropTypes.bool,
  withoutLottie: PropTypes.bool,
};

export default BaseLoadingState;
