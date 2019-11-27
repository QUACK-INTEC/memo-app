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
