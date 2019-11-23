import React from 'react';
import { FlatList, Alert, Keyboard, View, StyleSheet } from 'react-native';
import Lodash from 'lodash';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import PropTypes from 'prop-types';
import LoadingState from '../../Components/LoadingState';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import { PostCommentList } from '../../Models';

import PostCommentsComponent from '../../Components/PostComments';
import PostComment from '../../Components/PostComment';
import PopUp from '../../Components/Common/PopUp';
import { spacers } from '../../Core/Theme';

class PostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      postComments: [],
      selectedCommentId: null,
      confirmationPopUpVisible: false,
    };
  }

  componentDidMount() {
    // DEFAULT DATA FOR TESTING PURPOSES, TODO: RECEIVE REAL DATA, WILL USE WHEN CONNECT TO API
    const {
      // navigation: { getParam, pop },
      logger,
    } = this.props;
    // const authorTitle = getParam('authorName', {});
    // const postTitle = getParam('postTitle', {});
    // const postId = getParam('postId', {});
    // const authorId = getParam('authorId', {});

    Promise.all([this.getPostComments()])
      .then(listValues => {
        const [objCommentResponse] = listValues;
        const listPostComments = Lodash.get(objCommentResponse, 'data', []);
        this.setState({ postComments: listPostComments, isLoading: false });
        return logger.success({
          key: MessagesKey.LOAD_POST_COMMENTS_SUCCESS,
          data: listValues,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.LOAD_POST_COMMENTS_FAILED,
            data: objError,
          });
        }, 800);
      });
  }

  handleAuthorPress = authorId => {
    // TODO : PuSH to author
    // const {
    //   navigation: { push },
    // } = this.props;
    // push('UserProfile', {authorId});
    Alert.alert(`goToAuthor: ${authorId}`);
  };

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  getPostComments = () => {
    return {
      success: true,
      data: [
        {
          id: '5dcb3a143f84959c924adfa8',
          author: 'Emma Paige',
          authorBadgeUri: 'https://cdn0.iconfinder.com/data/icons/usa-politics/67/45-512.png',
          authorInitials: 'EP',
          comment: 'Entregar project charter y un power point para presentarlo en clase.',
          isAuthor: false,
          score: 10,
          personalScore: 1,
          authorId: '1',
        },
        {
          id: '5d924adfa89',
          author: 'Emma Paige',
          authorBadgeUri: 'https://cdn0.iconfinder.com/data/icons/usa-politics/67/45-512.png',
          authorInitials: 'EP',
          comment: 'Entregar project charter y un power point para presentarlo en clase.',
          isAuthor: true,
          score: 10,
          personalScore: -1,
          authorId: '2',
        },
      ],
    };
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
    const { selectedCommentId } = this.state;
    this.setState({ isLoading: true });
    if (selectedCommentId) {
      // TODO : Send Delete Comment to API
      this.deleteItemById(selectedCommentId);
    }
    this.setState({
      selectedCommentId: null,
      confirmationPopUpVisible: false,
      isLoading: false,
    });
  };

  handlePostComment = comment => {
    // TODO : Send Post Comment to API
    const commentObj = {
      id: `5dcb3a143f84959c924adfa89${comment}`,
      author: 'Emma Paige',
      authorBadgeUri: 'https://cdn0.iconfinder.com/data/icons/usa-politics/67/45-512.png',
      authorInitials: 'EP',
      comment,
      isAuthor: true,
      score: 10,
      personalScore: -1,
      authorId: '2',
    };
    this.setState(prevState => ({ postComments: [...prevState.postComments, commentObj] }));
    Keyboard.dismiss();
  };

  showConfirmationBox = commentId => {
    this.setState({
      selectedCommentId: commentId,
      confirmationPopUpVisible: true,
    });
  };

  renderComment = ({ item }) => {
    return (
      <View style={styles.postCommentContainer}>
        <PostComment
          author={item.author}
          onAuthorPress={() => this.handleAuthorPress(item.authorId)}
          onUpVote={isUpvote => this.handleUpVote(item.id, isUpvote)}
          onDownVote={isDownVote => this.handleDownVote(item.id, isDownVote)}
          badgeUri={item.authorBadgeUri}
          initialsText={item.authorInitials}
          comment={item.comment}
          isAuthor={item.isAuthor}
          score={item.score}
          personalScore={item.PersonalScore}
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
    const { authorName, postTitle, authorId } = this.props;
    return (
      <PostCommentsComponent
        onBackArrow={this.goBack}
        onAuthorPress={() => this.handleAuthorPress(authorId)}
        renderComments={this.renderComments}
        author={authorName}
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

// DUMMY DATA
PostComments.defaultProps = {
  authorName: 'Emma Paige',
  postTitle: 'Entrega de Informe Final',
  authorId: '3',
};

PostComments.propTypes = {
  authorName: PropTypes.string,
  postTitle: PropTypes.string,
  authorId: PropTypes.string,
};

export default WithLogger(PostComments);
