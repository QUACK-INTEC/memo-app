import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';

// Theme
import { spacers } from '../../Core/Theme';

// Common
import Text from '../Common/Text';
import InfoCard from '../Common/InfoCard';

class ClassInfoCard extends React.Component {
  getProfessorLabel = () => {
    const { professor } = this.props;
    return `Prof: ${professor}`;
  };

  render() {
    const { subject, schedule, onPress, disabled, titleStyle, isLoading } = this.props;
    return (
      <InfoCard
        title={subject}
        onPress={disabled ? null : onPress}
        disabled={disabled}
        titleStyle={titleStyle}
        isLoading={isLoading}
      >
        <Text.Light text={this.getProfessorLabel()} style={styles.professorStyle} />
        <Text.Light text={schedule} style={styles.scheduleStyle} />
      </InfoCard>
    );
  }
}

const styles = StyleSheet.create({
  professorStyle: {
    fontSize: RFValue(7),
    textAlign: 'center',
  },
  scheduleStyle: {
    ...spacers.MT_9,
    fontSize: RFValue(9),
  },
});

ClassInfoCard.defaultProps = {
  subject: null,
  professor: null,
  schedule: null,
  onPress: () => null,
  disabled: null,
  titleStyle: null,
};

ClassInfoCard.propTypes = {
  subject: PropTypes.string,
  professor: PropTypes.string,
  schedule: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  titleStyle: PropTypes.string,
};

export default ClassInfoCard;
