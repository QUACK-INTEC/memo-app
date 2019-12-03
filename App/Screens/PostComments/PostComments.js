import React from 'react';
import { FlatList, Alert, Keyboard, View, StyleSheet } from 'react-native';
import Lodash from 'lodash';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import { PostCommentList } from '../../Models';
import Api from '../../Core/Api';
import LoadingState from '../../Components/LoadingState';

import PostCommentsComponent from '../../Components/PostComments';
import PostComment from '../../Components/PostComment';
import PopUp from '../../Components/Common/PopUp';
import { spacers } from '../../Core/Theme';
import { selectors as userManagerSelectors } from '../../Redux/Common/UserManager';

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

  handleUpVote = (commentId, isUpVote) => {
    if (isUpVote) {
      // TODO : Send UpVote to API
      return Alert.alert(`upvote: ${commentId}`);
    }

    // TODO: Send remove UpVote to API
    return Alert.alert(`remove upvote: ${commentId}`);
  };

  handleDownVote = (commentId, isDownVote) => {
    if (isDownVote) {
      // TODO : Send DownVote to API
      return Alert.alert(`downVote: ${commentId}`);
    }

    // TODO: Send remove DownVote to API
    return Alert.alert(`remove downVote: ${commentId}`);
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
    const { userFirstName, userLastName, logger, userId, userEmail } = this.props;
    const { postId } = this.state;
    this.setLoading(true);
    Api.AddComment(postId, { body })
      .then(objResponse => {
        this.setState({ isLoading: false });
        const isSuccess = Lodash.get(objResponse, ['data', 'success'], false);
        if (isSuccess) {
          this.setState({
            isLoading: false,
          });
          const objCommentResponse = Lodash.get(objResponse, ['data', 'comment'], {});
          const author = {
            id: `${userId}`,
            email: `${userEmail}`,
            firstName: `${userFirstName}`,
            lastName: `${userLastName}`,
            points: 0,
          };
          objCommentResponse.author = author;
          this.setState(prevState => ({
            postComments: [...prevState.postComments, objCommentResponse],
          }));
          logger.success({
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
          author={item.author}
          onAuthorPress={() => this.handleAuthorPress(item.authorId)}
          onUpVote={isUpvote => this.handleUpVote(item.id, isUpvote)}
          onDownVote={isDownVote => this.handleDownVote(item.id, isDownVote)}
          badgeUri={item.authorBadgeUri}
          initialsText={item.authorInitials}
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
        <ActionSheetProvider>{this.renderPostCommentsComponent()}</ActionSheetProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  postCommentContainer: { ...spacers.PB_1 },
});

PostComments.defaultProps = {
  userId: null,
  userFirstName: null,
  userLastName: null,
  userEmail: null,
};

PostComments.propTypes = {
  userId: PropTypes.string,
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
  userEmail: PropTypes.string,
};

const mapStateToProps = (state, props) => {
  const { getFirstName, getLastName, getAvatarUser, getEmail, getUserId } = userManagerSelectors;
  return {
    userFirstName: getFirstName(state, props),
    userLastName: getLastName(state, props),
    userAvatarURI: getAvatarUser(state, props),
    userEmail: getEmail(state, props),
    userId: getUserId(state, props),
  };
};

export default WithLogger(
  connect(
    mapStateToProps,
    null
  )(PostComments)
);
