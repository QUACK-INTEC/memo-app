import React from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import * as IntentLauncher from 'expo-intent-launcher';
import { bindActionCreators } from 'redux';
import Lodash from 'lodash';

import LoadingState from '../../Components/LoadingState';
import SettingsComponent from '../../Components/Settings';
import {
  selectors as userManagerSelectors,
  actions as userActions,
} from '../../Redux/Common/UserManager';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import Api from '../../Core/Api';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  goBack = () => {
    const {
      navigation: { pop },
    } = this.props;
    pop();
  };

  handleOnChangeProfilePicture = strImageUri => {
    return this.handleSetProfileImage(strImageUri);
  };

  handleOnChangePassword = () => {
    const {
      navigation: { navigate },
    } = this.props;
    return navigate('ChangePassword', {
      setUserData: false,
      nextScreen: 'Settings',
      canNavigate: true,
      hasLogInOption: false,
    });
  };

  handleSetProfileImage = strImageUri => {
    const { logger, setUserInfo } = this.props;
    this.setState({ isLoading: true });

    return Api.UploadProfilePicture(strImageUri)
      .then(objResponse => {
        this.setState({ isLoading: false });

        const objUserInfo = Lodash.get(objResponse, ['data', 'data'], null);
        setUserInfo(objUserInfo);
        return logger.success({
          key: MessagesKey.CHANGE_PROFILE_PICTURE_SUCCESS,
          data: objResponse,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });

        return setTimeout(() => {
          logger.error({
            key: MessagesKey.CHANGE_PROFILE_PICTURE_FAILED,
            data: objError,
          });
        }, 1000);
      });
  };

  handleLogout = () => {
    const { logout } = this.props;
    this.setState({ isLoading: true });
    return Api.UnRegisterForNotifications()
      .then(() => {
        this.setState({ isLoading: false });

        return logout();
      })
      .catch(() => {
        this.setState({ isLoading: false });

        return logout();
      });
  };

  handleOnSyncPress = () => {
    const {
      navigation: { navigate },
    } = this.props;

    return navigate('Sync', { canNavigate: true, nextScreen: 'Settings' });
  };

  handleGoToSettingsDevice = () => {
    if (Constants.platform.ios) {
      return Linking.openURL('app-settings:');
    }
    return IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APP_NOTIFICATION_SETTINGS);
  };

  render() {
    const { isLoading } = this.state;
    const { firstName, lastName, userAvatarURI } = this.props;
    return (
      <>
        <LoadingState.Modal isVisible={isLoading} />
        <SettingsComponent
          userName={`${firstName} ${lastName}`}
          onBackArrowPress={this.goBack}
          onChangeProfilePicture={this.handleOnChangeProfilePicture}
          onLogoutPress={this.handleLogout}
          onSyncPress={this.handleOnSyncPress}
          onNotificationPress={this.handleGoToSettingsDevice}
          imageUri={userAvatarURI}
          onChangePasswordPress={this.handleOnChangePassword}
        />
      </>
    );
  }
}

Settings.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  userAvatarURI: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  const { getFirstName, getLastName, getAvatarUser } = userManagerSelectors;
  return {
    firstName: getFirstName(state, props),
    lastName: getLastName(state, props),
    userAvatarURI: getAvatarUser(state, props),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUserInfo: userActions.setUserInfo,
      logout: userActions.logout,
    },
    dispatch
  );
};

export default WithLogger(connect(mapStateToProps, mapDispatchToProps)(Settings));
