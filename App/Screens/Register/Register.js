import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
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
    const { logger } = this.props;
    const { email, password, profileImage } = objValues;
    return Api.Login({ email, password })
      .then(objResponse => {
        const strToken = Lodash.get(objResponse, ['data', 'token'], null);
        MemoApi.defaults.headers.common.Authorization = `Bearer ${strToken}`;

        logger.success({
          key: MessagesKey.SIGN_IN_SUCCESS,
          data: objResponse,
        });

        this.setLoading(false);
        if (profileImage) {
          return this.handleSetProfileImage(profileImage, strToken);
        }
        return this.finishUpRegistry(objResponse, strToken);
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

  finishUpRegistry = (objUserInfo, strToken) => {
    const {
      navigation: { navigate },
      logger,
      setUserInfo,
    } = this.props;
    setUserInfo(objUserInfo);
    this.setLoading(false);
    logger.success({
      key: MessagesKey.SIGN_IN_SUCCESS,
      data: objUserInfo,
    });
    return navigate('Sync', { userToken: strToken });
  };

  handleSetProfileImage = (strImageUri, strToken) => {
    const { logger } = this.props;
    return Api.UploadProfilePicture(strImageUri)
      .then(objResponse => {
        const objUserInfo = Lodash.get(objResponse, ['data', 'data'], null);
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], null);
        if (isSuccess) {
          this.finishUpRegistry(objUserInfo, strToken);
        }
        return null;
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
      <SafeAreaView>
        <LoadingState.Modal isVisible={isLoading} />
        <RegisterComponent
          onSubmit={this.handleSubmit}
          initialsValue={initialsValue}
          onBack={this.handleOnPressHasAnAccount}
        />
      </SafeAreaView>
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
