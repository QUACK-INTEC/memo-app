import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Lodash from 'lodash';

import { bindActionCreators } from 'redux';
import AppNavigator from './AppNavigator';
import LoadingState from '../Components/LoadingState';

import Api, { MemoApi } from '../Core/Api';

import {
  selectors as userManagerSelectors,
  actions as userActions,
} from '../Redux/Common/UserManager';

import WithLogger, { MessagesKey } from '../HOCs/WithLogger';

class AppToken extends Component {
  constructor() {
    super();
    this.state = { tokenReady: false };
  }

  componentDidMount() {
    this.handleRefreshToken();
  }

  handleRefreshToken = () => {
    const { logger, loggedIn, userToken, setUserToken } = this.props;
    if (loggedIn) {
      MemoApi.defaults.headers.common.Authorization = `Bearer ${userToken}`;
      return Api.TokenRefresh()
        .then(objResponse => {
          const token = Lodash.get(objResponse, ['data', 'token'], null);
          setUserToken(token);
          this.setState({ tokenReady: true });
        })
        .catch(objError => {
          return setTimeout(() => {
            setUserToken(null);
            logger.error({
              key: MessagesKey.SIGN_IN_FAILED,
              data: objError,
            });
            this.setState({ tokenReady: true });
          }, 1050);
        });
    }

    return this.setState({ tokenReady: true });
  };

  render() {
    const { tokenReady } = this.state;
    const { loggedIn } = this.props;
    if (!tokenReady) {
      return (
        <View style={styles.loaderContainer}>
          <LoadingState.Small />
        </View>
      );
    }
    return <AppNavigator loggedIn={loggedIn} />;
  }
}

const mapStateToProps = (state, props) => {
  const { isLogged, getUserToken } = userManagerSelectors;
  return {
    loggedIn: isLogged(state, props),
    userToken: getUserToken(state, props),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUserToken: userActions.setUserToken,
    },
    dispatch
  );
};

const AppTokenWithProps = WithLogger(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppToken)
);

AppToken.defaultProps = {
  setUserToken: () => null,
};

AppToken.propTypes = {
  setUserToken: PropTypes.func,
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppTokenWithProps;
