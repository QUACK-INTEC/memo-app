import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connectActionSheet } from '@expo/react-native-action-sheet';

// Theme
import { fonts, colors, spacers, toBaseDesignPx } from '../../Core/Theme';

// Common
import InLineComponent from '../Common/InLineComponent';
import Text from '../Common/Text';
import Avatar from '../Common/Avatar';
import ImageWrapper from '../Common/ImageWrapper';
import UpDownVoteSimple from '../Common/UpDownVoteSimple';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';

class PostComment extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.score !== props.score || state.personalScore !== props.personalScore) {
      return {
        score: props.score,
        personalScore: props.personalScore,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { score, personalScore } = this.props;
    this.state = {
      score,
      personalScore,
    };
  }

  showEditOptions = () => {
    const { onDeleteComment, showActionSheetWithOptions } = this.props;
    const options = ['Borrar', 'Cancelar'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === destructiveButtonIndex) {
          onDeleteComment();
        }
      }
    );
  };

  renderUpVotes = () => {
    const { score } = this.state;
    if (score != null && score > -1) {
      return <Text.Medium text={`${score} Upvotes`} style={styles.upVotesStyle} />;
    }
    return null;
  };

  renderReactions = () => {
    const { isAuthor, onUpVote, onDownVote } = this.props;
    const { personalScore } = this.state;

    if (isAuthor) {
      return (
        <View style={styles.optionIcon}>
          <Icon
            type={ICON_TYPE.FONT_AWESOME}
            size={ICON_SIZE.TINY}
            name="ellipsis-h"
            color={colors.GRAY_LIGHT}
            onPress={this.showEditOptions}
          />
        </View>
      );
    }
    return <UpDownVoteSimple score={personalScore} onUpVote={onUpVote} onDownVote={onDownVote} />;
  };

  render() {
    const {
      badgeSrc,
      badgeUri,
      avatarSrc,
      avatarUri,
      initialsText,
      author,
      comment,
      onAuthorPress,
    } = this.props;
    return (
      <View>
        <InLineComponent>
          <Avatar
            src={avatarSrc}
            uri={avatarUri}
            initialsText={initialsText}
            style={styles.avatarStyle}
            textStyle={styles.avatarTextStyle}
          />
          <View style={styles.fullFlex}>
            <Text.SemiBold text={comment} style={[styles.commentStyle]} />
            <InLineComponent>
              <TouchableOpacity onPress={onAuthorPress}>
                <Text.Medium text={author} style={styles.authorStyle} />
              </TouchableOpacity>
              <ImageWrapper memoSrc={badgeSrc} uri={badgeUri} style={styles.badgeStyle} />
              <View style={styles.divBar} />
              {this.renderUpVotes()}
            </InLineComponent>
          </View>
          <View>{this.renderReactions()}</View>
        </InLineComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullFlex: { flex: 1 },
  commentStyle: {
    ...spacers.MB_1,
    color: colors.GRAY,
    ...fonts.SIZE_XS,
  },
  avatarStyle: {
    height: toBaseDesignPx(32),
    width: toBaseDesignPx(32),
    borderRadius: toBaseDesignPx(16),
    ...spacers.MR_8,
    ...spacers.ML_4,
  },
  authorStyle: {
    ...fonts.SIZE_XXS,
    color: colors.GRAY_LIGHT,
    ...spacers.MR_1,
  },
  badgeStyle: {
    width: toBaseDesignPx(8),
    height: toBaseDesignPx(8),
  },
  avatarTextStyle: {
    ...fonts.SIZE_XL,
  },
  divBar: {
    width: toBaseDesignPx(0),
    height: toBaseDesignPx(6),
    borderWidth: toBaseDesignPx(0.7),
    borderColor: colors.GRAY,
    ...spacers.MR_1,
    ...spacers.ML_1,
  },
  centeredChildren: {
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  authorSection: {
    ...spacers.MB_9,
    alignSelf: 'center',
    ...spacers.ML_6,
  },
  optionIcon: { ...spacers.MR_1, ...spacers.MB_3, ...spacers.MT_3 },
  upVotesStyle: {
    color: colors.GRAY_LIGHT,
    ...fonts.SIZE_XXS,
  },
});

PostComment.defaultProps = {
  onAuthorPress: () => null,
  onUpVote: () => null,
  onDownVote: () => null,
  onDeleteComment: () => null,
  isAuthor: false,
  badgeSrc: null,
  badgeUri: null,
  avatarSrc: null,
  avatarUri: null,
  initialsText: null,
  score: 0,
  personalScore: 0,
};

PostComment.propTypes = {
  onAuthorPress: PropTypes.func,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  onDeleteComment: PropTypes.func,
  isAuthor: PropTypes.bool,
  badgeSrc: PropTypes.number,
  badgeUri: PropTypes.string,
  avatarSrc: PropTypes.number,
  avatarUri: PropTypes.string,
  initialsText: PropTypes.string,
  score: PropTypes.number,
  author: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  personalScore: PropTypes.number,
};

const ConnectedPostComment = connectActionSheet(PostComment);
export default ConnectedPostComment;
