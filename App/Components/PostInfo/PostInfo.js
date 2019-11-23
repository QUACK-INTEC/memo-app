import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connectActionSheet } from '@expo/react-native-action-sheet';

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
  constructor(props) {
    super(props);
    const { personalScore } = this.props;
    this.state = {
      isUpVote: personalScore && personalScore > 0,
      isDownVote: personalScore && personalScore < 0,
    };
  }

  handleEdit = () => {
    const { onEdit } = this.props;
    onEdit();
  };

  handleDelete = () => {
    const { onDelete } = this.props;
    onDelete();
  };

  showEditOptions = () => {
    const { showActionSheetWithOptions } = this.props;
    const options = ['Editar', 'Borrar', 'Cancelar'];
    const editButtonIndex = 0;
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === destructiveButtonIndex) {
          this.handleDelete();
        }
        if (buttonIndex === editButtonIndex) {
          this.handleEdit();
        }
      }
    );
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
            onPress={this.showEditOptions}
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
        <View style={styles.avatarContainer}>
          <Avatar
            src={avatarSrc}
            uri={avatarUri}
            initialsText={initialsText}
            style={styles.avatarStyle}
            textStyle={styles.avatarTextStyle}
          />
        </View>
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

  downVoteArrow = () => {
    const { isDownVote } = this.state;
    return (
      <Icon
        type={ICON_TYPE.FONT_AWESOME}
        size={ICON_SIZE.TINY}
        name="chevron-down"
        color={isDownVote ? colors.GRAY : colors.WHITE}
        isButton={false}
      />
    );
  };

  upVoteArrow = () => {
    const { isUpVote } = this.state;
    return (
      <Icon
        type={ICON_TYPE.FONT_AWESOME}
        size={ICON_SIZE.TINY}
        name="chevron-up"
        color={isUpVote ? colors.GRAY : colors.WHITE}
        isButton={false}
      />
    );
  };

  handleDownVote = value => {
    const { onDownVote } = this.props;
    if (value) {
      this.setState({ isDownVote: true, isUpVote: false });
    } else {
      this.setState({ isDownVote: false, isUpVote: false });
    }
    onDownVote(value);
  };

  handleUpVote = value => {
    const { onUpVote } = this.props;
    if (value) {
      this.setState({ isDownVote: false, isUpVote: true });
    } else {
      this.setState({ isDownVote: false, isUpVote: false });
    }
    onUpVote(value);
  };

  renderUpVoteSection = () => {
    const { isAuthor } = this.props;
    const { isUpVote, isDownVote } = this.state;

    if (isAuthor) {
      return (
        <View style={styles.arrowButtonsContainer}>
          <BiButton
            leftChild={this.downVoteArrow}
            rightChild={this.upVoteArrow}
            leftButtonStyle={styles.arrowButtonStyle}
            rightButtonStyle={styles.arrowButtonStyle}
            onRightPress={this.handleUpVote}
            onLeftPress={this.handleDownVote}
            isRightPressed={isUpVote}
            isLeftPressed={isDownVote}
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
    ...spacers.MB_4,
    width: toBaseDesignPx(47),
    justifyContent: 'flex-start',
  },
  editIconContainer: {
    ...spacers.MR_14,
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
    textAlign: 'center',
  },
  avatarContainer: { ...spacers.MR_1, ...spacers.ML_8 },
  avatarStyle: {
    height: toBaseDesignPx(32),
    width: toBaseDesignPx(32),
    borderRadius: toBaseDesignPx(16),
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
    ...fonts.SIZE_XL,
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
  onDelete: () => null,
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
  personalScore: null,
};

PostInfo.propTypes = {
  onBackArrow: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
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
  personalScore: PropTypes.number,
};

const ConnectedPostInfo = connectActionSheet(PostInfo);
export default ConnectedPostInfo;
