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
  static getDerivedStateFromProps(props, state) {
    if (props.time !== state.date && props.time) {
      const strDate = `${
        Moment(props.time).hours() < 10
          ? `0${Moment(props.time).hours()}`
          : Moment(props.time).hours()
      }:${
        Moment(props.time).minutes() < 10
          ? `0${Moment(props.time).minutes()}`
          : Moment(props.time).minutes()
      }`;
      const timeDate = Moment(props.time).toDate();
      const newDate = new Date(timeDate.getTime() + timeDate.getTimezoneOffset() * 60 * 1000);
      const offset = timeDate.getTimezoneOffset() / 60;
      const hours = timeDate.getHours();
      newDate.setHours(hours + offset);
      return {
        date: strDate,
        timePicked: newDate,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date: '--:--',
      timePicked: new Date(),
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
    const hours =
      strDate.hours() < 10 ? `0${strDate.hours().toString()}` : strDate.hours().toString();
    const minutes =
      strDate.minutes() < 10 ? `0${strDate.minutes().toString()}` : strDate.minutes().toString();
    this.setState(
      {
        date: `${hours}:${minutes}`,
        timePicked: date,
      },
      this.hideDateTimePicker()
    );
  };

  render() {
    const { date, isDateTimePickerVisible, timePicked } = this.state;
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
            date={timePicked}
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
  onChange: () => null,
};

TimePicker.propTypes = {
  time: PropTypes.string,
  textStyle: PropTypes.shape({}),
  onChange: PropTypes.func,
};

export default TimePicker;
