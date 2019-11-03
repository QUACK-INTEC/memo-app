import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

import LoginForm from '../../Components/Login';

const MEMO_ICON = require('../../Core/Assets/Images/memoIcon.png');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {
    // ValidateApi();
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Home');
  };

  handleRegister = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Register');
  };

  render() {
    const { initialsValue } = this.props;
    return (
      <View style={styles.container}>
        <Image source={MEMO_ICON} resizeMode="contain" style={styles.logoContainer} />
        <LoginForm
          onSubmit={this.handleSubmit}
          onRegister={this.handleRegister}
          initialsValue={initialsValue}
        />
      </View>
    );
  }
}

Login.defaultProps = {
  initialsValue: null,
};

Login.propTypes = {
  initialsValue: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 10,
    width: 250,
    borderRadius: 500,
    height: 250,
    alignSelf: 'center',
  },
});
