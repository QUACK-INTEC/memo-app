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
      return {
        date: strDate,
        timePicked: timeDate,
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
    const { style, placeholder } = this.props;
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
            titleIOS={placeholder}
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
  placeholder: 'Seleccione una hora',
};

TimePicker.propTypes = {
  time: PropTypes.string,
  textStyle: PropTypes.shape({}),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default TimePicker;
