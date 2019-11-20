import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingState from '../../Components/LoadingState';

import ChangePasswordForm from '../../Components/ChangePassword';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  setLoading = isLoading => {
    return this.setState({ isLoading });
  };

  handleSubmit = () => {
    const {
      navigation: { navigate },
    } = this.props;
    return navigate('Login');

    // USE THIS WHEN API READY
    // const { logger, navitagion: { navigate } } = this.props;
    // this.setLoading(true);

    // return Api.ChangePassword(objValues)
    //   .then(objResponse => {
    //     logger.success({
    //       key: MessagesKey.CHANGE_PASSWORD_SUCCESS,
    //       data: objResponse,
    //     });

    //     return navigate('PasswordRecoveryCode');
    //   })
    //   .catch(objError => {
    //     this.setLoading(false);

    //     return setTimeout(() => {
    //       logger.error({
    //         key: MessagesKey.CHANGE_PASSWORD_FAIL,
    //         data: objError,
    //       });
    //     }, 1000);
    //   });
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
};

ChangePassword.propTypes = {
  initialsValue: PropTypes.shape({}),
};

export default ChangePassword;
