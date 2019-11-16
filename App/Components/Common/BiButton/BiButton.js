import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { toBaseDesignPx, colors } from '../../../Core/Theme';

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

  renderLeftChild = () => {
    const { leftChild } = this.props;

    return (
      <TouchableOpacity
        onPress={this.handleLeftPress}
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
          {leftChild()}
        </View>
      </TouchableOpacity>
    );
  };

  renderRightChild = () => {
    const { rightChild } = this.props;

    return (
      <TouchableOpacity onPress={this.handleRightPress} style={{ flex: 1 }}>
        {rightChild(styles.rightButtonStyle)}
      </TouchableOpacity>
    );
  };

  render() {
    const {  divisionBarColor } = this.props;
    const divisionColor = divisionBarColor || colors.GRAY_LIGHT;
    return (
      <InLineComponent viewStyle={styles.inLineComponentStyle}>
        {this.renderLeftChild()}
        <View
          style={{
            width: toBaseDesignPx(0.7),
            backgroundColor: divisionColor,
            height: '100%',
          }}
        />
        {this.renderRightChild()}
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
    borderWidth: toBaseDesignPx(0.5),
    overflow: 'hidden',
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
