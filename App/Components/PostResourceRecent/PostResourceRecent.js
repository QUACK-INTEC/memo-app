import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import InLineComponent from '../Common/InLineComponent';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import Text from '../Common/Text';
import { fonts, spacers, colors, toBaseDesignPx } from '../../Core/Theme';

class SubjectPostRecent extends React.Component {
  renderSubjectInfo = () => {
    const { postTitle } = this.props;
    return (
      <View>
        <Text.Medium
          text={postTitle}
          numberOfLines={1}
          ellipSizeMode="tail"
          style={styles.postTitleText}
        />
      </View>
    );
  };

  renderSubjectDateInfo = () => {
    return (
      <View style={styles.containerDateInfo}>
        <Icon
          type={ICON_TYPE.MEMO_ICONS}
          size={ICON_SIZE.EXTRA_SMALL}
          name="file"
          color={colors.GRAY}
        />
      </View>
    );
  };

  render() {
    const { onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <InLineComponent
          viewStyle={styles.inLineContainer}
          leftChild={this.renderSubjectInfo}
          rightChild={this.renderSubjectDateInfo}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  inLineContainer: { justifyContent: 'space-between' },
  dateCreatedText: { ...fonts.SIZE_XXS, ...spacers.MR_8, color: colors.GRAY },
  containerDateInfo: { flexDirection: 'row', alignItems: 'center' },
  userPostText: { ...fonts.SIZE_XXS, color: colors.GRAY, width: toBaseDesignPx(198) },
  postTitleText: { ...fonts.SIZE_L, color: colors.GRAY, width: toBaseDesignPx(218) },
});

SubjectPostRecent.propTypes = {
  postTitle: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SubjectPostRecent;
