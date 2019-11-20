import React from 'react';
import { FlatList, Alert, Keyboard } from 'react-native';
import Lodash from 'lodash';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import LoadingState from '../../Components/LoadingState';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import { PostCommentList } from '../../Models';

import PostCommentsComponent from '../../Components/PostComments';
import PostComment from '../../Components/PostComment';

class PostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      postComments: [],
    };
  }

  componentDidMount() {
    const { logger } = this.props;

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
          id: '5dcb3a143f84959c924adfa89',
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

  deleteComment = commentId => {
    // TODO : Send Delete Comment to API
    Alert.alert(`delete comment: ${commentId}`);
  };

  showOptions = commentId => {
    // TODO : Send Delete Comment to API
    Alert.alert(`options: ${commentId}`);
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
    Alert.alert(`Comment: ${comment}`);
  };

  renderComment = ({ item }) => {
    return (
      <PostComment
        author={item.author}
        onAuthorPress={() => this.handleAuthorPress(item.authorId)}
        onOptionsPressed={() => this.showOptions(item.id)}
        onUpVote={isUpvote => this.handleUpVote(item.id, isUpvote)}
        onDownVote={isDownVote => this.handleDownVote(item.id, isDownVote)}
        badgeUri={item.authorBadgeUri}
        initialsText={item.authorInitials}
        comment={item.comment}
        isAuthor={item.isAuthor}
        score={item.score}
        personalScore={item.PersonalScore}
        onDeleteComment={() => this.deleteComment(item.id)}
      />
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

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <LoadingState.Modal isVisible={isLoading} />
        <ActionSheetProvider>
          <PostCommentsComponent
            onBackArrow={this.goBack}
            onAuthorPress={() => this.handleAuthorPress('3')}
            renderComments={this.renderComments}
            author="Emma Paige"
            postTitle="Entrega de Informe Final"
            onCommentPost={this.handlePostComment}
          />
        </ActionSheetProvider>
      </>
    );
  }
}

export default WithLogger(PostComments);
