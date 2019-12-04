import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingState from '../../Components/LoadingState';
import ProfileComponent from '../../Components/Profile';
import WithLogger from '../../HOCs/WithLogger';
import { selectors as userManagerSelectors } from '../../Redux/Common/UserManager';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      studentSubjects: null,
      avatarInitialsText: null,
      badgeUri: null,
      memoPoints: null,
      rank: null,
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam },
    } = this.props;
    // MOCK DATA PARA FINES DE PRUEBA
    const studentSubjects = getParam(
      'studentSubjects',
      'Proyecto Final, Inteligencia Artificil, Big Data'
    );
    const avatarInitialsText = getParam('avatarInitialsText', 'EP');
    const badgeUri = getParam(
      'badgeUri',
      'https://cdn0.iconfinder.com/data/icons/usa-politics/67/45-512.png'
    );
    const memoPoints = getParam('memoPoints', 12);
    const rank = getParam('rank', 'Master');

    this.setState({
      isLoading: false,
      studentSubjects,
      avatarInitialsText,
      badgeUri,
      memoPoints,
      rank,
    });
  }

  handleGoToSettings = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Settings');
  };

  render() {
    const {
      isLoading,
      studentSubjects,
      avatarSrc,
      avatarInitialsText,
      badgeUri,
      badgeSrc,
      memoPoints,
      rank,
    } = this.state;
    const { userFirstName, userLastName, userAvatarURI, userEmail } = this.props;
    return (
      <View style={styles.container}>
        <LoadingState.Modal isLoading={isLoading} />
        <ProfileComponent
          studentName={`${userFirstName} ${userLastName}`}
          studentMail={userEmail}
          studentSubjects={studentSubjects}
          avatarUri={userAvatarURI}
          avatarSrc={avatarSrc}
          avatarInitialsText={avatarInitialsText}
          badgeUri={badgeUri}
          badgeSrc={badgeSrc}
          memoPoints={memoPoints}
          rank={rank}
          onEditUser={this.handleGoToSettings}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

Profile.defaultProps = {
  userFirstName: null,
  userLastName: null,
  userAvatarURI: null,
  userEmail: null,
};

Profile.propTypes = {
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
  userAvatarURI: PropTypes.string,
  userEmail: PropTypes.string,
};

const mapStateToProps = (state, props) => {
  const { getFirstName, getLastName, getAvatarUser, getEmail } = userManagerSelectors;
  return {
    userFirstName: getFirstName(state, props),
    userLastName: getLastName(state, props),
    userAvatarURI: getAvatarUser(state, props),
    userEmail: getEmail(state, props),
  };
};

export default WithLogger(
  connect(
    mapStateToProps,
    null
  )(Profile)
);
