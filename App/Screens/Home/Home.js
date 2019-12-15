import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Moment from 'moment';
import Lodash from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import LoadingState from '../../Components/LoadingState';
import Text from '../../Components/Common/Text';
import Link from '../../Components/Common/Link';
import HomeComponent from '../../Components/Home';
import { colors, fonts, spacers } from '../../Core/Theme';
import Api, { MemoApi } from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import ClassInfoCard from '../../Components/ClassInfoCard';
import {
  actions as classesActions,
  selectors as myClassesSelectors,
} from '../../Redux/Common/MyClasses';

import {
  selectors as userManagerSelectors,
  actions as userActions,
} from '../../Redux/Common/UserManager';
import { selectors as EventFormSelectors } from '../EventForm/Redux';

import { Classes, Events } from '../../Models';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    const {
      loggedIn,
      userToken,
      navigation: { addListener },
    } = this.props;

    if (loggedIn) {
      MemoApi.defaults.headers.common.Authorization = `Bearer ${userToken}`;
    }

    this.focusListener = addListener('didFocus', () => {
      return this.fetchEventsAndClasses();
    });

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
    return Api.GetEvents(today);
  };

  fetchEventsAndClasses = () => {
    const { setMyClasses, logger } = this.props;

    return Promise.all([this.getMyClasses(), this.getEventsForToday()])
      .then(listValues => {
        const [objClassResponse, objEventsResponse] = listValues;
        const listMyClasses = Lodash.get(objClassResponse, ['data', 'data'], []);
        const listEventsForToday = Lodash.get(objEventsResponse, ['data', 'events'], []);
        const listSubjectsForToday = Lodash.get(objEventsResponse, ['data', 'classes'], []);
        setMyClasses(listMyClasses);
        this.setState({
          isLoading: false,
          subjects: listSubjectsForToday,
          events: listEventsForToday,
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
      navigation: { navigate },
    } = this.props;

    return navigate('ClassHub', { id: idSection });
  };

  handleOnEventPress = objEvent => {
    const {
      navigation: { navigate },
    } = this.props;
    return navigate('PostInfo', {
      id: Lodash.get(objEvent, ['id'], null),
      subjectName: 'Falta por mandar del API',
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
      navigation: { navigate },
    } = this.props;
    const idSection = Lodash.get(objSubject, ['id'], null);
    return navigate('ClassHub', { id: idSection });
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

  renderSubjects = () => {
    const { myClasses, myClassesLookup } = this.props;
    const myClassesFormatted = Classes.getClassesData(myClasses, myClassesLookup);

    if (Lodash.isNull(myClasses) || Lodash.isEmpty(myClassesLookup)) return null;

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

  renderEvents = () => {
    const { isLoading } = this.state;

    if (isLoading) return <></>;

    return (
      <View style={styles.noEventsContainer}>
        <LoadingState.NoEvents />

        <Text.Medium text="Nada para hoy" style={styles.noEventsText} />
        <Link
          text="Ver mi calendario"
          textStyle={styles.goToCalendarText}
          onPress={this.handleOnMyCalendarPress}
        />
      </View>
    );
  };

  render() {
    const { isLoading, isRefreshing } = this.state;
    return (
      <>
        <LoadingState.Modal isVisible={isLoading} />
        <HomeComponent
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

export default WithLogger(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
