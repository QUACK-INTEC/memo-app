import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Lodash from 'lodash';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ClassHubComponent from '../../Components/ClassHub';
import Api from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import Text from '../../Components/Common/Text';
import { selectors as myClassesSelectors } from '../../Redux/Common/MyClasses';
import { fonts, colors } from '../../Core/Theme';
import { actions as EventFormActions } from '../EventForm/Redux';

import { Posts } from '../../Models';

class ClassHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      professorName: null,
      classRoom: null,
      code: null,
      subjectName: null,
      participants: [],
      posts: [],
      idSection: null,
      isLoadingPosts: false,
      isFetchingPost: false,
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam, pop },
      logger,
    } = this.props;
    const objSectionInfo = getParam('sectionInfo', {});
    const idSection = getParam('id', {});
    const professorName = Lodash.get(objSectionInfo, ['professorName'], '');
    const classRoom = Lodash.get(objSectionInfo, ['classRoom'], '');
    const code = Lodash.get(objSectionInfo, ['code'], '');
    const subjectName = Lodash.get(objSectionInfo, ['subjectName'], '');
    this.setState({
      professorName,
      classRoom,
      code,
      subjectName,
      idSection,
      isLoadingPosts: true,
    });
    Promise.all([this.getSectionStudents(idSection), this.getSectionPosts(idSection)])
      .then(listValues => {
        const [objSectionStudentsResponse, objSectionPostResponse] = listValues;
        const listStudents = Lodash.get(objSectionStudentsResponse, ['data', 'data'], []);
        const listPosts = Lodash.get(objSectionPostResponse, ['data', 'data'], []);
        this.setState({
          students: listStudents.length,
          posts: listPosts,
          participants: listStudents,
          isLoadingPosts: false,
        });
        return logger.success({
          key: MessagesKey.LOAD_SECTION_INFO_SUCCESS,
          data: listValues,
        });
      })
      .catch(objError => {
        this.setState({ isLoadingPosts: false }, () => pop());
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.LOAD_SECTION_INFO_FAILED,
            data: objError,
          });
        }, 800);
      });
  }

  getSectionStudents = idSection => {
    return Api.GetSectionStudents(idSection);
  };

  getSectionPosts = idSection => {
    return Api.GetSectionPosts(idSection);
  };

  fetchPosts = () => {
    const { idSection } = this.state;
    const { logger } = this.props;
    this.setState({ isFetchingPost: true });
    return this.getSectionPosts(idSection)
      .then(objResponse => {
        const listPosts = Lodash.get(objResponse, ['data', 'data'], []);
        this.setState({
          posts: listPosts,
          isFetchingPost: false,
        });
        return logger.success({
          key: MessagesKey.LOAD_SECTION_INFO_SUCCESS,
          data: objResponse,
        });
      })
      .catch(objError => {
        this.setState({ isFetchingPost: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.LOAD_SECTION_INFO_FAILED,
            data: objError,
          });
        }, 800);
      });
  };

  handleOnPressBackArrow = () => {
    const {
      navigation: { pop },
    } = this.props;
    pop();
  };

  handleOnPressGoToEvents = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Calendar');
  };

  handleOnPressGoToParticipants = () => {
    const {
      navigation: { navigate },
    } = this.props;
    const { participants } = this.state;
    navigate('Participants', { participants });
  };

  handleOnPressGoToResources = () => {
    const {
      navigation: { navigate },
    } = this.props;
    const { subjectName, idSection } = this.state;
    navigate('SubjectsByTeacher', { subjectName, idSection });
  };

  handleAddPublication = () => {
    const { idSection } = this.state;
    const { setModalVisible, setInitialFormValues } = this.props;
    setInitialFormValues({ section: idSection });
    setModalVisible(true);
  };

  handleOnPressPost = objPost => {
    const { subjectName } = this.state;
    const {
      navigation: { navigate },
    } = this.props;
    const {
      id,
      title,
      description,
      author,
      postedBy,
      startDate,
      endDate,
      authorInitials,
    } = objPost;
    const { id: authorId, points: authorPoints } = author;
    navigate('PostInfo', {
      id,
      title,
      description,
      authorPoints,
      postedBy,
      authorId,
      startDate,
      endDate,
      subjectName,
      authorInitials,
    });
  };

  renderScheduleClass = () => {
    const {
      navigation: { getParam },
    } = this.props;
    const objSectionInfo = getParam('sectionInfo', {});
    const objScheduleSection = Lodash.get(objSectionInfo, ['schedule'], {});

    return Object.keys(objScheduleSection).map(strScheduleKey => {
      const { from, to } = objScheduleSection[strScheduleKey];
      return (
        <Text.Medium
          key={`${strScheduleKey} ${from}:00 - ${to}:00`}
          text={`${strScheduleKey} ${from}:00 - ${to}:00`}
          style={{ ...fonts.SIZE_L, color: colors.WHITE }}
        />
      );
    });
  };

  renderPostsEmpty = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text.ItalicLight
          text="No hay ningun post en creado para esta materia"
          style={{ color: colors.GRAY }}
        />
      </View>
    );
  };

  renderClassHubComponent = () => {
    const {
      professorName,
      students,
      classRoom,
      code,
      subjectName,
      posts,
      isFetchingPost,
      isLoadingPosts,
    } = this.state;
    const postData = Posts.getPostData(posts).reverse();

    return (
      <ClassHubComponent
        subjectName={subjectName}
        subjectTeacher={professorName}
        subjectRoom={classRoom}
        subjectSection={code}
        renderSubjectSchedule={this.renderScheduleClass}
        subjectStudents={students}
        onPressGoToEvents={this.handleOnPressGoToEvents}
        onPressGoToParticipants={this.handleOnPressGoToParticipants}
        onPressGoToResources={this.handleOnPressGoToResources}
        onBackArrowPress={this.handleOnPressBackArrow}
        onPressAddPublication={this.handleAddPublication}
        posts={postData}
        isFetchingPost={isFetchingPost}
        isLoadingPosts={isLoadingPosts}
        onRefreshPosts={this.fetchPosts}
        onPressPost={this.handleOnPressPost}
      />
    );
  };

  render() {
    return this.renderClassHubComponent();
  }
}

ClassHub.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
  setInitialFormValues: PropTypes.func.isRequired,
};
const mapStateToProps = (state, props) => {
  const { getMyClassesLookup } = myClassesSelectors;
  return {
    myClassesLookup: getMyClassesLookup(state, props),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setModalVisible: EventFormActions.setModalVisible,
      setInitialFormValues: EventFormActions.setInitialFormValues,
    },
    dispatch
  );
};

export default WithLogger(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClassHub)
);
