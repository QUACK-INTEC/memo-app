import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import Lodash from 'lodash';

import Text from '../Common/Text';
import Link from '../Common/Link';
import InLineComponent from '../Common/InLineComponent';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import { toBaseDesignPx, spacers, fonts, colors, constants } from '../../Core/Theme';
import FormikInput from '../FormikInput';

const validation = objValues => {
  const errors = {};
  const { comment } = objValues;

  if (!comment) {
    errors.comment = 'Comentario no puede ser vacio.';
  }

  return errors;
};

class PostComments extends React.Component {
  getInitialsValue = () => {
    const { initialsValue } = this.props;

    return {
      comment: null,
      ...initialsValue,
    };
  };

  handleBackArrow = () => {
    const { onBackArrow } = this.props;
    onBackArrow();
  };

  renderHeader = () => {
    const { postTitle } = this.props;
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
        <View style={styles.completeFlex}>
          <Text.SemiBold text={postTitle} style={styles.titleStyle} />
        </View>
      </InLineComponent>
    );
  };

  handleAuthorPress = () => {
    const { onAuthorPress } = this.props;
    onAuthorPress();
  };

  postComment = objValues => {
    const { onCommentPost } = this.props;
    const comment = Lodash.get(objValues, 'comment', null);
    onCommentPost(comment);
  };

  renderComponent = objForm => {
    const { author, renderComments, onAuthorPress } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerInfoContainer}>
          {this.renderHeader()}
          <View style={styles.centeredChildren}>
            <Link
              text={`Evento creado Por: ${author}`}
              textStyle={styles.authorStyle}
              onPress={onAuthorPress}
            />
          </View>
        </View>
        <View style={styles.container}>{renderComments()}</View>
        <InLineComponent viewStyle={styles.createCommentSection}>
          <FormikInput
            placeholder=" Escribe algo sobre este post..."
            name="comment"
            containerStyle={styles.inputContainer}
            returnKeyType="done"
            multiline
            style={styles.input}
          />
          <View style={styles.commentIconContainer}>
            <Icon
              name="chevron-circle-up"
              type={ICON_TYPE.FONT_AWESOME}
              size={ICON_SIZE.SMALL}
              color={colors.GREEN}
              onPress={objForm.handleSubmit}
            />
          </View>
        </InLineComponent>
      </View>
    );
  };

  render() {
    return (
      <Formik
        validate={validation}
        onSubmit={this.postComment}
        initialValues={this.getInitialsValue()}
        component={this.renderComponent}
      />
    );
  }
}

const styles = StyleSheet.create({
  completeFlex: { flex: 1 },
  container: { flex: 1 },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createCommentSection: {
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: toBaseDesignPx(0),
      height: toBaseDesignPx(3),
    },
    shadowRadius: toBaseDesignPx(6),
    shadowOpacity: toBaseDesignPx(0.11),
    elevation: toBaseDesignPx(1),
  },
  inputContainer: {
    borderRadius: toBaseDesignPx(12),
    borderColor: colors.GRAY_LIGHT,
    borderWidth: toBaseDesignPx(1),
    flex: 1,
    ...spacers.MR_9,
    ...spacers.MT_9,
    ...spacers.ML_8,
  },
  input: { ...spacers.MT_1, ...spacers.MB_1, ...spacers.ML_1, ...spacers.MR_1 },
  headerBackIconContainer: {
    ...spacers.ML_14,
    ...spacers.MT_3,
    width: toBaseDesignPx(47),
    justifyContent: 'flex-start',
  },
  commentIconContainer: {
    ...spacers.ML_14,
    ...spacers.MT_3,
    ...spacers.MB_14,
  },
  headerInfoContainer: { marginTop: constants.DEVICE.STATUS_BAR_HEIGHT },
  titleStyle: {
    ...fonts.SIZE_XXL,
    ...spacers.MR_15,
    ...spacers.MT_11,
    alignSelf: 'center',
    color: colors.GRAY,
  },
  authorStyle: {
    ...fonts.SIZE_XS,
    color: colors.GRAY,
  },
  infoStyle: {
    color: colors.GRAY,
  },
  centeredChildren: {
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
  },
});

PostComments.defaultProps = {
  onBackArrow: () => null,
  renderComments: () => null,
  onAuthorPress: () => null,
  onCommentPost: () => null,
  initialsValue: null,
};

PostComments.propTypes = {
  onBackArrow: PropTypes.func,
  onAuthorPress: PropTypes.func,
  renderComments: PropTypes.func,
  onCommentPost: PropTypes.func,
  postTitle: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  initialsValue: PropTypes.shape({
    comment: PropTypes.string,
  }),
};

export default PostComments;
