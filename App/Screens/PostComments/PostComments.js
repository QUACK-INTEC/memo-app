import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Lodash from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import LoadingState from '../../Components/LoadingState';
import PostCommentsComponent from '../../Components/PostComments';
import PostComment from '../../Components/PostComment';
import { spacers } from '../../Core/Theme';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import {
  actions as postCommentActions,
  selectors as postCommentsSelector,
} from '../../Redux/Common/PostComments';
import { PostCommentList } from '../../Models';

class PostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { setPostComments, logger } = this.props;

    Promise.all([this.getPostComments()])
      .then(listValues => {
        this.setState({ isLoading: false });
        const [objCommentResponse] = listValues;
        const listPostComments = Lodash.get(objCommentResponse, 'data', []);
        setPostComments(listPostComments);
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

  handleAuthorPress = () => {
    const {
      navigation: { push },
    } = this.props;
    push('UserProfile');
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
        },
        {
          id: '5dcb3a143f84959c924adfa8',
          author: 'Emma Paige',
          authorBadgeUri: 'https://cdn0.iconfinder.com/data/icons/usa-politics/67/45-512.png',
          authorInitials: 'EP',
          comment: 'Entregar project charter y un power point para presentarlo en clase.',
          isAuthor: true,
          score: 10,
          personalScore: -1,
        },
      ],
    };
  };

  renderComment = ({ item }) => {
    return (
      <View style={styles.postCommentContainer}>
        <PostComment
          author={item.author}
          onAuthorPress={this.goToAuthor}
          onOptionsPressed={this.showOptions}
          badgeUri={item.authorBadgeUri}
          initialsText={item.authorInitials}
          comment={item.comment}
          isAuthor={item.isAuthor}
          score={item.Score}
          personalScore={item.PersonalScore}
        />
      </View>
    );
  };

  renderComments = () => {
    const { postComments } = this.props;
    const postCommentsFormatted = PostCommentList.getPostCommentsData(postComments);

    return (
      <FlatList
        data={postCommentsFormatted}
        numColumns={1}
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
        <PostCommentsComponent
          onBackArrow={this.goBack}
          renderComments={this.renderComments}
          author="Emma Paige"
          postTitle="Entrega de Informe Final"
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  postCommentContainer: { ...spacers.MA_1 },
});

PostComments.defaultProps = {
  postComments: [],
  setPostComments: () => null,
};

PostComments.propTypes = {
  postComments: PropTypes.arrayOf(PropTypes.shape({})),
  setPostComments: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  const { getPostComments } = postCommentsSelector;
  return {
    postComments: getPostComments(state, props),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setPostComments: postCommentActions.setPostComments,
    },
    dispatch
  );
};

export default WithLogger(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostComments)
);
