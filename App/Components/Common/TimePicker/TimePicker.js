import React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Moment from 'moment';
// eslint-disable-next-line import/no-unresolved
import { Appearance } from 'react-native-appearance';

// Common
import Text from '../Text';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date: '--:--',
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    const { onChange } = this.props;
    onChange(date);
    const strDate = Moment(date).utc();
    const hours = strDate.hours() < 10 ? `0${strDate.hours().toString()}` : strDate.hours();
    const minutes = strDate.minutes() < 10 ? `0${strDate.minutes().toString()}` : strDate.minutes();

    this.setState(
      {
        date: `${hours}:${minutes}`,
      },
      this.hideDateTimePicker()
    );
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
  textStyle: null,
  onChange: () => null,
};

TimePicker.propTypes = {
  textStyle: PropTypes.shape({}),
  onChange: PropTypes.func,
};

export default TimePicker;
