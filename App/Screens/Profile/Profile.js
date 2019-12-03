import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoadingState from '../../Components/LoadingState';
import ProfileComponent from '../../Components/Profile';
import WithLogger from '../../HOCs/WithLogger';
import { selectors as userManagerSelectors } from '../../Redux/Common/UserManager';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      studentName: null,
      studentMail: null,
      studentSubjects: null,
      avatarUri: null,
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
    const studentName = getParam('studentName', 'Emma Paige');
    const studentMail = getParam('studentMail', 'emma.paige@edu.do');
    const studentSubjects = getParam(
      'studentSubjects',
      'Proyecto Final, Inteligencia Artificil, Big Data'
    );
    const avatarUri = getParam('avatarUri', null);
    const avatarInitialsText = getParam('avatarInitialsText', 'EP');
    const badgeUri = getParam(
      'badgeUri',
      'https://cdn0.iconfinder.com/data/icons/usa-politics/67/45-512.png'
    );
    const memoPoints = getParam('memoPoints', 12);
    const rank = getParam('rank', 'Master');

    this.setState({
      isLoading: false,
      studentName,
      studentMail,
      studentSubjects,
      avatarUri,
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
      studentName,
      studentMail,
      studentSubjects,
      avatarUri,
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
