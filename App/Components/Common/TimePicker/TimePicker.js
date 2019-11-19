import React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Appearance } from 'react-native-appearance';

// Common
import Text from '../Text';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date: props.time || '--:--',
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({ date: `${date.getHours()}:${date.getMinutes()}` }, this.hideDateTimePicker());
  };

  render() {
    const { date, isDateTimePickerVisible } = this.state;
    const { style } = this.props;
    const colorScheme = Appearance.getColorScheme();
    let darkMode = false;

    if (colorScheme === 'dark') {
      darkMode = true;
    }

    return (
      <>
        <TouchableOpacity onPress={this.showDateTimePicker}>
          <DateTimePicker
            mode="time"
            is24Hour
            locale="en_GB"
            isVisible={isDateTimePickerVisible}
            isDarkModeEnabled={darkMode}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          <Text.SemiBold text={date} style={style} />
        </TouchableOpacity>
      </>
    );
  }
}

TimePicker.defaultProps = {
  time: null,
  textStyle: null,
};

TimePicker.propTypes = {
  time: PropTypes.string,
  textStyle: PropTypes.shape({}),
};

export default TimePicker;
