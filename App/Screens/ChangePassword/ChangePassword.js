import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingState from '../../Components/LoadingState';
import Api from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';

import ChangePasswordForm from '../../Components/ChangePassword';
import { actions as userActions } from '../../Redux/Common/UserManager';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: '',
      userInfo: {},
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam },
    } = this.props;
    const token = getParam('token', '');
    const userInfo = getParam('userInfo', {});

    this.setState({
      token,
      userInfo,
    });
  }

  setLoading = isLoading => {
    return this.setState({ isLoading });
  };

  handleSubmit = objValues => {
    const {
      navigation: { navigate },
      setUserToken,
      logger,
      setUserInfo,
    } = this.props;
    const { token, userInfo } = this.state;

    this.setLoading(true);

    return Api.ChangePassword(objValues)
      .then(objResponse => {
        logger.success({
          key: MessagesKey.CHANGE_PASSWORD_SUCCESS,
          data: objResponse,
        });
        setUserToken(token);
        setUserInfo(userInfo);
        this.setLoading(false);
        return navigate('Home');
      })
      .catch(objError => {
        this.setLoading(false);

        return setTimeout(() => {
          logger.error({
            key: MessagesKey.CHANGE_PASSWORD_FAIL,
            data: objError,
          });
        }, 1000);
      });
  };

  handleonPressLogIn = () => {
    const {
      navigation: { navigate },
    } = this.props;
    return navigate('Login');
  };

  render() {
    const { isLoading } = this.state;
    const { initialsValue } = this.props;

    return (
      <>
        <LoadingState.Modal isVisible={isLoading} />
        <ChangePasswordForm
          onSubmit={this.handleSubmit}
          initialsValue={initialsValue}
          onBack={this.handleonPressLogIn}
        />
      </>
    );
  }
}

ChangePassword.defaultProps = {
  initialsValue: null,
  setUserToken: () => null,
  setUserInfo: () => null,
};

ChangePassword.propTypes = {
  initialsValue: PropTypes.shape({}),
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

export default WithLogger(
  connect(
    null,
    mapDispatchToProps
  )(ChangePassword)
);
