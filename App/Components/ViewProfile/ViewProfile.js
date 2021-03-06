import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Avatar from '../Common/Avatar';
import Text from '../Common/Text';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import InLineComponent from '../Common/InLineComponent';
import Section from '../Common/Section';
import ImageWrapper from '../Common/ImageWrapper';

import { fonts, spacers, constants, colors, toBaseDesignPx } from '../../Core/Theme';

class ViewProfile extends React.Component {
  renderEmail = () => {
    const { studentMail } = this.props;
    return <Text.SemiBold text={studentMail} style={styles.studentMail} />;
  };

  handleBackArrow = () => {
    const { onBackArrow } = this.props;
    onBackArrow();
  };

  renderEditIcon = () => {
    const { onEditUser } = this.props;
    return (
      <View style={styles.editIconContainer}>
        <Icon
          name="edit"
          type={ICON_TYPE.MEMO_ICONS}
          size={ICON_SIZE.TINY}
          onPress={onEditUser}
          color={colors.TRANSPARENT}
        />
      </View>
    );
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

  render() {
    const {
      avatarSrc,
      avatarUri,
      avatarInitialsText,
      badgeSrc,
      badgeUri,
      memoPoints,
      rank,
      studentName,
      renderClasses,
    } = this.props;
    return (
      <View style={styles.headerInfoContainer}>
        {this.renderHeader()}
        <Avatar
          initialsText={avatarInitialsText}
          src={avatarSrc}
          uri={avatarUri}
          style={styles.avatar}
        />
        <InLineComponent viewStyle={styles.studentSection}>
          <Text.Medium text={studentName} style={styles.studentName} />
          <ImageWrapper memoSrc={badgeSrc} uri={badgeUri} style={styles.badgeStyle} />
        </InLineComponent>
        <InLineComponent viewStyle={styles.memoPointsRow}>
          <Text.SemiBold text="MP:" style={styles.memoPointsLabel} />
          <Text.SemiBold text={`${memoPoints} ~ ${rank}`} style={styles.memoPointsValue} />
        </InLineComponent>
        <Section title="Mail" viewStyle={styles.sectionViewStyle}>
          {this.renderEmail()}
        </Section>
        <Section title="Clases comunes">{renderClasses()}</Section>
      </View>
    );
  }
}

ViewProfile.defaultProps = {
  avatarSrc: null,
  avatarUri: null,
  avatarInitialsText: null,
  badgeSrc: null,
  badgeUri: null,
  studentName: null,
  studentMail: null,
  memoPoints: null,
  rank: null,
  onEditUser: null,
  onBackArrow: () => null,
  renderClasses: () => null,
};

ViewProfile.propTypes = {
  studentName: PropTypes.string,
  studentMail: PropTypes.string,
  avatarSrc: PropTypes.string,
  avatarUri: PropTypes.string,
  avatarInitialsText: PropTypes.string,
  badgeSrc: PropTypes.string,
  badgeUri: PropTypes.string,
  memoPoints: PropTypes.number,
  rank: PropTypes.string,
  onEditUser: PropTypes.func,
  onBackArrow: PropTypes.func,
  renderClasses: PropTypes.func,
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerInfoContainer: {},
  avatar: { alignSelf: 'center', justifyContent: 'center' },
  studentName: {
    ...fonts.SIZE_XL,
    textAlign: 'center',
    color: colors.GRAY,
  },
  memoPointsRow: {
    alignSelf: 'center',
    justifyContent: 'center',
    ...spacers.MT_9,
  },
  memoPointsValue: { color: colors.GRAY, ...spacers.ML_2, ...fonts.SIZE_XS },
  memoPointsLabel: { color: colors.GRAY_LIGHT, ...fonts.SIZE_XS },
  sectionViewStyle: { ...spacers.MB_8 },
  editIconContainer: {
    ...spacers.MR_14,
    width: toBaseDesignPx(47),
    justifyContent: 'flex-end',
  },
  header: {
    ...spacers.ML_14,
    marginTop: constants.DEVICE.STATUS_BAR_HEIGHT,
  },
  headerBackIconContainer: {
    ...spacers.MB_4,
    width: toBaseDesignPx(47),
  },
  studentSection: {
    ...spacers.MT_3,
    alignSelf: 'center',
    ...spacers.ML_3,
    ...spacers.MR_3,
  },
  studentMail: {
    color: colors.GRAY,
  },
  badgeStyle: {
    width: toBaseDesignPx(18),
    height: toBaseDesignPx(18),
    alignSelf: 'center',
    ...spacers.ML_2,
  },
});

export default ViewProfile;
