import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { toBaseDesignPx, colors } from '../../../Core/Theme';

// Common
import InLineComponent from '../InLineComponent';

class BiButon extends React.Component {
  constructor(props) {
    super(props);
    const { isRightPressed, isLeftPressed } = this.props;
    this.state = {
      isLeftPressed,
      isRightPressed,
    };
  }

  handleRightPress = () => {
    const { onRightPress, disabled, rightDisabled } = this.props;

    if (!(disabled || rightDisabled)) {
      this.setState(
        prevState => ({ isRightPressed: !prevState.isRightPressed, isLeftPressed: false }),
        () => {
          const { isRightPressed } = this.state;
          return onRightPress(isRightPressed);
        }
      );
    }

    return null;
  };

  handleLeftPress = () => {
    const { onLeftPress, disabled, leftDisabled } = this.props;

    if (!(disabled || leftDisabled)) {
      this.setState(
        prevState => ({ isLeftPressed: !prevState.isLeftPressed, isRightPressed: false }),
        () => {
          const { isLeftPressed } = this.state;
          return onLeftPress(isLeftPressed);
        }
      );
    }

    return null;
  };

  render() {
    const { divisionBarColor } = this.props;
    const divisionColor = divisionBarColor || colors.GRAY_LIGHT;
    const { leftChild, rightChild, leftButtonStyle, rightButtonStyle } = this.props;
    return (
      <InLineComponent viewStyle={styles.inLineComponentStyle}>
        <TouchableOpacity onPress={this.handleLeftPress} style={styles.flexStyle}>
          <View style={[styles.leftButtonStyle, leftButtonStyle]}>{leftChild()}</View>
        </TouchableOpacity>
        <View style={[styles.divisonBarStyle, { backgroundColor: divisionColor }]} />
        <TouchableOpacity onPress={this.handleRightPress} style={styles.flexstyle}>
          <View style={[styles.rightButtonStyle, rightButtonStyle]}>{rightChild()}</View>
        </TouchableOpacity>
      </InLineComponent>
    );
  }
}

const styles = StyleSheet.create({
  inLineComponentStyle: {
    width: toBaseDesignPx(165.4),
    height: toBaseDesignPx(44.5),
    borderRadius: toBaseDesignPx(11.5),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: toBaseDesignPx(0),
      height: toBaseDesignPx(3),
    },
    shadowRadius: toBaseDesignPx(6),
    shadowOpacity: toBaseDesignPx(0.11),
    elevation: toBaseDesignPx(1),
  },
  leftButtonStyle: {
    width: toBaseDesignPx(82.7),
    height: toBaseDesignPx(44.5),
    borderTopLeftRadius: toBaseDesignPx(11.5),
    borderBottomLeftRadius: toBaseDesignPx(11.5),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  rightButtonStyle: {
    width: toBaseDesignPx(82.7),
    height: toBaseDesignPx(44.5),
    borderTopRightRadius: toBaseDesignPx(11.5),
    borderBottomRightRadius: toBaseDesignPx(11.5),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flexStyle: {
    flex: 1,
  },
  divisonBarStyle: {
    width: toBaseDesignPx(0.7),
    height: '100%',
  },
});

BiButon.defaultProps = {
  onRightPress: () => null,
  rightDisabled: false,
  disabled: false,
  onLeftPress: () => null,
  leftDisabled: false,
  leftChild: () => null,
  rightChild: () => null,
  rightButtonStyle: null,
  leftButtonStyle: null,
  divisionBarColor: null,
  isLeftPressed: false,
  isRightPressed: false,
};

BiButon.propTypes = {
  onRightPress: PropTypes.func,
  rightDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  onLeftPress: PropTypes.func,
  leftDisabled: PropTypes.bool,
  leftChild: PropTypes.func,
  rightChild: PropTypes.func,
  rightButtonStyle: ViewPropTypes.style,
  leftButtonStyle: ViewPropTypes.style,
  divisionBarColor: PropTypes.string,
  isLeftPressed: PropTypes.bool,
  isRightPressed: PropTypes.bool,
};

export default BiButon;
