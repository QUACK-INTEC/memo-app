import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import Lodash from 'lodash';
import Moment from 'moment/min/moment-with-locales';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import PostInfoForm from '../../Components/PostInfo';
import LoadingState from '../../Components/LoadingState';
import Api from '../../Core/Api';
import PopUp from '../../Components/Common/PopUp';
import SubTask from '../../Components/SubTask';
import { SubTasks } from '../../Models';
import { spacers } from '../../Core/Theme';
import { selectors as userManagerSelectors } from '../../Redux/Common/UserManager';
import { actions as EventFormActions, selectors as EventFormSelectors } from '../EventForm/Redux';
import { GAMIFICATION_MSG } from '../../Utils';

class PostInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      confirmationPopUpVisible: false,
      deleteConfirmationPopUpVisible: false,
      postId: null,
      userSubTasks: [],
      postedBy: '',
      title: '',
      description: '',
      authorId: null,
      subjectName: '',
      formattedDate: null,
      formattedStartDate: null,
      formattedEndDate: null,
      authorInitials: '',
      comments: [],
      attachments: [],
      score: 0,
      currentUserReaction: 0,
      authorURL: '',
      badgeURI: '',
      hasAttachments: false,
      isPublic: true,
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam, addListener },
      logger,
    } = this.props;
    const id = getParam('id', {});
    const subjectName = getParam('subjectName', '');

    this.setState({
      subjectName,
      postId: id,
    });

    this.focusListener = addListener('didFocus', () => {
      return this.fetchPost();
    });

    this.getPostInfo(id)
      .then(objPostInfoResponse => {
        const isSuccess = Lodash.get(objPostInfoResponse, ['data', 'success'], false);

        if (isSuccess) {
          const objPostInfo = Lodash.get(objPostInfoResponse, ['data', 'data'], {});
          const listSubTasks = Lodash.get(objPostInfo, ['subtasks'], []);
          const postComments = Lodash.get(objPostInfo, ['comments'], []);
          const postDescription = Lodash.get(objPostInfo, ['description'], '');
          const postAttachments = Lodash.get(objPostInfo, ['attachments'], []);
          const postAuthor = Lodash.get(objPostInfo, ['author'], {});
          const title = Lodash.get(objPostInfo, ['title'], '');
          const section = Lodash.get(objPostInfo, ['section', 'id'], null);
          const score = Lodash.get(objPostInfo, ['score'], 0);
          const currentUserReaction = Lodash.get(objPostInfo, ['currentUserReaction'], 0);
          const authorFirstName = Lodash.get(postAuthor, ['firstName'], ' ');
          const authorLastName = Lodash.get(postAuthor, ['lastName'], ' ');
          const authorURL = Lodash.get(postAuthor, ['avatarURL'], '');
          const postAuthorId = Lodash.get(objPostInfo, ['author', 'id'], '');
          const badgeURI = Lodash.get(objPostInfo, ['author', 'rank', 'badgeUrl'], '');
          const startDate = Lodash.get(objPostInfo, ['startDate'], null);
          const endDate = Lodash.get(objPostInfo, ['endDate'], null);
          const isPublic = Lodash.get(objPostInfo, ['isPublic'], null);
          const hasAttachments = !Lodash.isNull(postAttachments) && postAttachments.length > 0;

          const authorName = `${authorFirstName} ${authorLastName}`;
          const authorInitials = `${authorFirstName[0]}${authorLastName[0]}`;

          const formattedDate = startDate
            ? Moment(startDate)
                .locale('es')
                .utc()
                .format('dddd DD, MMMM')
            : null;
          const formattedStartDate = startDate
            ? Moment(startDate)
                .utc()
                .format('HH:mm')
            : null;
          const formattedEndDate = endDate
            ? Moment(endDate)
                .utc()
                .format('HH:mm')
            : null;

          this.setState({
            userSubTasks: listSubTasks,
            isLoading: false,
            description: postDescription,
            comments: postComments,
            attachments: postAttachments,
            authorId: postAuthorId,
            formattedDate,
            formattedStartDate,
            formattedEndDate,
            title,
            postedBy: authorName,
            authorInitials,
            score,
            currentUserReaction,
            postSectionId: section,
            isPublic,
            authorURL,
            badgeURI,
            hasAttachments,
          });

          return logger.success({
            key: MessagesKey.LOAD_POST_INFO_SUCCESS,
            data: objPostInfoResponse,
          });
        }

        return logger.error({
          key: MessagesKey.LOAD_POST_INFO_FAILEDv,
          data: objPostInfoResponse,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.LOAD_POST_INFO_FAILED,
            data: objError,
          });
        }, 800);
      });
  }

  componentDidUpdate(prevProps) {
    const { isModalVisible } = this.props;
    if (prevProps.isModalVisible !== isModalVisible) {
      return this.fetchPost();
    }
    return false;
  }

  fetchPost = () => {
    const { postId } = this.state;
    const { logger } = this.props;
    return this.getPostInfo(postId)
      .then(objPostInfoResponse => {
        const isSuccess = Lodash.get(objPostInfoResponse, ['data', 'success'], false);

        if (isSuccess) {
          const objPostInfo = Lodash.get(objPostInfoResponse, ['data', 'data'], {});
          const listSubTasks = Lodash.get(objPostInfo, ['subtasks'], []);
          const postComments = Lodash.get(objPostInfo, ['comments'], []);
          const postDescription = Lodash.get(objPostInfo, ['description'], '');
          const postAttachments = Lodash.get(objPostInfo, ['attachments'], []);
          const postAuthor = Lodash.get(objPostInfo, ['author'], '');
          const title = Lodash.get(objPostInfo, ['title'], '');
          const score = Lodash.get(objPostInfo, ['score'], 0);
          const currentUserReaction = Lodash.get(objPostInfo, ['currentUserReaction'], 0);
          const authorFirstName = Lodash.get(postAuthor, ['firstName'], ' ');
          const authorLastName = Lodash.get(postAuthor, ['lastName'], ' ');
          const postAuthorId = Lodash.get(objPostInfo, ['author', 'id'], '');
          const badgeURI = Lodash.get(objPostInfo, ['author', 'rank', 'badgeUrl'], '');
          const startDate = Lodash.get(objPostInfo, ['startDate'], null);
          const endDate = Lodash.get(objPostInfo, ['endDate'], null);
          const section = Lodash.get(objPostInfo, ['section', 'id'], null);
          const isPublic = Lodash.get(objPostInfo, ['isPublic'], null);
          const hasAttachments = !Lodash.isNull(postAttachments) && postAttachments.length > 0;

          const authorName = `${authorFirstName} ${authorLastName}`;
          const authorInitials = `${authorFirstName[0]}${authorLastName[0]}`;

          const formattedDate = startDate
            ? Moment(startDate)
                .locale('es')
                .utc()
                .format('dddd DD, MMMM')
            : null;
          const formattedStartDate = startDate
            ? Moment(startDate)
                .utc()
                .format('HH:mm')
            : null;
          const formattedEndDate = endDate
            ? Moment(endDate)
                .utc()
                .format('HH:mm')
            : null;

          this.setState({
            userSubTasks: listSubTasks,
            isLoading: false,
            description: postDescription,
            comments: postComments,
            attachments: postAttachments,
            authorId: postAuthorId,
            formattedDate,
            formattedStartDate,
            formattedEndDate,
            title,
            postedBy: authorName,
            authorInitials,
            score,
            currentUserReaction,
            postSectionId: section,
            isPublic,
            startDate,
            endDate,
            badgeURI,
            hasAttachments,
          });

          return logger.success({
            key: MessagesKey.LOAD_POST_INFO_SUCCESS,
            data: objPostInfoResponse,
          });
        }

        return logger.error({
          key: MessagesKey.LOAD_POST_INFO_FAILED,
          data: objPostInfoResponse,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.LOAD_POST_INFO_FAILED,
            data: objError,
          });
        }, 800);
      });
  };

  getPostInfo = idPost => {
    return Api.GetPostInfo(idPost);
  };

  handleEdit = () => {
    const {
      title,
      description,
      postSectionId,
      isPublic,
      postId,
      endDate,
      startDate,
      attachments,
    } = this.state;
    const { setEditingModal, setInitialFormValues, setModalVisible } = this.props;
    const objFormValues = {
      title,
      description,
      section: postSectionId,
      type: isPublic ? 'public' : 'private',
      postId,
      endDate: endDate ? Moment(endDate).utc() : null,
      startDate: startDate ? Moment(startDate).utc() : null,
      dateTime: startDate
        ? Moment(startDate)
            .utc()
            .toDate()
        : new Date(),
      attachments,
    };
    setInitialFormValues(objFormValues);
    setEditingModal(true);
    setModalVisible(true);
  };

  deletePost = () => {
    const { logger } = this.props;
    const { postId } = this.state;
    this.setState({ confirmationPopUpVisible: false });
    return Api.DeletePost(postId)
      .then(objResponse => {
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          logger.success({
            key: MessagesKey.DELETE_POST_SUCCESS,
            data: objResponse,
          });
        }
        return this.goBack();
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.DELETE_POST_FAILED,
            data: objError,
          });
        }, 800);
      });
  };

  showConfirmationBox = () => {
    this.setState({
      confirmationPopUpVisible: true,
    });
  };

  goToComments = () => {
    const {
      navigation: { navigate },
    } = this.props;
    const { postId, comments, title, postedBy, authorId } = this.state;
    return navigate('PostComments', { postId, comments, author: postedBy, title, authorId });
  };

  goToResources = () => {
    const {
      navigation: { navigate },
    } = this.props;
    const { postId, attachments, title, postedBy } = this.state;
    return navigate('PostResources', { postId, attachments, author: postedBy, title });
  };

  handleUpVote = value => {
    const { logger, toastRef } = this.props;
    const { postId } = this.state;
    const current = Lodash.get(toastRef, ['current'], {});
    this.setState({ isLoading: true });
    if (value) {
      return Api.UpvotePost(postId)
        .then(objResponse => {
          this.setState({ isLoading: false });
          const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
          if (isSuccess) {
            current.setToastVisible(GAMIFICATION_MSG(10));
            this.setState(prevState => ({
              isLoading: false,
              score:
                prevState.currentUserReaction !== 0 ? prevState.score + 2 : prevState.score + 1,
              currentUserReaction: 1,
            }));
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
    }
    return Api.ResetvotePost(postId)
      .then(objResponse => {
        this.setState({ isLoading: false });
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          this.setState(prevState => ({
            isLoading: false,
            score: prevState.score - 1,
            currentUserReaction: 0,
          }));
          logger.success({
            key: MessagesKey.RESETVOTE_POST_SUCCESS,
            data: objResponse,
          });
          return true;
        }
        logger.error({
          key: MessagesKey.RESETVOTE_POST_FAILED,
          data: objResponse,
        });
        return false;
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        setTimeout(() => {
          logger.error({
            key: MessagesKey.RESETVOTE_POST_FAILED,
            data: objError,
          });
        }, 800);
        return false;
      });
  };

  handleDownVote = value => {
    const { logger, toastRef } = this.props;
    const { postId } = this.state;
    const current = Lodash.get(toastRef, ['current'], {});
    this.setState({ isLoading: true });

    if (value) {
      return Api.DownvotePost(postId)
        .then(objResponse => {
          this.setState({ isLoading: false });
          const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
          if (isSuccess) {
            current.setToastVisible(GAMIFICATION_MSG(10));
            this.setState(prevState => ({
              isLoading: false,
              score:
                prevState.currentUserReaction !== 0 ? prevState.score - 2 : prevState.score - 1,
              currentUserReaction: -1,
            }));
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
    }
    return Api.ResetvotePost(postId)
      .then(objResponse => {
        this.setState({ isLoading: false });
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          this.setState(prevState => ({
            isLoading: false,
            score: prevState.score + 1,
            currentUserReaction: 0,
          }));
          logger.success({
            key: MessagesKey.RESETVOTE_POST_SUCCESS,
            data: objResponse,
          });
          return true;
        }
        logger.error({
          key: MessagesKey.RESETVOTE_POST_FAILED,
          data: objResponse,
        });
        return false;
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        setTimeout(() => {
          logger.error({
            key: MessagesKey.RESETVOTE_POST_FAILED,
            data: objError,
          });
        }, 800);
        return false;
      });
  };

  handleAuthorPress = () => {
    const {
      navigation: { navigate },
    } = this.props;
    const { authorId } = this.state;
    return navigate('ViewProfile', { userId: authorId });
  };

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  setLoading = isLoading => {
    return this.setState({ isLoading });
  };

  goBack = () => {
    const {
      navigation: { pop },
    } = this.props;
    pop();
  };

  handleSubTaskPress = (isDone, subTaskId) => {
    const { logger } = this.props;
    const { postId } = this.state;
    this.setLoading(true);
    return Api.UpdateSubTask(postId, subTaskId, { isDone })
      .then(objResponse => {
        this.setState({ isLoading: false });
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          this.setState({
            isLoading: false,
          });
          return logger.success({
            key: MessagesKey.UPDATE_SUBTASK_SUCCESS,
            data: objResponse,
          });
        }
        return logger.error({
          key: MessagesKey.UPDATE_SUBTASK_FAILED,
          data: objResponse,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.UPDATE_SUBTASK_FAILED,
            data: objError,
          });
        }, 800);
      });
  };

  RemoveSubTaskById = id => {
    const { userSubTasks } = this.state;
    const filteredData = userSubTasks.filter(item => item.id !== id);
    this.setState({ userSubTasks: filteredData });
  };

  deleteSubTask = subTaskId => {
    const { logger } = this.props;
    const { postId } = this.state;
    this.setLoading(true);
    return Api.DeleteSubTask(postId, subTaskId)
      .then(objResponse => {
        this.setState({ isLoading: false });
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          this.setState({
            isLoading: false,
          });
          this.RemoveSubTaskById(subTaskId);
          return logger.success({
            key: MessagesKey.DELETE_SUBTASK_SUCCESS,
            data: objResponse,
          });
        }
        return logger.error({
          key: MessagesKey.DELETE_SUBTASK_FAILED,
          data: objResponse,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.DELETE_SUBTASK_FAILED,
            data: objError,
          });
        }, 800);
      });
  };

  addSubTask = name => {
    const { logger } = this.props;
    const { postId } = this.state;
    this.setLoading(true);
    return Api.AddSubTask(postId, { name })
      .then(objResponse => {
        this.setState({ isLoading: false });
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          this.setState({
            isLoading: false,
          });
          const objSubTask = Lodash.get(objResponse, ['data', 'task'], false);
          this.setState(prevState => ({ userSubTasks: [...prevState.userSubTasks, objSubTask] }));
          return logger.success({
            key: MessagesKey.CREATE_SUBTASK_SUCCESS,
            data: objResponse,
          });
        }
        return logger.error({
          key: MessagesKey.CREATE_SUBTASK_FAILED,
          data: objResponse,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.CREATE_SUBTASK_FAILED,
            data: objError,
          });
        }, 800);
      });
  };

  renderSubTasks = () => {
    const { userSubTasks } = this.state;
    const subtasksFormatted = SubTasks.getSubTasksData(userSubTasks);
    return (
      <View style={{ ...spacers.ML_3, ...spacers.MR_3 }}>
        <SubTask
          data={subtasksFormatted}
          onDeleteSubTask={this.deleteSubTask}
          onSubTaskAdd={this.addSubTask}
          onSubTaskPress={this.handleSubTaskPress}
        />
      </View>
    );
  };

  renderPostInfo = () => {
    const { userId } = this.props;
    const {
      title,
      description,
      postedBy,
      subjectName,
      formattedDate,
      formattedStartDate,
      formattedEndDate,
      authorInitials,
      authorId,
      currentUserReaction,
      score,
      authorURL,
      badgeURI,
      hasAttachments,
      isPublic,
    } = this.state;
    return (
      <PostInfoForm
        onBackArrow={this.handleBackArrow}
        onEdit={this.handleEdit}
        onDelete={this.showConfirmationBox}
        onUpVote={this.handleUpVote}
        onDownVote={this.handleDownVote}
        onAuthorPress={this.handleAuthorPress}
        goToComments={this.goToComments}
        goToResources={this.goToResources}
        renderSubTasks={this.renderSubTasks}
        isAuthor={userId === authorId}
        badgeUri={badgeURI}
        initialsText={authorInitials}
        score={score}
        className={subjectName}
        postTitle={title}
        postDescription={description}
        avatarUri={authorURL}
        postDate={formattedDate}
        postTime={`${formattedStartDate} ${formattedEndDate ? `-${formattedEndDate}` : ''}`}
        author={postedBy}
        personalScore={currentUserReaction}
        hasResources={hasAttachments}
        isPrivate={!isPublic}
      />
    );
  };

  render() {
    const { isLoading, confirmationPopUpVisible, deleteConfirmationPopUpVisible } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <PopUp.Info
          title="Publicación eliminada exitosamente"
          buttonText="OK"
          onButtonPress={this.goBack}
          isVisible={deleteConfirmationPopUpVisible}
        />
        <PopUp.Default
          isVisible={confirmationPopUpVisible}
          leftButtonText="Cancelar"
          rightButtonText="Si"
          title="¿Seguro que quieres eliminar esta publicación?"
          onRightPress={this.deletePost}
          onLeftPress={() => this.setState({ confirmationPopUpVisible: false })}
        />
        <LoadingState.Modal isVisible={isLoading} />
        {this.renderPostInfo()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

PostInfo.defaultProps = {
  userId: null,
};

PostInfo.propTypes = {
  userId: PropTypes.string,
  setEditingModal: PropTypes.func.isRequired,
  setInitialFormValues: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  toastRef: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state, props) => {
  const { getUserId } = userManagerSelectors;
  const { getIsModalVisible } = EventFormSelectors;

  return {
    userId: getUserId(state, props),
    isModalVisible: getIsModalVisible(state, props),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setInitialFormValues: EventFormActions.setInitialFormValues,
      setEditingModal: EventFormActions.setEditingModal,
      setModalVisible: EventFormActions.setModalVisible,
    },
    dispatch
  );
};

export default WithLogger(connect(mapStateToProps, mapDispatchToProps)(PostInfo));
