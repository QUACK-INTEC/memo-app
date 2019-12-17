import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Lodash from 'lodash';
import LoadingState from '../../Components/LoadingState';

import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import ViewProfileComponent from '../../Components/ViewProfile';
import ClassInfoCard from '../../Components/ClassInfoCard';
import Api from '../../Core/Api';

import { Classes } from '../../Models';

import { spacers } from '../../Core/Theme';

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      studentName: null,
      studentMail: null,
      commonClasses: [],
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
      logger,
    } = this.props;

    const userId = getParam('userId', '');
    this.getUserProfile(userId)
      .then(objClassResponse => {
        const userProfile = Lodash.get(objClassResponse, ['data', 'user'], {});
        const studentName = `${Lodash.get(userProfile, 'firstName', '')} ${Lodash.get(
          userProfile,
          'lastName',
          ''
        )}`;
        const studentMail = Lodash.get(userProfile, 'email', '');
        const avatarUri = Lodash.get(userProfile, 'avatarURL', {});
        const avatarInitialsText = Lodash.get(userProfile, 'avatarInitialsText', {});
        const memoPoints = Lodash.get(userProfile, ['points'], 0);
        const badgeUri = Lodash.get(userProfile, ['rank', 'badgeUrl'], '');
        const rank = Lodash.get(userProfile, ['rank', 'name'], '');
        const commonClasses = Lodash.get(objClassResponse, ['data', 'commonClasses'], []);
        this.setState({
          isLoading: false,
          studentName,
          studentMail,
          avatarUri,
          avatarInitialsText,
          badgeUri,
          memoPoints,
          rank,
          commonClasses,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.LOAD_USER_PROFILE_FAILED,
            data: objError,
          });
        }, 800);
      });
  }

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  getUserProfile = userId => {
    return Api.GetUserProfile(userId);
  };

  renderSubject = ({ item }) => {
    return (
      <View style={styles.myClassContainer}>
        <ClassInfoCard
          subject={item.subjectName}
          professor={item.professorName}
          schedule={item.classDays}
          disabled
          onPress={() => this.handleOnPressClassItem(item.id, item)}
        />
      </View>
    );
  };

  renderClasses = () => {
    const { commonClasses } = this.state;
    const myClassesFormatted = Classes.getClassesDataFromList(commonClasses);

    return (
      <FlatList
        columnWrapperStyle={styles.classesContainer}
        data={myClassesFormatted}
        numColumns={2}
        renderItem={this.renderSubject}
        keyExtractor={item => item.id}
        scrollEnabled={false}
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
      avatarInitialsText,
      badgeUri,
      memoPoints,
      rank,
    } = this.state;

    if (isLoading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <LoadingState.Small isLoading={isLoading} />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ViewProfileComponent
          studentName={studentName}
          studentMail={studentMail}
          studentSubjects={studentSubjects}
          avatarUri={avatarUri}
          avatarInitialsText={avatarInitialsText}
          badgeUri={badgeUri}
          memoPoints={memoPoints}
          rank={rank}
          onBackArrow={this.handleBackArrow}
          renderClasses={this.renderClasses}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  classesContainer: { justifyContent: 'space-between', flex: 1 },
  myClassContainer: { ...spacers.MA_1 },
});

export default WithLogger(ViewProfile);
