import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingState from '../../Components/LoadingState';

import ProfileComponent from '../../Components/Profile';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      studentName: null,
      studentMail: null,
      studentSubjects: null,
      avatarUri: null,
      avatarSrc: null,
      avatarInitialsText: null,
      badgeUri: null,
      badgeSrc: null,
      memoPoints: null,
      rank: null,
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam },
    } = this.props;
    const studentName = getParam('studentName', {});
    const studentMail = getParam('studentMail', {});
    const studentSubjects = getParam('studentSubjects', {});
    const avatarUri = getParam('avatarUri', {});
    const avatarSrc = getParam('avatarSrc', {});
    const avatarInitialsText = getParam('avatarInitialsText', {});
    const badgeUri = getParam('badgeUri', {});
    const badgeSrc = getParam('badgeSrc', {});
    const memoPoints = getParam('memoPoints', {});
    const rank = getParam('rank', {});

    this.setState({
      isLoading: false,
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
    });
  }

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
    return (
      <View style={styles.container}>
        <LoadingState.Modal isLoading={isLoading} />
        <ProfileComponent
          studentName={studentName}
          studentMail={studentMail}
          studentSubjects={studentSubjects}
          avatarUri={avatarUri}
          avatarSrc={avatarSrc}
          avatarInitialsText={avatarInitialsText}
          badgeUri={badgeUri}
          badgeSrc={badgeSrc}
          memoPoints={memoPoints}
          rank={rank}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Profile;
