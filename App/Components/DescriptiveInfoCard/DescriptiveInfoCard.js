import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';

// Theme
import { spacers, toBaseDesignPx } from '../../Core/Theme';

// Common
import Text from '../Common/Text';
import InfoCard from '../Common/InfoCard';

class DescriptiveInfoCard extends React.Component {
  renderInfoCard = () => {
    const { title, subtitle, onPress, disabled, titleStyle, subtitleStyle, style } = this.props;
    return (
      <InfoCard
        title={title}
        onPress={onPress}
        disabled={disabled}
        titleStyle={titleStyle}
        style={[{ height: toBaseDesignPx(81) }, style]}
      >
        <Text.Light text={subtitle} style={[styles.subtitleStyle, subtitleStyle]} />
      </InfoCard>
    );
  };

  render() {
    return this.renderInfoCard();
  }
}

const styles = StyleSheet.create({
  subtitleStyle: {
    ...spacers.MT_2,
    fontSize: RFValue(9),
  },
});

DescriptiveInfoCard.defaultProps = {
  title: null,
  onPress: () => null,
  disabled: null,
  titleStyle: null,
  subtitle: null,
  subtitleStyle: null,
};

DescriptiveInfoCard.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  titleStyle: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleStyle: PropTypes.shape({}),
};

export default DescriptiveInfoCard;
