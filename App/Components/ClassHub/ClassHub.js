import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Common/Text';
import DescriptiveInfoCard from '../DescriptiveInfoCard';
import Link from '../Common/Link';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import { toBaseDesignPx, spacers, fonts, colors, constants } from '../../Core/Theme';

class ClassHub extends React.PureComponent {
  renderHeaderHub = () => {
    const {
      onBackArrowPress,
      subjectName,
      renderSubjectSchedule,
      onPressGoToEvents,
      onPressGoToParticipants,
      subjectStudents,
      subjectTeacher,
      subjectSection,
      subjectRoom,
    } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerInfoContainer}>
          <View style={styles.headerBackIconContainer}>
            <Icon
              name="chevron-circle-left"
              type={ICON_TYPE.FONT_AWESOME}
              size={ICON_SIZE.TINY}
              color={colors.WHITE}
              onPress={onBackArrowPress}
            />
          </View>

          <View style={styles.headerSubjectInfo}>
            <Text.Bold text={subjectName} style={styles.subjectName} />
            {renderSubjectSchedule()}
            {subjectTeacher ? (
              <Text.Medium text={`Profesor: ${subjectTeacher}`} style={styles.subjectBasicInfo} />
            ) : null}
            {subjectSection ? (
              <Text.Medium text={`Sección: ${subjectSection}`} style={styles.subjectBasicInfo} />
            ) : null}
            {subjectRoom ? (
              <Text.Medium text={`Curso: ${subjectRoom}`} style={styles.subjectBasicInfo} />
            ) : null}

            <View style={styles.subjectFooterContainer}>
              <Link
                text="Ver eventos para esta clase"
                onPress={onPressGoToEvents}
                textStyle={styles.linkGoToEvents}
              />
              {subjectStudents ? (
                <Link
                  text={`${subjectStudents} Participantes`}
                  onPress={onPressGoToParticipants}
                  textStyle={styles.linkGoToEvents}
                />
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderSubjectActions = () => {
    const { onPressGoToResources } = this.props;
    return (
      <View style={styles.containerSubjectActions}>
        <DescriptiveInfoCard
          title="Recursos"
          subtitle="Todos los recursos de esta clase"
          subtitleStyle={styles.actionsSubtitleText}
          onPress={onPressGoToResources}
        />

        <DescriptiveInfoCard
          title="Publicar"
          subtitle="Sube una publicacion para esta materia"
          subtitleStyle={styles.actionsSubtitleText}
        />
      </View>
    );
  };

  renderSubjectPostsRecents = () => {
    const { renderRecentsPosts } = this.props;
    return (
      <View style={styles.recentPostContainer}>
        <Text.Medium text="Publicaciones recientes" style={styles.recentPostTitle} />
        <View style={styles.subjectPostRecents}>
          {/* <SubjectPostRecent
            postTitle="Informe de gobernabilidad"
            postUser="Jonathan Taveras"
            createdSince={3}
          /> */}
          {/* TODO: Render from parent {renderRecentsPosts()} */}
          {renderRecentsPosts()}
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeaderHub()}
        {this.renderSubjectActions()}
        {this.renderSubjectPostsRecents()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  recentPostTitle: {
    ...fonts.SIZE_XXL,
    color: colors.GRAY,
    ...spacers.ML_4,
    ...spacers.MR_4,
    ...spacers.MB_4,
  },
  recentPostContainer: { flex: 1 },
  subjectPostsRecents: { ...spacers.ML_1, ...spacers.MR_2 },
  headerContainer: {
    height: toBaseDesignPx(297),
    backgroundColor: colors.CLASSHUB_HEADER_BACKGROUND,
  },
  headerInfoContainer: { marginTop: constants.DEVICE.STATUS_BAR_HEIGHT, flex: 1 },
  headerBackIconContainer: {
    ...spacers.ML_14,
    ...spacers.MT_3,
    ...spacers.MB_2,
    width: toBaseDesignPx(47),
  },
  headerSubjectInfo: { ...spacers.ML_4, ...spacers.MR_4, flex: 1 },
  SubjectNameText: { ...fonts.SIZE_XL, ...spacers.MB_1, color: colors.WHITE },
  subjectBasicInfo: { ...fonts.SIZE_XS, ...spacers.MT_1, color: colors.WHITE },
  subjectName: { ...fonts.SIZE_XXL, ...spacers.MT_1, color: colors.WHITE },
  subjectFooterContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  linkGoToEvents: { ...fonts.SIZE_XS, color: colors.WHITE, ...fonts.LIGHT },
  subjectStudentsText: { ...fonts.SIZE_XS, color: colors.WHITE },
  containerSubjectActions: {
    flexDirection: 'row',
    height: toBaseDesignPx(108),
    ...spacers.ML_4,
    ...spacers.MR_4,
    ...spacers.MT_1,
    ...spacers.MB_7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsSubtitleText: { textAlign: 'center' },
});

ClassHub.defaultProps = {
  onBackArrowPress: () => null,
  subjectName: '',
  renderSubjectSchedule: () => null,
  renderRecentsPosts: () => null,
  subjectTeacher: '',
  subjectSection: '',
  subjectRoom: '',
  onPressGoToEvents: () => null,
  subjectStudents: '',
  onPressGoToParticipants: () => null,
  onPressGoToResources: () => null,
};

ClassHub.propTypes = {
  onBackArrowPress: PropTypes.func,
  subjectName: PropTypes.string,
  renderSubjectSchedule: PropTypes.func,
  renderRecentsPosts: PropTypes.func,
  subjectTeacher: PropTypes.string,
  subjectSection: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subjectRoom: PropTypes.string,
  onPressGoToEvents: PropTypes.func,
  onPressGoToParticipants: PropTypes.func,
  subjectStudents: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPressGoToResources: PropTypes.func,
};

export default ClassHub;
