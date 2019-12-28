import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Moment from 'moment/min/moment-with-locales';
import Lodash from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import LoadingState from '../../Components/LoadingState';
import HomeComponent from '../../Components/Home';
import { colors, fonts, spacers } from '../../Core/Theme';
import Api, { MemoApi, RegisterForNotifications } from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import ClassInfoCard, { ClassInfoCardLoadingState } from '../../Components/ClassInfoCard';
import {
  actions as classesActions,
  selectors as myClassesSelectors,
} from '../../Redux/Common/MyClasses';

import {
  selectors as userManagerSelectors,
  actions as userActions,
} from '../../Redux/Common/UserManager';
import { selectors as EventFormSelectors } from '../EventForm/Redux';
import LoadingList from '../../Components/LoadingList';
import { Classes, Events } from '../../Models';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false,
    };
  }

  async componentDidMount() {
    const { loggedIn, userToken } = this.props;

    if (loggedIn) {
      MemoApi.defaults.headers.common.Authorization = `Bearer ${userToken}`;
    }
    await RegisterForNotifications();

    this.fetchEventsAndClasses();
  }

  componentDidUpdate(prevProps) {
    const { isModalVisible } = this.props;
    if (prevProps.isModalVisible !== isModalVisible) {
      return this.fetchEventsAndClasses();
    }
    return false;
  }

  getMyClasses = () => {
    return Api.GetMyClasses();
  };

  getEventsForToday = () => {
    const today = Moment().format('YYYYMMDD');
    return Api.GetEvents(today, null, true);
  };

  getPrivatesEventsForToday = () => {
    const today = Moment().format('YYYYMMDD');
    return Api.GetEvents(today, null, false);
  };

  fetchEventsAndClasses = () => {
    const { setMyClasses, logger } = this.props;

    return Promise.all([
      this.getMyClasses(),
      this.getEventsForToday(),
      this.getPrivatesEventsForToday(),
    ])
      .then(listValues => {
        const [objClassResponse, objEventsResponse, objEventsPrivate] = listValues;
        const listMyClasses = Lodash.get(objClassResponse, ['data', 'data'], []);
        const listEventsForToday = Lodash.get(objEventsResponse, ['data', 'events'], []);
        const listPrivateEventsForToday = Lodash.get(objEventsPrivate, ['data', 'events'], []);
        const listSubjectsForToday = Lodash.get(objEventsResponse, ['data', 'classes'], []);
        setMyClasses(listMyClasses);
        const listPrivateEventFormatted = listPrivateEventsForToday.map(objEvent => {
          return {
            ...objEvent,
            isPrivate: true,
          };
        });
        this.setState({
          isLoading: false,
          subjects: listSubjectsForToday,
          events: [...listEventsForToday, ...listPrivateEventFormatted],
        });
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
  };

  handleOnPressClassItem = idSection => {
    const {
      navigation: { push },
    } = this.props;

    return push('ClassHub', { id: idSection });
  };

  handleOnEventPress = objEvent => {
    const {
      navigation: { push },
    } = this.props;
    const subjectName = Lodash.get(objEvent, ['subject'], null);

    return push('PostInfo', {
      id: Lodash.get(objEvent, ['id'], null),
      subjectName,
    });
  };

  handleOnMyCalendarPress = () => {
    const {
      navigation: { navigate },
    } = this.props;

    return navigate('Calendar');
  };

  getEventsList = () => {
    const { events } = this.state;
    return Events.getEventsData(events);
  };

  getClassesList = () => {
    const { subjects } = this.state;
    return Events.getClassesData(subjects);
  };

  handleOnUpVote = postId => {
    const { logger, toastRef } = this.props;
    const currentToast = Lodash.get(toastRef, ['current'], null);
    return Api.UpvotePost(postId)
      .then(objResponse => {
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          currentToast.setToastVisible('Has votado exitosamente!', 1500);

          logger.success({
            key: MessagesKey.UPVOTE_POST_SUCCESS,
            data: objResponse,
          });
          return true;
        }
        logger.error({
          key: MessagesKey.UPVOTE_POST_FAILED,
          data: objResponse,
        });
        return false;
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        setTimeout(() => {
          logger.error({
            key: MessagesKey.UPVOTE_POST_FAILED,
            data: objError,
          });
        }, 800);
        return false;
      });
  };

  handleOnDownVote = postId => {
    const { logger, toastRef } = this.props;
    const currentToast = Lodash.get(toastRef, ['current'], null);
    return Api.DownvotePost(postId)
      .then(objResponse => {
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          currentToast.setToastVisible('Has votado exitosamente!', 1500);
          logger.success({
            key: MessagesKey.DOWNVOTE_POST_SUCCESS,
            data: objResponse,
          });
          return true;
        }
        logger.error({
          key: MessagesKey.DOWNVOTE_POST_FAILED,
          data: objResponse,
        });
        return false;
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        setTimeout(() => {
          logger.error({
            key: MessagesKey.DOWNVOTE_POST_FAILED,
            data: objError,
          });
        }, 800);
        return false;
      });
  };

  handleOnRefresh = () => {
    return this.setState(
      {
        isRefreshing: true,
      },
      () => this.fetchEventsAndClasses().then(() => this.setState({ isRefreshing: false }))
    );
  };

  handleOnSubjectPress = objSubject => {
    const {
      navigation: { push },
    } = this.props;
    const idSection = Lodash.get(objSubject, ['id'], null);
    return push('ClassHub', { id: idSection });
  };

  handleOnEventUpVote = objEvent => {
    const postId = Lodash.get(objEvent, ['id'], null);
    return this.handleOnUpVote(postId);
  };

  handleOnEventDownVote = objEvent => {
    const postId = Lodash.get(objEvent, ['id'], null);
    return this.handleOnDownVote(postId);
  };

  renderSubject = ({ item }) => {
    return (
      <View style={styles.myClassContainer}>
        <ClassInfoCard
          subject={item.subjectName}
          professor={item.professorName}
          schedule={item.classDays}
          onPress={() => this.handleOnPressClassItem(item.id)}
        />
      </View>
    );
  };

  renderSubjectsLoadingState = item => {
    return <ClassInfoCardLoadingState key={item} />;
  };

  renderSubjects = () => {
    const { myClasses, myClassesLookup } = this.props;
    const { isLoading } = this.state;
    const myClassesFormatted = Classes.getClassesData(myClasses, myClassesLookup);

    if (isLoading) {
      return (
        <LoadingList
          columnWrapperStyle={styles.classesContainer}
          renderItem={this.renderSubjectsLoadingState}
          numColumns={2}
        />
      );
    }

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
    const { isLoading, isRefreshing } = this.state;
    return (
      <>
        <LoadingState.withoutLottie isVisible={isLoading} />
        <HomeComponent
          isLoading={isLoading}
          actualMonth={Moment().format('MMMM YYYY')}
          renderSubjects={this.renderSubjects}
          events={this.getEventsList()}
          subjects={this.getClassesList()}
          refreshing={isRefreshing}
          onRefresh={this.handleOnRefresh}
          onEventPress={this.handleOnEventPress}
          onSubjectPress={this.handleOnSubjectPress}
          onEventDownVote={this.handleOnEventDownVote}
          onEventUpVote={this.handleOnEventUpVote}
          onMyCalendarPress={this.handleOnMyCalendarPress}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...spacers.MB_4,
    ...spacers.MT_15,
  },
  goToCalendarText: { color: colors.GREEN_LIGHT, ...fonts.SIZE_S },
  noEventsText: { color: colors.GRAY, ...spacers.MT_16, ...spacers.MB_2 },
  myClassContainer: { ...spacers.MA_1 },
  classesContainer: { justifyContent: 'space-between' },
});

Home.defaultProps = {
  myClasses: [],
  setMyClasses: () => null,
  myClassesLookup: {},
};

Home.propTypes = {
  myClasses: PropTypes.arrayOf(PropTypes.string),
  setMyClasses: PropTypes.func,
  myClassesLookup: PropTypes.shape({}),
};

const mapStateToProps = (state, props) => {
  const { getMyClasses, getMyClassesLookup } = myClassesSelectors;
  const { isLogged, getUserToken } = userManagerSelectors;
  const { getIsModalVisible } = EventFormSelectors;
  return {
    myClasses: getMyClasses(state, props),
    myClassesLookup: getMyClassesLookup(state, props),
    loggedIn: isLogged(state, props),
    userToken: getUserToken(state, props),
    isModalVisible: getIsModalVisible(state, props),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setMyClasses: classesActions.setClasses,
      setUserToken: userActions.setUserToken,
    },
    dispatch
  );
};

export default WithLogger(connect(mapStateToProps, mapDispatchToProps)(Home));
