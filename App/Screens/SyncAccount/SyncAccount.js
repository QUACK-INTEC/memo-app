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
  static navigationOptions = ({ navigation }) => {
    const { getParam } = navigation;
    const canNavigate = getParam('canNavigate', false);
    return {
      gesturesEnabled: canNavigate,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      universities: [],
      canNavigate: false,
      nextScreen: 'Home',
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam },
      logger,
    } = this.props;
    this.setLoading(true);
    const canNavigate = getParam('canNavigate', false);
    const nextScreen = getParam('nextScreen', 'Home');

    this.getSupportedUniversities()
      .then(objSupportedResponse => {
        const listSupportedUniversities = Lodash.get(
          objSupportedResponse,
          ['data', 'universities'],
          []
        );
        this.setLoading(false);
        const universitiesFormatted = listSupportedUniversities.map(objUniversity => {
          return {
            label: objUniversity.title,
            value: objUniversity.syncCode,
          };
        });
        this.setState({ universities: universitiesFormatted, canNavigate, nextScreen });
        return logger.success({
          key: MessagesKey.LOAD_SUPPORTED_UNIVERSITIES_SUCCESS,
          data: listSupportedUniversities,
        });
      })
      .catch(objError => {
        this.setLoading(false);
        return logger.error({
          key: MessagesKey.LOAD_SUPPORTED_UNIVERSITIES_FAILED,
          data: objError,
        });
      });
  }

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  getSupportedUniversities = () => {
    return Api.GetSupportedUniversities();
  };

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
      setUserToken,
      navigation: { getParam, navigate },
    } = this.props;
    const { nextScreen } = this.state;
    this.setLoading(false);

    const userToken = getParam('userToken', null);

    if (objUserSyncData) {
      setUserSync(objUserSyncData);
      if (userToken) {
        return setUserToken(userToken);
      }
      return navigate(nextScreen);
    }

    return null;
  };

  render() {
    const { isLoading, universities, canNavigate } = this.state;
    const { initialsValue } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <LoadingState.Modal isVisible={isLoading} />
        <SyncComponent
          onSubmit={this.handleSubmit}
          initialsValue={initialsValue}
          universities={universities}
          canNavigate={canNavigate}
          onBackArrow={this.handleBackArrow}
        />
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
  setUserToken: () => null,
};

SyncAccount.propTypes = {
  initialsValue: PropTypes.shape({}),
  setUserSync: PropTypes.func,
  setUserToken: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUserSync: userActions.setUserSync,
      setUserToken: userActions.setUserToken,
    },
    dispatch
  );
};

export default WithLogger(connect(null, mapDispatchToProps)(SyncAccount));
