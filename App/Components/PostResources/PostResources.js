import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Common/Text';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import { toBaseDesignPx, spacers, fonts, colors, constants } from '../../Core/Theme';

class TeacherResources extends React.Component {
  handleBackArrow = () => {
    const { onBackArrow } = this.props;
    onBackArrow();
  };

  renderHeader = () => {
    return (
      <View style={styles.headerBackIconContainer}>
        <Icon
          name="chevron-circle-left"
          type={ICON_TYPE.FONT_AWESOME}
          size={ICON_SIZE.TINY}
          color={colors.GRAY}
          onPress={this.handleBackArrow}
        />
      </View>
    );
  };

  render() {
    const { postName, renderResources, studentName } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerInfoContainer}>
          {this.renderHeader()}
          <View style={styles.centeredChildren}>
            <Text.Medium text={postName} style={styles.titleStyle} />
            <Text.Medium
              text={`Recursos del evento creado por: ${studentName}`}
              style={styles.teacherStyle}
            />
          </View>
        </View>
        <View style={styles.container}>{renderResources()}</View>
      </View>
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
  headerBackIconContainer: {
    ...spacers.ML_14,
    ...spacers.MT_3,
    width: toBaseDesignPx(47),
    justifyContent: 'flex-start',
  },
  headerInfoContainer: { marginTop: constants.DEVICE.STATUS_BAR_HEIGHT },
  titleStyle: {
    ...fonts.SIZE_XXL,
    ...spacers.MR_15,
    ...spacers.ML_15,
    alignSelf: 'center',
    color: colors.GRAY,
    textAlign: 'center',
  },
  teacherStyle: {
    ...fonts.SIZE_XXS,
    ...spacers.MR_15,
    ...spacers.ML_15,
    ...spacers.MT_1,
    ...spacers.MB_16,
    alignSelf: 'center',
    color: colors.GRAY,
  },
  centeredChildren: {
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
  },
});

TeacherResources.defaultProps = {
  onBackArrow: () => null,
  renderResources: () => null,
  studentName: null,
  postName: null,
};

TeacherResources.propTypes = {
  onBackArrow: PropTypes.func,
  renderResources: PropTypes.func,
  studentName: PropTypes.string,
  postName: PropTypes.string,
};

export default TeacherResources;
