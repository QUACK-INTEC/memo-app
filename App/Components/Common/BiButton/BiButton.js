import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { toBaseDesignPx } from '../../../Core/Theme';

// Common
import InLineComponent from '../InLineComponent';

class BiButon extends React.Component {
  handleLeftPress = () => {
    const { onLeftPress, disabled, leftDisabled } = this.props;

    if (!(disabled || leftDisabled)) {
      return onLeftPress();
    }

    return null;
  };

  handleRightPress = () => {
    const { onRightPress, disabled, rightDisabled } = this.props;

    if (!(disabled || rightDisabled)) {
      return onRightPress();
    }

    return null;
  };

  render() {
    const { leftChild, rightChild } = this.props;
    return (
      <InLineComponent viewStyle={styles.inLineComponentStyle}>
        <TouchableOpacity onPress={this.handleLeftPress}>
          {leftChild(styles.leftButtonStyle)}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleRightPress}>
          <View style={styles.rightButtonStyle}>{rightChild(styles.rightButtonStyle)}</View>
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
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.11,
    shadowRadius: 6,
    elevation: 1,
    borderColor: 'rgba(0,0,0,0.11)',
    borderWidth: 1,
  },
  leftButtonStyle: {
    borderRightColor: 'rgba(103,103,103,0.47)',
    borderRightWidth: toBaseDesignPx(0.5),
    width: toBaseDesignPx(82.7),
    height: toBaseDesignPx(44.5),
    borderTopLeftRadius: toBaseDesignPx(11.5),
    borderBottomLeftRadius: toBaseDesignPx(11.5),
  },
  rightButtonStyle: {
    borderLeftColor: 'rgba(103,103,103,0.47)',
    borderLeftWidth: toBaseDesignPx(0.5),
    width: toBaseDesignPx(82.7),
    height: toBaseDesignPx(44.5),
    borderTopRightRadius: toBaseDesignPx(11.5),
    borderBottomRightRadius: toBaseDesignPx(11.5),
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
};

BiButon.propTypes = {
  onRightPress: PropTypes.func,
  rightDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  onLeftPress: PropTypes.func,
  leftDisabled: PropTypes.bool,
  leftChild: PropTypes.func,
  rightChild: PropTypes.func,
};

export default BiButon;
