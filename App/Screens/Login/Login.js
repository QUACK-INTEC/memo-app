import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import LoginForm from '../../Components/Login';
import ImageWrapper, { MEMO_ASSETS } from '../../Components/Common/ImageWrapper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {
    // TO-DO: ValidateApi();
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
        <ImageWrapper memoSrc={MEMO_ASSETS.ICON} style={styles.logoContainer} />
        <LoginForm
          onSubmit={this.handleSubmit}
          onRegister={this.handleRegister}
          initialsValue={initialsValue}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignSelf: 'center',
  },
});

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
