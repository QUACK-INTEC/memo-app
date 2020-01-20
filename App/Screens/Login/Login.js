import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Lodash from 'lodash';

import LoginForm from '../../Components/Login';
import ImageWrapper, { MEMO_ASSETS } from '../../Components/Common/ImageWrapper';
import LoadingState from '../../Components/LoadingState';
import Api, { MemoApi } from '../../Core/Api';
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

  handleSubmit = ({ email, password }) => {
    const {
      navigation: { navigate },
      setUserToken,
      logger,
      setUserInfo,
    } = this.props;
    this.setLoading(true);
    return Api.Login({ email, password })
      .then(objResponse => {
        const strToken = Lodash.get(objResponse, ['data', 'token'], null);
        const objUserInfo = Lodash.get(objResponse, ['data', 'user'], null);
        setUserToken(strToken);
        setUserInfo(objUserInfo);
        MemoApi.defaults.headers.common.Authorization = `Bearer ${strToken}`;
        logger.success({
          key: MessagesKey.SIGN_IN_SUCCESS,
          data: objResponse,
        });

        return navigate('Home');
      })
      .catch(objError => {
        this.setLoading(false);
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.SIGN_IN_FAILED,
            data: objError,
          });
        }, 1050);
      });
  };

  handleRegister = () => {
    const {
      navigation: { push },
    } = this.props;
    push('Register');
  };

  handlePasswordRecovery = () => {
    const {
      navigation: { push },
    } = this.props;
    push('RecoverPassword');
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        <LoadingState.Modal isVisible={isLoading} />
        <ImageWrapper memoSrc={MEMO_ASSETS.ICON} style={styles.logoContainer} />
        <LoginForm
          isLoading={isLoading}
          onSubmit={this.handleSubmit}
          onRegister={this.handleRegister}
          onPasswordRecovery={this.handlePasswordRecovery}
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
  setUserToken: () => null,
  setUserInfo: () => null,
};

Login.propTypes = {
  initialsValue: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  setUserToken: PropTypes.func,
  setUserInfo: PropTypes.func,
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUserInfo: userActions.setUserInfo,
      setUserToken: userActions.setUserToken,
    },
    dispatch
  );
};

export default WithLogger(connect(null, mapDispatchToProps)(Login));
