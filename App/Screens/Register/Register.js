import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lodash from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RegisterComponent from '../../Components/Register';
import LoadingState from '../../Components/LoadingState';
import Api, { MemoApi } from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';

import { actions as userActions } from '../../Redux/Common/UserManager';

class Register extends Component {
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
    const { logger } = this.props;
    this.setLoading(true);

    return Api.Register(objValues)
      .then(objResponse => {
        logger.success({
          key: MessagesKey.REGISTER_SUCCESS,
          data: objResponse,
        });

        return this.handleSuccessRegister(objValues);
      })
      .catch(objError => {
        this.setLoading(false);

        return setTimeout(() => {
          logger.error({
            key: MessagesKey.REGISTER_FAILED,
            data: objError,
          });
        }, 1000);
      });
  };

  handleSuccessRegister = objValues => {
    const {
      setUserInfo,
      navigation: { navigate },
      logger,
    } = this.props;
    const { email, password } = objValues;
    return Api.Login({ email, password })
      .then(objResponse => {
        const strToken = Lodash.get(objResponse, ['data', 'token'], null);
        const objUserInfo = Lodash.get(objResponse, ['data', 'user'], null);
        setUserInfo(objUserInfo);
        MemoApi.defaults.headers.common.Authorization = `Bearer ${strToken}`;

        logger.success({
          key: MessagesKey.SIGN_IN_SUCCESS,
          data: objResponse,
        });

        this.setLoading(false);
        return navigate('Sync', { userToken: strToken });
      })
      .catch(objError => {
        this.setLoading(false);
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.SIGN_IN_FAILED,
            data: objError,
          });
        }, 1000);
      });
  };

  handleOnPressHasAnAccount = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  render() {
    const { isLoading } = this.state;
    const { initialsValue } = this.props;

    return (
      <>
        <LoadingState.Modal isVisible={isLoading} />
        <RegisterComponent
          onSubmit={this.handleSubmit}
          initialsValue={initialsValue}
          onBack={this.handleOnPressHasAnAccount}
        />
      </>
    );
  }
}

Register.defaultProps = {
  initialsValue: null,
  setUserInfo: () => null,
};

Register.propTypes = {
  initialsValue: PropTypes.shape({}),
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
  )(Register)
);
