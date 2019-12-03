import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Lodash from 'lodash';

import SettingsComponent from '../../Components/Settings';
import {
  selectors as userManagerSelectors,
  actions as userActions,
} from '../../Redux/Common/UserManager';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import Api from '../../Core/Api';

class Settings extends React.Component {
  goBack = () => {
    const {
      navigation: { pop },
    } = this.props;
    pop();
  };

  handleOnChangeProfilePicture = strImageUri => {
    return this.handleSetProfileImage(strImageUri);
  };

  handleSetProfileImage = strImageUri => {
    const { logger, setUserInfo } = this.props;
    return Api.UploadProfilePicture(strImageUri)
      .then(objResponse => {
        const objUserInfo = Lodash.get(objResponse, ['data', 'data'], null);
        setUserInfo(objUserInfo);
        return logger.success({
          key: MessagesKey.CHANGE_PROFILE_PICTURE_SUCCESS,
          data: objResponse,
        });
      })
      .catch(objError => {
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.CHANGE_PROFILE_PICTURE_FAILED,
            data: objError,
          });
        }, 1000);
      });
  };

  render() {
    const { firstName, lastName } = this.props;
    return (
      <SettingsComponent
        userName={`${firstName} ${lastName}`}
        onBackArrowPress={this.goBack}
        onChangeProfilePicture={this.handleOnChangeProfilePicture}
      />
    );
  }
}

Settings.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  setUserInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  const { getFirstName, getLastName } = userManagerSelectors;
  return {
    firstName: getFirstName(state, props),
    lastName: getLastName(state, props),
  };
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
    mapStateToProps,
    mapDispatchToProps
  )(Settings)
);
