import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import DatePicker from '../Common/CalendarDatePicker';
import Text from '../Common/Text';
import BiButton from '../Common/BiButton';
import { spacers, toBaseDesignPx, colors } from '../../Core/Theme';

class Calendar extends React.Component {
  leftText = () => {
    return <Text.Medium text="Global" style={styles.textGlobal} />;
  };

  rightText = () => {
    return <Text.Medium text="Privado" style={styles.textPrivate} />;
  };

  handleOnDateChange = objDate => {
    const { onDateChange } = this.props;
    onDateChange(objDate);
  };

  renderDatePicker = () => {
    return (
      <View style={styles.containerDatePicker}>
        <DatePicker onChange={this.handleOnDateChange} />
      </View>
    );
  };

  renderEvents = () => {
    const { renderEvents } = this.props;

    if (renderEvents) {
      return renderEvents();
    }

    return null;
  };

  render() {
    const { onGlobalPress, onPrivatePress } = this.props;
    return (
      <View style={styles.container}>
        {this.renderDatePicker()}
        {this.renderEvents()}
        <View style={styles.biButtonContainer}>
          <BiButton
            leftChild={this.leftText}
            rightChild={this.rightText}
            onLeftPress={onGlobalPress}
            onRightPress={onPrivatePress}
            leftButtonStyle={{ backgroundColor: colors.WHITE }}
            rightButtonStyle={{ backgroundColor: colors.WHITE }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textPrivate: {
    color: colors.ORANGE_LIGHT,
  },
  textGlobal: {
    color: colors.PURPLE_LIGHT,
  },
  biButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    ...spacers.MB_10,
    ...spacers.MR_4,
  },
  container: { flex: 1 },
  containerDatePicker: {
    ...spacers.PL_14,
    ...spacers.PR_14,
    ...spacers.PT_10,
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {
      width: toBaseDesignPx(0),
      height: toBaseDesignPx(3),
    },
    shadowRadius: toBaseDesignPx(6),
    shadowOpacity: toBaseDesignPx(0.11),
  },
});

Calendar.propTypes = {
  onGlobalPress: PropTypes.func.isRequired,
  onPrivatePress: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  renderEvents: PropTypes.func.isRequired,
};

export default Calendar;
