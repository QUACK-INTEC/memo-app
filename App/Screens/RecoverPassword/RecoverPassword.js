import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingState from '../../Components/LoadingState';

import RecoverPasswordForm from '../../Components/RecoverPassword';

class RecoverPassWord extends Component {
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
    return navigate('PasswordRecoveryCode');

    // USE THIS WHEN API READY
    // const { logger, navitagion: { navigate } } = this.props;
    // this.setLoading(true);

    // return Api.SendRecoveryEmail(objValues)
    //   .then(objResponse => {
    //     logger.success({
    //       key: MessagesKey.SEND_EMAIL_SUCCESS,
    //       data: objResponse,
    //     });

    //     return navigate('PasswordRecoveryCode');
    //   })
    //   .catch(objError => {
    //     this.setLoading(false);

    //     return setTimeout(() => {
    //       logger.error({
    //         key: MessagesKey.SEND_EMAIL_FAIL,
    //         data: objError,
    //       });
    //     }, 1000);
    //   });
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
        <RecoverPasswordForm
          onSubmit={this.handleSubmit}
          initialsValue={initialsValue}
          onBack={this.handleOnPressGoBack}
        />
      </>
    );
  }
}

RecoverPassWord.defaultProps = {
  initialsValue: null,
};

RecoverPassWord.propTypes = {
  initialsValue: PropTypes.shape({}),
};

export default RecoverPassWord;
