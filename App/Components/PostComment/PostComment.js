import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { fonts, colors, spacers, toBaseDesignPx } from '../../Core/Theme';

// Common
import InLineComponent from '../Common/InLineComponent';
import Text from '../Common/Text';
import Avatar from '../Common/Avatar';
import ImageWrapper from '../Common/ImageWrapper';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';

class PostComment extends React.Component {
  renderUpVotes = () => {
    const { score } = this.props;
    if (score && score > 0) {
      return <Text.Medium text={`${score} Upvotes`} style={styles.upVotesStyle} />;
    }
    return null;
  };

  renderReactions = () => {
    const { isAuthor, onOptionsPressed } = this.props;

    if (isAuthor) {
      return (
        <TouchableOpacity onPress={onOptionsPressed}>
          <Icon
            type={ICON_TYPE.FONT_AWESOME}
            size={ICON_SIZE.TINY}
            name="ellipsis-h"
            color={colors.GRAY_LIGHT}
          />
        </TouchableOpacity>
      );
    }

    // TODO RETURN Up&DownVoteSimple COMPONENT
    return null;
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
          <View style={{ flex: 1 }}>
            <Text.SemiBold text={comment} style={[styles.commentStyle]} />
            <InLineComponent>
              <TouchableOpacity onPress={onAuthorPress}>
                <Text.Medium text={author} style={styles.authorStyle} />
              </TouchableOpacity>
              <ImageWrapper memoSrc={badgeSrc} uri={badgeUri} style={styles.badgeStyle} />
              <View
                style={{
                  width: toBaseDesignPx(0),
                  height: toBaseDesignPx(6),
                  borderWidth: toBaseDesignPx(0.7),
                  borderColor: colors.GRAY,
                  ...spacers.MR_1,
                  ...spacers.ML_1,
                }}
              />
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
  commentStyle: {
    ...spacers.MB_1,
    color: colors.GRAY,
  },
  avatarStyle: {
    height: toBaseDesignPx(32),
    width: toBaseDesignPx(32),
    borderRadius: toBaseDesignPx(16),
    ...spacers.MR_8,
    ...spacers.ML_4,
  },
  authorStyle: {
    ...fonts.SIZE_XS,
    color: colors.GRAY_LIGHT,
    ...spacers.MR_1,
  },
  badgeStyle: {
    width: toBaseDesignPx(8),
    height: toBaseDesignPx(8),
  },
  avatarTextStyle: {
    ...fonts.SIZE_XXXL,
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
  upVotesStyle: {
    color: colors.GRAY_LIGHT,
    ...fonts.SIZE_XS,
  },
});

PostComment.defaultProps = {
  onOptionsPressed: () => null,
  onAuthorPress: () => null,
  isAuthor: false,
  badgeSrc: null,
  badgeUri: null,
  avatarSrc: null,
  avatarUri: null,
  initialsText: null,
  score: 0,
};

PostComment.propTypes = {
  onOptionsPressed: PropTypes.func,
  onAuthorPress: PropTypes.func,
  isAuthor: PropTypes.bool,
  badgeSrc: PropTypes.number,
  badgeUri: PropTypes.string,
  avatarSrc: PropTypes.number,
  avatarUri: PropTypes.string,
  initialsText: PropTypes.string,
  score: PropTypes.number,
  author: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default PostComment;
