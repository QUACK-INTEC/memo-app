import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

class InLineComponent extends React.Component {
  renderInLineComponent = () => {
    const { leftChild, rightChild, viewStyle, children } = this.props;
    return (
      <View style={[styles.viewStyle, viewStyle]}>
        {leftChild()}
        {rightChild()}
        {children}
      </View>
    );
  };

  render() {
    return this.renderInLineComponent();
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

InLineComponent.defaultProps = {
  leftChild: () => null,
  rightChild: () => null,
  viewStyle: null,
};

InLineComponent.propTypes = {
  leftChild: PropTypes.func,
  rightChild: PropTypes.func,
  viewStyle: ViewPropTypes.style,
};

export default InLineComponent;
