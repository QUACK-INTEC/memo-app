import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import CalendarStrip from 'react-native-calendar-strip';
// import CalendarStrip from 'react-native-slideable-calendar-strip';

import Moment from 'moment';
import { fonts, colors, toBaseDesignPx, spacers } from '../../../Core/Theme';

const LEFT_ARROW = require('../../../Core/Assets/Images/chevron-sign-down-left.png');
const RIGHT_ARROW = require('../../../Core/Assets/Images/chevron-sign-down-right.png');

const LOCALE = {
  name: 'es',
  config: {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Juilio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
      '_'
    ),
    weekdaysShort: 'Dom_Lun_Mar_Mie_Jue_Vie_Sab'.split('_'),
  },
};

class CalendarDatePicker extends Component {
  handleOnChangeDate = objDate => {
    const { onChange } = this.props;
    onChange(objDate);
  };

  render() {
    const { selectedDate } = this.props;
    return (
      <CalendarStrip
        style={styles.calendarContainer}
        locale={LOCALE}
        dateNameStyle={styles.calendarDateName}
        dateNumberStyle={styles.calendarDateNumber}
        calendarHeaderStyle={styles.calendarHeader}
        startingDate={selectedDate}
        selectedDate={selectedDate}
        onDateSelected={this.handleOnChangeDate}
        highlightDateNumberStyle={{ color: colors.CALENDAR_DATE_NAME }}
        highlightDateNameStyle={{ color: colors.CALENDAR_DATE_NAME }}
        daySelectionAnimation={{
          type: 'background',
          highlightColor: colors.CALENDAR_DATE_SELECTED,
        }}
        iconLeftStyle={styles.calendarIconLeft}
        iconRightStyle={styles.calendarIconRight}
        iconLeft={LEFT_ARROW}
        iconRight={RIGHT_ARROW}
      />
    );
  }
}

const styles = StyleSheet.create({
  calendarContainer: {
    height: toBaseDesignPx(119),
    ...spacers.PT_8,
    ...spacers.PB_14,
  },
  calendarDateName: { ...fonts.LIGHT, color: colors.CALENDAR_DATE_NAME },
  calendarDateNumber: { ...fonts.SEMI_BOLD, ...fonts.SIZE_M, color: colors.CALENDAR_DATE_NAME },
  calendarIconLeft: { ...spacers.MR_2 },
  calendarIconRight: { ...spacers.ML_2 },
  calendarHeader: {
    ...fonts.MEDIUM,
    ...fonts.SIZE_XL,
    ...spacers.PB_8,
    color: colors.CALENDAR_MONTH_TITLE,
  },
});

CalendarDatePicker.defaultProps = {
  selectedDate: Moment(),
  onChange: () => null,
};

CalendarDatePicker.propTypes = {
  selectedDate: PropTypes.shape({}),
  onChange: PropTypes.func,
};

export default CalendarDatePicker;
