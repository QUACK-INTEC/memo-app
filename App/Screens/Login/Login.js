import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Lodash from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from '../../Components/Login';
import ImageWrapper, { MEMO_ASSETS } from '../../Components/Common/ImageWrapper';
import LoadingState from '../../Components/LoadingState';

import Api from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';

import { actions as userActions } from '../../Redux/Common/UserManager';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  setLoading = isLoading => {
    return this.setState({ isLoading });
  };

  handleSubmit = objValues => {
    // console.log("DEBUG OBJ! ",objValues);
    const { logger } = this.props;
    this.setLoading(true);

    return Api.Login(objValues)
      .then(objResponse => {
        // console.log(objResponse);
        const objUserData = Lodash.get(objResponse, ['data'], null);
        logger.success({
          key: MessagesKey.SIGN_IN_SUCCESS,
          data: objResponse,
        });

        return this.handleSuccessLogin(objUserData);
      })
      .catch(objError => {
        // console.log(objError);
        logger.error({
          key: MessagesKey.SIGN_IN_FAILED,
          data: objError,
        });
        return this.setLoading(false);
      });
  };

  handleSuccessLogin = objUserData => {
    const {
      navigation: { navigate },
    } = this.props;
    this.setLoading(false);
    const { setUserInfo } = this.props;

    if (objUserData) {
      setUserInfo(objUserData);
    }

    navigate('Home', objUserData);
  };

  handleRegister = () => {
    const {
      navigation: { navigate },
    } = this.props;
    this.setLoading(false);

    navigate('Register');
  };

  render() {
    const { isLoading } = this.state;
    const { initialsValue } = this.props;
    return (
      <View style={styles.container}>
        <LoadingState.Modal isVisible={isLoading} />
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
  setUserInfo: () => null,
};

Login.propTypes = {
  initialsValue: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  setUserInfo: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUserInfo: userActions.setUserInfo,
    },
    dispatch
  );
};

export default WithLogger(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
