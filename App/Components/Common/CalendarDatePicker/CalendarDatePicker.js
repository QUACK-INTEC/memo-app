import React, { Component } from 'react';
import CalendarStrip from 'react-native-calendar-strip';

import Moment from 'moment';

class CalendarDatePicker extends Component {
  render() {
    return (
      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        style={{ height: 150, paddingTop: 20, paddingBottom: 10 }}
        daySelectionAnimation={{
          type: 'border',
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: 'white',
        }}
        startingDate={Moment()}
        selectedDate={Moment()}
        onDateSelected={(dateSelected) => console.log({dateSelected})}
        highlightDateNumberStyle={{color: 'yellow'}}
        highlightDateNameStyle={{color: 'yellow'}}
      />
    );
  }
}

export default CalendarDatePicker;
