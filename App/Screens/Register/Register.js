import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lodash from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RegisterComponent from '../../Components/Register';
import LoadingState from '../../Components/LoadingState';
import Api from '../../Core/Api';
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
        const objUserData = Lodash.get(objResponse, ['data'], null);
        logger.success({
          key: MessagesKey.REGISTER_SUCCESS,
          data: objResponse,
        });

        return this.handleSuccessRegister(objUserData);
      })
      .catch(objError => {
        logger.error({
          key: MessagesKey.REGISTER_FAILED,
          data: objError,
        });
        return this.setLoading(false);
      });
  };

  // TODO: Go or change stack to view home
  handleSuccessRegister = objUserData => {
    const { setUserInfo } = this.props;
    this.setLoading(false);

    if (objUserData) {
      return setUserInfo(objUserData);
    }

    return null;
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
