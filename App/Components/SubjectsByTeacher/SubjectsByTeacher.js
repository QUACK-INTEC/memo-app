import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';

import Text from '../Common/Text';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import { toBaseDesignPx, spacers, fonts, colors, constants } from '../../Core/Theme';

class SubjectsByTeacher extends React.Component {
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
    const { subjectName, renderProfessors } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerInfoContainer}>
          {this.renderHeader()}
          <View style={styles.centeredChildren}>
            <Text.SemiBold text="Todos los recursos" style={styles.titleStyle} />
            <Text.Medium text={subjectName} style={styles.subjectStyle} />
            <Text.Medium text="Recursos por: Profesores" style={styles.subtitleStyle} />
          </View>
        </View>
        <View style={styles.container}>{renderProfessors()}</View>
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
  },
  subjectStyle: {
    ...fonts.SIZE_XXS,
    ...spacers.MR_15,
    ...spacers.ML_15,
    ...spacers.MT_1,
    alignSelf: 'center',
    color: colors.GRAY,
  },
  subtitleStyle: {
    fontSize: RFValue(6),
    ...spacers.MR_15,
    ...spacers.ML_15,
    ...spacers.MT_1,
    ...spacers.MB_5,
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

SubjectsByTeacher.defaultProps = {
  onBackArrow: () => null,
  renderProfessors: () => null,
  subjectName: null,
};

SubjectsByTeacher.propTypes = {
  onBackArrow: PropTypes.func,
  renderProfessors: PropTypes.func,
  subjectName: PropTypes.string,
};

export default SubjectsByTeacher;
