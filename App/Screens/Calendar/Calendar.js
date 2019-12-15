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
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      subjects: [],
      isLoading: true,
      isRefreshing: false,
      selectedDate: null,
    };
  }

  componentDidMount() {
    const {
      navigation: { addListener },
    } = this.props;

    const today = Moment().format('YYYYMMDD');
    this.setState({
      selectedDate: Moment().format('YYYYMMDD'),
      isLoading: true,
    });

    this.focusListener = addListener('didFocus', () => {
      const { selectedDate } = this.state;
      if (selectedDate) {
        return this.fetchEvents(selectedDate);
      }
      return this.fetchEvents(today);
    });
  }

  componentDidUpdate(prevProps) {
    const { selectedDate } = this.state;
    const { isModalVisible } = this.props;
    if (prevProps.isModalVisible !== isModalVisible) {
      return this.fetchEvents(selectedDate);
    }
    return false;
  }

  getEvents = strDate => {
    return Api.GetEvents(strDate);
  };

  fetchEvents = strDate => {
    const { logger } = this.props;
    return this.getEvents(strDate)
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
    const formattedDateSelected = selectedDate.format('YYYYMMDD');

    this.setState({
      selectedDate: formattedDateSelected,
    });
    return this.fetchEvents(formattedDateSelected);
  };

  handleOnSubjectPress = objSubject => {
    const {
      navigation: { navigate },
    } = this.props;
    const idSection = Lodash.get(objSubject, ['id'], null);
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
      },
      () => this.fetchEvents(selectedDate).then(() => this.setState({ isRefreshing: false }))
    );
  };

  render() {
    const { isLoading, isRefreshing } = this.state;
    return (
      <CalendarComponent
        onGlobalPress={() => null}
        onPrivatePress={() => null}
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
      />
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
