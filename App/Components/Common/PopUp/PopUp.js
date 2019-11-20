import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, toBaseDesignPx, spacers } from '../../../Core/Theme';

import Modal from '../Modal';
import Button from '../Button';
import Text from '../Text';
import InLineComponent from '../InLineComponent';

class PopUp extends React.Component {
  renderOptionButtons = () => {
    const {
      isInfo,
      buttonText,
      buttonStyle,
      onButtonPress,
      leftButtonText,
      rightButtonText,
      leftButtonStyle,
      rightButtonStyle,
      onLeftPress,
      onRightPress,
    } = this.props;
    if (isInfo) {
      return (
        <Button
          label={buttonText}
          containerStyle={[styles.defaultButtonStyle, styles.buttonStyle, buttonStyle]}
          onPress={onButtonPress}
          textStyle={styles.buttonTextStyle}
        />
      );
    }
    return (
      <InLineComponent viewStyle={{ justifyContent: 'space-around' }}>
        <Button
          label={leftButtonText}
          containerStyle={[styles.defaultButtonStyle, styles.leftButtonStyle, leftButtonStyle]}
          onPress={onLeftPress}
          textStyle={styles.buttonTextStyle}
        />
        <Button
          label={rightButtonText}
          containerStyle={[styles.defaultButtonStyle, styles.rightButtonStyle, rightButtonStyle]}
          onPress={onRightPress}
          textStyle={styles.buttonTextStyle}
        />
      </InLineComponent>
    );
  };

  render() {
    const { title, titleStyle, isVisible, children } = this.props;
    return (
      <Modal isVisible={isVisible} {...this.props}>
        <View style={styles.modalViewContainer}>
          <Text.Medium text={title} style={[styles.titleStyle, titleStyle]} />
          {children}
          {this.renderOptionButtons()}
        </View>
      </Modal>
    );
  }
}

const SimplePopUp = {
  Info: objProps => <PopUp {...objProps} isInfo />,
  Default: objProps => <PopUp {...objProps} isInfo={false} />,
};

const styles = StyleSheet.create({
  defaultButtonStyle: {
    borderRadius: toBaseDesignPx(5),
    width: toBaseDesignPx(115),
    height: toBaseDesignPx(41),
    ...spacers.MB_7,
  },
  leftButtonStyle: {
    backgroundColor: 'red',
    ...spacers.MR_8,
  },
  rightButtonStyle: {
    backgroundColor: colors.GREEN,
    ...spacers.ML_8,
  },
  buttonStyle: {
    backgroundColor: colors.GREEN,
  },
  buttonTextStyle: {
    color: colors.WHITE,
    ...spacers.ML_1,
    ...spacers.MR_1,
  },
  modalViewContainer: {
    ...spacers.PA_7,
    backgroundColor: colors.WHITE,
    borderRadius: toBaseDesignPx(21),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: colors.GRAY,
    ...spacers.ML_15,
    ...spacers.MR_15,
    ...spacers.MB_7,
    ...spacers.MT_7,
  },
});

PopUp.defaultProps = {
  isInfo: null,
  buttonText: null,
  buttonStyle: null,
  onButtonPress: () => null,
  leftButtonText: null,
  rightButtonText: null,
  leftButtonStyle: null,
  rightButtonStyle: null,
  onLeftPress: () => null,
  onRightPress: () => null,
  title: null,
  titleStyle: null,
  isVisible: null,
};

PopUp.propTypes = {
  isInfo: PropTypes.bool,
  buttonText: PropTypes.string,
  buttonStyle: PropTypes.shape({}),
  onButtonPress: PropTypes.func,
  leftButtonText: PropTypes.string,
  rightButtonText: PropTypes.string,
  leftButtonStyle: PropTypes.shape({}),
  rightButtonStyle: PropTypes.shape({}),
  onLeftPress: PropTypes.func,
  onRightPress: PropTypes.func,
  title: PropTypes.string,
  titleStyle: PropTypes.shape({}),
  isVisible: PropTypes.bool,
};

export default SimplePopUp;
