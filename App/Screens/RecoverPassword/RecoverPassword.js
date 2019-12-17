import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lodash from 'lodash';
import LoadingState from '../../Components/LoadingState';
import Api from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';

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

  handleSubmit = objValues => {
    const {
      navigation: { navigate },
      logger,
    } = this.props;
    const email = Lodash.get(objValues, ['email'], '');

    this.setLoading(true);

    return Api.SendRecoveryEmail(objValues)
      .then(objResponse => {
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          logger.success({
            key: MessagesKey.SEND_EMAIL_SUCCESS,
            data: objResponse,
          });

          this.setLoading(false);
          return navigate('PasswordRecoveryCode', { email });
        }
        this.setLoading(false);
        return logger.error({
          key: MessagesKey.SEND_EMAIL_FAIL,
          data: objResponse,
        });
      })
      .catch(objError => {
        this.setLoading(false);

        return setTimeout(() => {
          logger.error({
            key: MessagesKey.SEND_EMAIL_FAIL,
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

export default WithLogger(RecoverPassWord);
