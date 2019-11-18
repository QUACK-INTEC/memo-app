import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Common/Text';
import Section from '../Common/Section';
import Link from '../Common/Link';
import Avatar from '../Common/Avatar';
import ImageWrapper from '../Common/ImageWrapper';
import InLineComponent from '../Common/InLineComponent';
import BiButton from '../Common/BiButton';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import { toBaseDesignPx, spacers, fonts, colors, constants } from '../../Core/Theme';

class PostInfo extends React.Component {
  handleEdit = () => {
    const { onEdit } = this.props;
    onEdit();
  };

  renderEditIcon = () => {
    const { isAuthor } = this.props;

    if (isAuthor) {
      return (
        <View style={styles.editIconContainer}>
          <Icon
            name="edit"
            type={ICON_TYPE.MEMO_ICONS}
            size={ICON_SIZE.TINY}
            onPress={this.handleEdit}
            color={colors.GRAY}
          />
        </View>
      );
    }

    return null;
  };

  handleBackArrow = () => {
    const { onBackArrow } = this.props;
    onBackArrow();
  };

  renderHeader = () => {
    return (
      <InLineComponent viewStyle={styles.header}>
        <View style={styles.headerBackIconContainer}>
          <Icon
            name="chevron-circle-left"
            type={ICON_TYPE.FONT_AWESOME}
            size={ICON_SIZE.TINY}
            color={colors.GRAY}
            onPress={this.handleBackArrow}
          />
        </View>
        {this.renderEditIcon()}
      </InLineComponent>
    );
  };

  handleAuthorPress = () => {
    const { onAuthorPress } = this.props;
    onAuthorPress();
  };

  renderAuthorSection = () => {
    const { badgeSrc, badgeUri, avatarSrc, avatarUri, initialsText, author } = this.props;
    return (
      <InLineComponent viewStyle={styles.authorSection}>
        <TouchableOpacity onPress={this.handleAuthorPress} style={styles.centered}>
          <View style={styles.centeredChildren}>
            <Text.Medium text="Evento creado Por:" style={styles.authorStyle} />
            <InLineComponent>
              <Text.Medium text={author} style={styles.authorStyle} />
              <ImageWrapper memoSrc={badgeSrc} uri={badgeUri} style={styles.badgeStyle} />
            </InLineComponent>
          </View>
        </TouchableOpacity>
        <Avatar
          src={avatarSrc}
          uri={avatarUri}
          initialsText={initialsText}
          style={styles.avatarStyle}
          textStyle={styles.avatarTextStyle}
        />
      </InLineComponent>
    );
  };

  renderUpVotes = () => {
    const { score } = this.props;
    if (score && score > 0) {
      return <Text.Medium text={`${score} Upvotes`} style={styles.upVotesStyle} />;
    }
    return null;
  };

  renderEventTime = () => {
    const { postDate, postTime } = this.props;

    if (postDate && postTime) {
      return (
        <Section title="Fecha y Hora" viewStyle={styles.sectionViewStyle}>
          <Text.SemiBold text={`${postDate} | ${postTime}`} style={styles.infoStyle} />
        </Section>
      );
    }

    if (postDate) {
      return (
        <Section title="Fecha y Hora" viewStyle={styles.sectionViewStyle}>
          <Text.SemiBold text={postDate} style={styles.infoStyle} />
        </Section>
      );
    }

    return null;
  };

  renderSubTasks = () => {
    // TODO: Implement SubTask Component
  };

  leftArrow = () => {
    return (
      <Icon
        type={ICON_TYPE.FONT_AWESOME}
        size={ICON_SIZE.TINY}
        name="chevron-down"
        color={colors.WHITE}
        onPress={this.handleDownVote}
      />
    );
  };

  rightArrow = () => {
    return (
      <Icon
        type={ICON_TYPE.FONT_AWESOME}
        size={ICON_SIZE.TINY}
        name="chevron-up"
        color={colors.WHITE}
        onPress={this.handleUpVote}
      />
    );
  };

  handleDownVote = () => {
    const { onDownVote } = this.props;
    onDownVote();
  };

  handleUpVote = () => {
    const { onUpVote } = this.props;
    onUpVote();
  };

  renderUpVoteSection = () => {
    const { isAuthor } = this.props;

    if (isAuthor) {
      return (
        <View style={styles.arrowButtonsContainer}>
          <BiButton
            leftChild={this.leftArrow}
            rightChild={this.rightArrow}
            leftButtonStyle={styles.arrowButtonStyle}
            rightButtonStyle={styles.arrowButtonStyle}
          />
        </View>
      );
    }

    return null;
  };

  render() {
    const { postTitle, postDescription, className, goToComments, goToResources } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerInfoContainer}>
          {this.renderHeader()}
          <Text.SemiBold text={postTitle} style={styles.titleStyle} />
          {this.renderAuthorSection()}
          {this.renderUpVotes()}
          <Section title="Clase" viewStyle={styles.sectionViewStyle}>
            <Text.SemiBold text={className} style={styles.infoStyle} />
          </Section>
          {this.renderEventTime()}
          <Section title="Descripción" viewStyle={styles.sectionViewStyle}>
            <Text.SemiBold text={postDescription} style={styles.infoStyle} />
          </Section>
          <Section title="Comentarios" viewStyle={styles.sectionViewStyle}>
            <Link text="Ver Comentarios" style={styles.linkStyle} onPress={goToComments} />
          </Section>
          <Section title="Recursos" viewStyle={styles.sectionViewStyle}>
            <Link text="Ver Recursos" style={styles.linkStyle} onPress={goToResources} />
          </Section>
          {this.renderSubTasks()}
          {this.renderUpVoteSection()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBackIconContainer: {
    ...spacers.ML_14,
    ...spacers.MT_3,
    ...spacers.MB_4,
    width: toBaseDesignPx(47),
    justifyContent: 'flex-start',
  },
  editIconContainer: {
    ...spacers.MR_14,
    ...spacers.MT_3,
    ...spacers.MB_4,
    width: toBaseDesignPx(47),
    justifyContent: 'flex-end',
  },
  headerInfoContainer: { marginTop: constants.DEVICE.STATUS_BAR_HEIGHT, flex: 1 },
  titleStyle: {
    ...fonts.SIZE_XXL,
    ...spacers.ML_15,
    ...spacers.MR_15,
    ...spacers.MB_20,
    alignSelf: 'center',
    color: colors.GRAY,
  },
  avatarStyle: {
    height: toBaseDesignPx(32),
    width: toBaseDesignPx(32),
    borderRadius: toBaseDesignPx(16),
    ...spacers.MR_1,
    ...spacers.ML_8,
  },
  authorStyle: {
    ...fonts.SIZE_XS,
    color: colors.GRAY,
    textDecorationLine: 'underline',
  },
  badgeStyle: {
    width: toBaseDesignPx(8),
    height: toBaseDesignPx(8),
  },
  avatarTextStyle: {
    ...fonts.SIZE_XXXL,
  },
  upVotesStyle: {
    color: colors.GRAY_LIGHT,
    ...fonts.SIZE_XS,
    alignSelf: 'center',
  },
  infoStyle: {
    color: colors.GRAY,
  },
  linkStyle: {
    color: colors.GRAY,
  },
  arrowButtonsContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    ...spacers.MB_10,
    ...spacers.MR_8,
  },
  arrowButtonStyle: {
    backgroundColor: colors.GREEN,
  },
  sectionViewStyle: {
    ...spacers.MB_8,
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
});

PostInfo.defaultProps = {
  onBackArrow: () => null,
  onEdit: () => null,
  onDownVote: () => null,
  onUpVote: () => null,
  onAuthorPress: () => null,
  goToComments: () => null,
  goToResources: () => null,
  isAuthor: false,
  badgeSrc: null,
  badgeUri: null,
  avatarSrc: null,
  avatarUri: null,
  initialsText: null,
  score: null,
  postDate: null,
  postTime: null,
  postDescription: null,
};

PostInfo.propTypes = {
  onBackArrow: PropTypes.func,
  onEdit: PropTypes.func,
  onDownVote: PropTypes.func,
  onUpVote: PropTypes.func,
  onAuthorPress: PropTypes.func,
  goToComments: PropTypes.func,
  goToResources: PropTypes.func,
  isAuthor: PropTypes.bool,
  badgeSrc: PropTypes.number,
  badgeUri: PropTypes.string,
  avatarSrc: PropTypes.number,
  avatarUri: PropTypes.string,
  initialsText: PropTypes.string,
  score: PropTypes.number,
  postTitle: PropTypes.string.isRequired,
  postDate: PropTypes.string,
  postTime: PropTypes.string,
  postDescription: PropTypes.string,
  className: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default PostInfo;
