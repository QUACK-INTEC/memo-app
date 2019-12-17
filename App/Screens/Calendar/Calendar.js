import React from 'react';
import Lodash from 'lodash';
import Moment from 'moment';
import { connect } from 'react-redux';

import CalendarComponent from '../../Components/Calendar';
import { Events } from '../../Models';
import Api from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import { selectors as EventFormSelectors } from '../EventForm/Redux';

class Calendar extends React.Component {
  static getDerivedStateFromProps(props) {
    const sectionId = props.navigation.getParam('sectionId', null);
    const subjectName = props.navigation.getParam('subjectName', null);

    if (sectionId && props.navigation.state.params.sectionId) {
      return { sectionId, subjectName };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      subjects: [],
      isLoading: true,
      isRefreshing: false,
      selectedDate: Moment().format('YYYYMMDD'),
      sectionId: null,
      subjectName: null,
      showingPrivateEvents: false,
      isPublic: true,
    };
  }

  componentDidMount() {
    const {
      navigation: { addListener },
    } = this.props;

    const today = Moment().format('YYYYMMDD');
    this.setState({
      isLoading: true,
      sectionId: null,
    });

    this.focusListener = addListener('didFocus', () => {
      const { selectedDate } = this.state;
      if (selectedDate) {
        return this.fetchEvents(selectedDate);
      }
      return this.fetchEvents(today);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedDate, isPublic } = this.state;
    const { isModalVisible } = this.props;

    if (prevProps.isModalVisible !== isModalVisible || prevState.isPublic !== isPublic) {
      return this.fetchEvents(selectedDate);
    }
    return null;
  }

  getEvents = strDate => {
    const { isPublic, sectionId } = this.state;
    return Api.GetEvents(strDate, sectionId, isPublic);
  };

  fetchEvents = (strDate, isPublic = true) => {
    const { logger } = this.props;
    const { sectionId } = this.state;
    this.setState({
      isLoading: true,
    });
    return this.getEvents(strDate, sectionId, isPublic)
      .then(objResponse => {
        const listEvents = Lodash.get(objResponse, ['data', 'events'], []);
        const listSubjects = Lodash.get(objResponse, ['data', 'classes'], []);
        this.setState({
          events: listEvents,
          subjects: listSubjects,
          isLoading: false,
        });
        return logger.success({
          key: MessagesKey.LOAD_EVENTS_SUCCESS,
          data: objResponse,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return logger.error({
          key: MessagesKey.LOAD_EVENTS_FAILED,
          data: objError,
        });
      });
  };

  getEventsList = () => {
    const { events } = this.state;
    return Events.getEventsData(events);
  };

  getClassesList = () => {
    const { subjects } = this.state;
    return Events.getClassesData(subjects);
  };

  handleOnDateChange = selectedDate => {
    const { sectionId } = this.state;
    const formattedDateSelected = selectedDate.format('YYYYMMDD');

    this.setState({
      selectedDate: formattedDateSelected,
    });
    return this.fetchEvents(formattedDateSelected, sectionId);
  };

  handleOnSubjectPress = objSubject => {
    const {
      navigation: { navigate },
    } = this.props;

    const idSection = Lodash.get(objSubject, ['id'], null);
    const subjectName = Lodash.get(objSubject, ['subject'], null);
    return navigate('ClassHub', { id: idSection, subjectName });
  };

  handleOnEventPress = objEvent => {
    const {
      navigation: { navigate },
    } = this.props;
    const subjectName = Lodash.get(objEvent, ['subject'], null);

    return navigate('PostInfo', {
      id: Lodash.get(objEvent, ['id'], null),
      subjectName,
    });
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

  handleOnEventUpVote = objEvent => {
    const postId = Lodash.get(objEvent, ['id'], null);
    return this.handleOnUpVote(postId, objEvent);
  };

  handleOnEventDownVote = objEvent => {
    const postId = Lodash.get(objEvent, ['id'], null);
    return this.handleOnDownVote(postId, objEvent);
  };

  handleOnRefresh = () => {
    const { selectedDate } = this.state;
    return this.setState(
      {
        isRefreshing: true,
        sectionId: null,
      },
      () => this.fetchEvents(selectedDate).then(() => this.setState({ isRefreshing: false }))
    );
  };

  handleOnQuitFilter = () => {
    const {
      navigation: { setParams },
    } = this.props;
    const { selectedDate } = this.state;

    setParams({ sectionId: null });
    this.setState(
      {
        sectionId: null,
      },
      () => this.fetchEvents(selectedDate)
    );
  };

  handleOnGlobalPress = () => {
    this.setState({
      isPublic: true,
      showingPrivateEvents: false,
    });
  };

  handleOnPrivatePress = () => {
    this.setState({
      isPublic: false,
      showingPrivateEvents: true,
    });
  };

  render() {
    const { isLoading, isRefreshing, sectionId, subjectName, showingPrivateEvents } = this.state;
    return (
      <>
        <CalendarComponent
          showingPrivate={showingPrivateEvents}
          onGlobalPress={this.handleOnGlobalPress}
          onPrivatePress={this.handleOnPrivatePress}
          onDateChange={this.handleOnDateChange}
          events={this.getEventsList()}
          subjects={this.getClassesList()}
          isLoading={isLoading}
          onEventPress={this.handleOnEventPress}
          onSubjectPress={this.handleOnSubjectPress}
          onEventDownVote={this.handleOnEventDownVote}
          onEventUpVote={this.handleOnEventUpVote}
          refreshing={isRefreshing}
          onRefresh={this.handleOnRefresh}
          hasFilter={!!sectionId}
          onQuitFilter={this.handleOnQuitFilter}
          filterLabel={subjectName}
        />
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { getIsModalVisible } = EventFormSelectors;
  return {
    isModalVisible: getIsModalVisible(state, props),
  };
};

export default WithLogger(
  connect(
    mapStateToProps,
    null
  )(Calendar)
);
