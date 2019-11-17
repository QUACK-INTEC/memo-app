import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Lodash from 'lodash';

import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import SyncComponent from '../../Components/SyncComponent';
import LoadingState from '../../Components/LoadingState';
import Api from '../../Core/Api';
import { actions as userActions } from '../../Redux/Common/UserManager';

class SyncAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      universities: [],
    };
  }

  componentDidMount() {
    const { logger } = this.props;
    Api.GetSupportedUniversities()
      .then(objResponse => {
        console.log({ objResponse });
        return logger.success({
          key: MessagesKey.LOAD_SUPPORTED_UNIVERSITIES_SUCCESS,
          data: objResponse,
        });
      })
      .catch(objError => {
        return logger.error({
          key: MessagesKey.LOAD_SUPPORTED_UNIVERSITIES_FAILED,
          data: objError,
        });
      });
  }

  setLoading = isLoading => {
    return this.setState({ isLoading });
  };

  handleSubmit = objValues => {
    const { logger } = this.props;
    this.setLoading(true);
    const { claveUniversidad, user, university } = objValues;
    const objRequestPayload = {
      username: user,
      password: claveUniversidad,
      university,
    };

    return Api.SyncUniversity(objRequestPayload)
      .then(objResponse => {
        const objUserSyncData = Lodash.get(objResponse, ['data'], null);
        logger.success({
          key: MessagesKey.SYNC_UNIVERSITY_SUCCESS,
          data: objResponse,
        });
        this.setLoading(false);
        return this.handleSuccessSync(objUserSyncData);
      })
      .catch(objError => {
        this.setLoading(false);
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.SYNC_UNIVERSITY_FAILED,
            data: objError,
          });
        }, 1000);
      });
  };

  handleSuccessSync = objUserSyncData => {
    const {
      setUserSync,
      navigation: { navigate },
    } = this.props;
    this.setLoading(false);

    if (objUserSyncData) {
      setUserSync(objUserSyncData);

      return navigate('Home');
    }

    return null;
  };

  render() {
    const { isLoading } = this.state;
    const { initialsValue } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <LoadingState.Modal isVisible={isLoading} />
        <SyncComponent onSubmit={this.handleSubmit} initialsValue={initialsValue} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

SyncAccount.defaultProps = {
  initialsValue: null,
  setUserSync: () => null,
};

SyncAccount.propTypes = {
  initialsValue: PropTypes.shape({}),
  setUserSync: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUserSync: userActions.setUserSync,
    },
    dispatch
  );
};

export default WithLogger(
  connect(
    null,
    mapDispatchToProps
  )(SyncAccount)
);
