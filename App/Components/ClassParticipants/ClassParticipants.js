import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Common/Text';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import { toBaseDesignPx, spacers, fonts, colors, constants } from '../../Core/Theme';

class ClassParticipants extends React.Component {
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
    const { renderParticipants } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerInfoContainer}>
          {this.renderHeader()}
          <View style={styles.centeredChildren}>
            <Text.SemiBold text="Participantes" style={styles.titleStyle} />
          </View>
        </View>
        <View style={styles.container}>{renderParticipants()}</View>
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
    ...spacers.MB_11,
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

ClassParticipants.defaultProps = {
  onBackArrow: () => null,
  renderParticipants: () => null,
};

ClassParticipants.propTypes = {
  onBackArrow: PropTypes.func,
  renderParticipants: PropTypes.func,
};

export default ClassParticipants;
