import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lodash from 'lodash';
import LoadingState from '../../Components/LoadingState';
import Api, { MemoApi } from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';

import PasswordRecoveryCodeForm from '../../Components/PasswordRecoveryCode';

class PasswordRecoveryCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam },
    } = this.props;
    const email = getParam('email', '');

    this.setState({
      email,
    });
  }

  setLoading = isLoading => {
    return this.setState({ isLoading });
  };

  handleSubmit = objValues => {
    const {
      navigation: { navigate },
      logger,
    } = this.props;
    const { email } = this.state;
    let password = Lodash.get(objValues, 'password', '');
    password = password.toLowerCase();

    const otpObject = {
      password,
      email,
    };

    this.setLoading(true);

    return Api.ValidateRecoveryCode(otpObject)
      .then(objResponse => {
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          const strToken = Lodash.get(objResponse, ['data', 'token'], null);
          const objUserInfo = Lodash.get(objResponse, ['data', 'user'], null);
          MemoApi.defaults.headers.common.Authorization = `Bearer ${strToken}`;
          logger.success({
            key: MessagesKey.RECOVERY_CODE_SUCCESS,
            data: objResponse,
          });

          this.setLoading(false);
          return navigate('ChangePassword', { token: strToken, userInfo: objUserInfo });
        }
        this.setLoading(false);
        return logger.error({
          key: MessagesKey.RECOVERY_CODE_FAIL,
          data: objResponse,
        });
      })
      .catch(objError => {
        this.setLoading(false);

        return setTimeout(() => {
          logger.error({
            key: MessagesKey.RECOVERY_CODE_FAIL,
            data: objError,
          });
        }, 1000);
      });
  };

  handleOnPressGoBack = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  render() {
    const { isLoading } = this.state;
    const { initialsValue } = this.props;

    return (
      <>
        <LoadingState.Modal isVisible={isLoading} />
        <PasswordRecoveryCodeForm
          onSubmit={this.handleSubmit}
          initialsValue={initialsValue}
          onBack={this.handleOnPressGoBack}
        />
      </>
    );
  }
}

PasswordRecoveryCode.defaultProps = {
  initialsValue: null,
};

PasswordRecoveryCode.propTypes = {
  initialsValue: PropTypes.shape({}),
};

export default WithLogger(PasswordRecoveryCode);
