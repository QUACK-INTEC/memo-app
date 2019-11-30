import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SettingsComponent from '../../Components/Settings';
import { selectors as userManagerSelectors } from '../../Redux/Common/UserManager';
import WithLogger from '../../HOCs/WithLogger';

class Settings extends React.Component {
  goBack = () => {
    const {
      navigation: { pop },
    } = this.props;
    pop();
  };

  handleOnChangeProfilePicture = strImageUri => {
    // TODO: Change profile pic from API
    return strImageUri;
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
};

const mapStateToProps = (state, props) => {
  const { getFirstName, getLastName } = userManagerSelectors;
  return {
    firstName: getFirstName(state, props),
    lastName: getLastName(state, props),
  };
};

export default WithLogger(
  connect(
    mapStateToProps,
    null
  )(Settings)
);
