import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Lodash from 'lodash';
import { bindActionCreators } from 'redux';

import LoadingState from '../../Components/LoadingState';
import ProfileComponent from '../../Components/Profile';
import ClassInfoCard from '../../Components/ClassInfoCard';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import { Classes } from '../../Models';
import { spacers } from '../../Core/Theme';

import {
  actions as userActions,
  selectors as userManagerSelectors,
} from '../../Redux/Common/UserManager';
import { selectors as myClassesSelectors } from '../../Redux/Common/MyClasses';

import Api from '../../Core/Api';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      badgeUri: null,
    };
  }

  componentDidMount() {
    const { logger, setUserInfo } = this.props;
    Promise.all([this.getMyProfile()])
      .then(listValues => {
        this.setState({ isLoading: false });
        const [objUser] = listValues;
        const myUser = Lodash.get(objUser, ['data', 'user'], []);
        setUserInfo(myUser);
        return logger.success({
          key: MessagesKey.LOAD_EVENTS_AND_MYCLASSES_SUCCESS,
          data: listValues,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.LOAD_EVENTS_AND_MYCLASSES_FAILED,
            data: objError,
          });
        }, 800);
      });

    const {
      navigation: { getParam },
    } = this.props;
    // MOCK DATA PARA FINES DE PRUEBA
    const badgeUri = getParam(
      'badgeUri',
      'https://cdn0.iconfinder.com/data/icons/usa-politics/67/45-512.png'
    );
    this.setState({
      isLoading: true,
      badgeUri,
    });
  }

  getMyProfile = () => {
    return Api.GetMyProfile();
  };

  handleGoToSettings = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Settings');
  };

  getInitials = (name, lastname) => {
    return name && lastname
      ? name.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()
      : null;
  };

  handleOnPressClassItem = (idSection, objSection) => {
    const {
      navigation: { navigate },
    } = this.props;

    return navigate('ClassHub', { id: idSection, sectionInfo: objSection });
  };

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
    const { myClasses, myClassesLookup } = this.props;
    const myClassesFormatted = Classes.getClassesData(myClasses, myClassesLookup);

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
    const { isLoading, avatarSrc, badgeUri, badgeSrc } = this.state;
    const {
      userFirstName,
      userLastName,
      userAvatarURI,
      userEmail,
      userPoints,
      userRank,
    } = this.props;
    return (
      <View style={styles.container}>
        <LoadingState.Modal isVisible={isLoading} />
        <ProfileComponent
          studentName={`${userFirstName} ${userLastName}`}
          studentMail={userEmail}
          renderClasses={this.renderClasses}
          avatarUri={userAvatarURI}
          avatarSrc={avatarSrc}
          avatarInitialsText={this.getInitials(userFirstName, userLastName)}
          badgeUri={badgeUri}
          badgeSrc={badgeSrc}
          memoPoints={userPoints}
          rank={userRank}
          onEditUser={this.handleGoToSettings}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  classesContainer: { justifyContent: 'space-between', flex: 1 },
  myClassContainer: { ...spacers.MA_1 },
});

Profile.defaultProps = {
  userFirstName: null,
  userLastName: null,
  userAvatarURI: null,
  userEmail: null,
  setUserInfo: () => null,
  userPoints: null,
  userRank: null,
  myClasses: [],
  myClassesLookup: {},
};

Profile.propTypes = {
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
  userAvatarURI: PropTypes.string,
  userEmail: PropTypes.string,
  setUserInfo: PropTypes.func,
  userPoints: PropTypes.number,
  userRank: PropTypes.string,
  myClasses: PropTypes.arrayOf(PropTypes.string),
  myClassesLookup: PropTypes.shape({}),
};

const mapStateToProps = (state, props) => {
  const {
    getFirstName,
    getLastName,
    getAvatarUser,
    getEmail,
    getPoints,
    getRank,
  } = userManagerSelectors;
  const { getMyClasses, getMyClassesLookup } = myClassesSelectors;
  return {
    userFirstName: getFirstName(state, props),
    userLastName: getLastName(state, props),
    userAvatarURI: getAvatarUser(state, props),
    userEmail: getEmail(state, props),
    userPoints: getPoints(state, props),
    userRank: getRank(state, props),
    myClasses: getMyClasses(state, props),
    myClassesLookup: getMyClassesLookup(state, props),
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
  )(Profile)
);
