import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import LoadingState from '../../Components/LoadingState';

import ProfileComponent from '../../Components/Profile';
import ClassInfoCard from '../../Components/ClassInfoCard';
import ClassesComponent from '../../Components/Classes';

import { Classes } from '../../Models';

import { spacers } from '../../Core/Theme';

class ViewProfile extends React.Component {
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

  renderSubject = ({ item }) => {
    return (
      <View style={styles.myClassContainer}>
        <ClassInfoCard
          subject={item.subjectName}
          professor={item.professorName}
          schedule={item.classDays}
          onPress={() => this.handleOnPressClassItem(item.id, item)}
        />
      </View>
    );
  };

  renderClasses = () => {
    const { commonClasses, commonClassesLookup } = this.props;
    const myClassesFormatted = Classes.getClassesData(commonClasses, commonClassesLookup);

    return (
      <FlatList
        columnWrapperStyle={styles.classesContainer}
        data={myClassesFormatted}
        numColumns={2}
        renderItem={this.renderSubject}
        keyExtractor={item => item.id}
      />
    );
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
        <ClassesComponent renderClasses={this.renderClasses} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  classesContainer: { justifyContent: 'space-between', flex: 1 },
  myClassContainer: { ...spacers.MA_1 },
});

ViewProfile.defaultProps = {
  commonClasses: [],
  commonClassesLookup: {},
};

ViewProfile.propTypes = {
  commonClasses: PropTypes.arrayOf(PropTypes.string),
  commonClassesLookup: PropTypes.shape({}),
};

export default ViewProfile;
