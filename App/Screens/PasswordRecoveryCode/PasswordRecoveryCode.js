import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingState from '../../Components/LoadingState';

import PasswordRecoveryCodeForm from '../../Components/PasswordRecoveryCode';

class PasswordRecoveryCode extends Component {
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
    return navigate('ChangePassword');

    // USE THIS WHEN API READY
    // const { logger, navitagion: { navigate } } = this.props;
    // this.setLoading(true);

    // return Api.ValidateRecoveryCode(objValues)
    //   .then(objResponse => {
    //     logger.success({
    //       key: MessagesKey.RECOVERY_CODE_SUCCESS,
    //       data: objResponse,
    //     });

    //     return navigate('PasswordRecoveryCode');
    //   })
    //   .catch(objError => {
    //     this.setLoading(false);

    //     return setTimeout(() => {
    //       logger.error({
    //         key: MessagesKey.RECOVERY_CODE_FAIL,
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

export default PasswordRecoveryCode;
