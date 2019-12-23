import React from 'react';
import { FlatList, Keyboard, View, StyleSheet } from 'react-native';
import Lodash from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import { PostCommentList } from '../../Models';
import Api from '../../Core/Api';
import LoadingState from '../../Components/LoadingState';

import PostCommentsComponent from '../../Components/PostComments';
import Text from '../../Components/Common/Text';
import PostComment from '../../Components/PostComment';
import PopUp from '../../Components/Common/PopUp';
import { spacers, colors } from '../../Core/Theme';
import { selectors as userManagerSelectors } from '../../Redux/Common/UserManager';

import { GAMIFICATION_MSG } from '../../Utils';

class PostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      postComments: [],
      selectedCommentId: null,
      confirmationPopUpVisible: false,
      author: '',
      postTitle: '',
      postId: '',
      authorId: '',
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam },
    } = this.props;
    const author = getParam('author', '');
    const postTitle = getParam('title', '');
    const postId = getParam('postId', '');
    const authorId = getParam('authorId', '');
    const comments = getParam('comments', []);

    this.setState({
      postComments: comments,
      author,
      postTitle,
      postId,
      authorId,
      isLoading: false,
    });
  }

  setLoading = isLoading => {
    return this.setState({ isLoading });
  };

  handleAuthorPress = () => {
    const {
      navigation: { navigate },
    } = this.props;
    const { authorId } = this.state;
    return navigate('UserProfile', { authorId });
  };

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  goBack = () => {
    const {
      navigation: { pop },
    } = this.props;
    this.setState({
      confirmationPopUpVisible: false,
    });
    pop();
  };

  handleUpVote = (commentId, isUpVote, commentObj) => {
    const { logger, toastRef } = this.props;
    const { postComments } = this.state;
    const current = Lodash.get(toastRef, ['current'], null);
    this.setState({ isLoading: true });
    if (isUpVote) {
      return Api.UpvoteComment(commentId)
        .then(objResponse => {
          this.setState({ isLoading: false });
          const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
          if (isSuccess) {
            current.setToastVisible(GAMIFICATION_MSG(1));
            const modifiedCommentObj = { ...commentObj };
            modifiedCommentObj.score =
              commentObj.currentUserReaction !== 0 ? commentObj.score + 2 : commentObj.score + 1;
            modifiedCommentObj.currentUserReaction = 1;
            const modifiedPostComments = postComments.map(objComment => {
              if (objComment.id === commentId) {
                return modifiedCommentObj;
              }
              return objComment;
            });

            this.setState({
              isLoading: false,
              postComments: modifiedPostComments,
            });
            logger.success({
              key: MessagesKey.UPVOTE_COMMENT_SUCCESS,
              data: objResponse,
            });
            return true;
          }
          logger.error({
            key: MessagesKey.UPVOTE_COMMENT_FAILED,
            data: objResponse,
          });
          return false;
        })
        .catch(objError => {
          this.setState({ isLoading: false });
          setTimeout(() => {
            logger.error({
              key: MessagesKey.UPVOTE_COMMENT_FAILED,
              data: objError,
            });
          }, 800);
          return false;
        });
    }
    return Api.ResetvoteComment(commentId)
      .then(objResponse => {
        this.setState({ isLoading: false });
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          const modifiedCommentObj = { ...commentObj };
          modifiedCommentObj.score = commentObj.score - 1;
          modifiedCommentObj.currentUserReaction = 0;
          const modifiedPostComments = postComments.map(objComment => {
            if (objComment.id === commentId) {
              return modifiedCommentObj;
            }
            return objComment;
          });
          this.setState({
            isLoading: false,
            postComments: modifiedPostComments,
          });
          logger.success({
            key: MessagesKey.RESETVOTE_COMMENT_SUCCESS,
            data: objResponse,
          });
          return true;
        }
        logger.error({
          key: MessagesKey.RESETVOTE_COMMENT_FAILED,
          data: objResponse,
        });
        return false;
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        setTimeout(() => {
          logger.error({
            key: MessagesKey.RESETVOTE_COMMENT_FAILED,
            data: objError,
          });
        }, 800);
        return false;
      });
  };

  handleDownVote = (commentId, isDownVote, commentObj) => {
    const { logger, toastRef } = this.props;
    const { postComments } = this.state;
    const current = Lodash.get(toastRef, ['current'], null);

    this.setState({ isLoading: true });
    if (isDownVote) {
      return Api.DownvoteComment(commentId)
        .then(objResponse => {
          this.setState({ isLoading: false });
          const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
          if (isSuccess) {
            current.setToastVisible(GAMIFICATION_MSG(1));
            const modifiedCommentObj = { ...commentObj };
            modifiedCommentObj.score =
              commentObj.currentUserReaction !== 0 ? commentObj.score - 2 : commentObj.score - 1;
            modifiedCommentObj.currentUserReaction = -1;
            const modifiedPostComments = postComments.map(objComment => {
              if (objComment.id === commentId) {
                return modifiedCommentObj;
              }
              return objComment;
            });
            this.setState({
              isLoading: false,
              postComments: modifiedPostComments,
            });
            logger.success({
              key: MessagesKey.DOWNVOTE_COMMENT_SUCCESS,
              data: objResponse,
            });
            return true;
          }
          logger.error({
            key: MessagesKey.DOWNVOTE_COMMENT_FAILED,
            data: objResponse,
          });
          return false;
        })
        .catch(objError => {
          this.setState({ isLoading: false });
          setTimeout(() => {
            logger.error({
              key: MessagesKey.DOWNVOTE_COMMENT_FAILED,
              data: objError,
            });
          }, 800);
          return false;
        });
    }
    return Api.ResetvoteComment(commentId)
      .then(objResponse => {
        this.setState({ isLoading: false });
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          const modifiedCommentObj = { ...commentObj };
          modifiedCommentObj.score = commentObj.score + 1;
          modifiedCommentObj.currentUserReaction = 0;
          const modifiedPostComments = postComments.map(objComment => {
            if (objComment.id === commentId) {
              return modifiedCommentObj;
            }
            return objComment;
          });
          this.setState({
            isLoading: false,
            postComments: modifiedPostComments,
          });
          logger.success({
            key: MessagesKey.RESETVOTE_COMMENT_SUCCESS,
            data: objResponse,
          });
          return true;
        }
        logger.error({
          key: MessagesKey.RESETVOTE_COMMENT_FAILED,
          data: objResponse,
        });
        return false;
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        setTimeout(() => {
          logger.error({
            key: MessagesKey.RESETVOTE_COMMENT_FAILED,
            data: objError,
          });
        }, 800);
        return false;
      });
  };

  deleteItemById = id => {
    const { postComments } = this.state;
    const filteredData = postComments.filter(item => item.id !== id);
    this.setState({ postComments: filteredData });
  };

  deleteComment = () => {
    const { logger } = this.props;
    const { selectedCommentId, postId } = this.state;

    if (selectedCommentId) {
      this.setState({ isLoading: true });
      Api.DeleteComment(postId, selectedCommentId)
        .then(objResponse => {
          this.setState({ isLoading: false });
          const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
          if (isSuccess) {
            this.setState({
              isLoading: false,
            });
            this.deleteItemById(selectedCommentId);
            logger.success({
              key: MessagesKey.DELETE_COMMENT_SUCCESS,
              data: objResponse,
            });
          }
          return logger.error({
            key: MessagesKey.DELETE_COMMENT_FAILED,
            data: objResponse,
          });
        })
        .catch(objError => {
          this.setState({ isLoading: false });
          return setTimeout(() => {
            logger.error({
              key: MessagesKey.DELETE_COMMENT_FAILED,
              data: objError,
            });
          }, 800);
        });
    }
    this.setState({
      selectedCommentId: null,
      confirmationPopUpVisible: false,
      isLoading: false,
    });
  };

  handlePostComment = body => {
    const {
      userFirstName,
      userLastName,
      logger,
      userId,
      userEmail,
      userAvatarURI,
      toastRef,
      userBadgeUri,
    } = this.props;
    const { postId } = this.state;
    const current = Lodash.get(toastRef, ['current'], null);
    this.setLoading(true);
    Api.AddComment(postId, { body })
      .then(objResponse => {
        this.setState({ isLoading: false });
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          current.setToastVisible(GAMIFICATION_MSG(10));
          this.setState({
            isLoading: false,
          });
          const objCommentResponse = Lodash.get(objResponse, ['data', 'comment'], {});
          const author = {
            id: `${userId}`,
            email: `${userEmail}`,
            firstName: `${userFirstName}`,
            lastName: `${userLastName}`,
            avatarURL: Lodash.isNull(userAvatarURI) ? null : `${userAvatarURI}`,
            points: 0,
            BadgeUri: userBadgeUri,
          };
          objCommentResponse.author = author;
          this.setState(prevState => ({
            postComments: [...prevState.postComments, objCommentResponse],
          }));
          return logger.success({
            key: MessagesKey.CREATE_COMMENT_SUCCESS,
            data: objResponse,
          });
        }
        return logger.error({
          key: MessagesKey.CREATE_COMMENT_FAILED,
          data: objResponse,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.CREATE_COMMENT_FAILED,
            data: objError,
          });
        }, 800);
      });
    Keyboard.dismiss();
  };

  showConfirmationBox = commentId => {
    this.setState({
      selectedCommentId: commentId,
      confirmationPopUpVisible: true,
    });
  };

  renderComment = ({ item }) => {
    const { userId } = this.props;
    return (
      <View style={styles.postCommentContainer}>
        <PostComment
          author={item.authorFullName}
          onAuthorPress={() => this.handleAuthorPress(item.authorId)}
          onUpVote={isUpvote => this.handleUpVote(item.id, isUpvote, item)}
          onDownVote={isDownVote => this.handleDownVote(item.id, isDownVote, item)}
          badgeUri={item.authorBadgeUri}
          initialsText={item.authorInitials}
          avatarUri={item.avatarUri}
          comment={item.body}
          isAuthor={userId === item.authorId}
          score={item.score}
          personalScore={item.currentUserReaction}
          onDeleteComment={() => this.showConfirmationBox(item.id)}
        />
      </View>
    );
  };

  renderComments = () => {
    const { postComments } = this.state;
    const postCommentsFormatted = PostCommentList.getPostCommentsData(postComments);

    if (Lodash.isEmpty(postCommentsFormatted)) {
      return (
        <View style={styles.noCommentsContainer}>
          <LoadingState.Empty />
          <Text.Medium
            text="Aún no se han registrado comentarios en esta publicación. Dejanos saber tu opinión!"
            style={styles.noCommentsText}
          />
        </View>
      );
    }

    return (
      <FlatList
        data={postCommentsFormatted}
        renderItem={this.renderComment}
        keyExtractor={item => item.id}
      />
    );
  };

  renderPostCommentsComponent = () => {
    const { author, postTitle, authorId } = this.state;
    return (
      <PostCommentsComponent
        onBackArrow={this.goBack}
        onAuthorPress={() => this.handleAuthorPress(authorId)}
        renderComments={this.renderComments}
        author={author}
        postTitle={postTitle}
        onCommentPost={this.handlePostComment}
      />
    );
  };

  render() {
    const { isLoading, confirmationPopUpVisible } = this.state;
    return (
      <View style={styles.container}>
        <PopUp.Default
          isVisible={confirmationPopUpVisible}
          leftButtonText="Cancelar"
          rightButtonText="Si"
          title="¿Seguro que quieres eliminar este comentario?"
          onRightPress={this.deleteComment}
          onLeftPress={() => this.setState({ confirmationPopUpVisible: false })}
        />
        <LoadingState.Modal isVisible={isLoading} />
        {this.renderPostCommentsComponent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  postCommentContainer: { ...spacers.PB_1 },
  noCommentsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...spacers.MB_15,
  },
  noCommentsText: {
    color: colors.GRAY,
    ...spacers.MT_16,
    ...spacers.MB_2,
    ...spacers.ML_8,
    ...spacers.MR_8,
    textAlign: 'center',
  },
});

PostComments.defaultProps = {
  userId: null,
  userFirstName: null,
  userLastName: null,
  userEmail: null,
  userAvatarURI: null,
  userBadgeUri: null,
};

PostComments.propTypes = {
  userId: PropTypes.string,
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
  userEmail: PropTypes.string,
  userAvatarURI: PropTypes.string,
  userBadgeUri: PropTypes.string,
  toastRef: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state, props) => {
  const {
    getFirstName,
    getLastName,
    getAvatarUser,
    getEmail,
    getUserId,
    getBadgeUrl,
  } = userManagerSelectors;
  return {
    userFirstName: getFirstName(state, props),
    userLastName: getLastName(state, props),
    userAvatarURI: getAvatarUser(state, props),
    userEmail: getEmail(state, props),
    userId: getUserId(state, props),
    userBadgeUri: getBadgeUrl(state, props),
  };
};

export default WithLogger(
  connect(
    mapStateToProps,
    null
  )(PostComments)
);
