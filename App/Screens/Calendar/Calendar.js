import React from 'react';

import CalendarComponent from '../../Components/Calendar';

class Calendar extends React.Component {
  renderEvents = () => {
    // TODO: Get events for today from API
    return null;
  };

  render() {
    return (
      <CalendarComponent
        onGlobalPress={() => null}
        onPrivatePress={() => null}
        onDateChange={() => null}
        renderEvents={this.renderEvents}
      />
    );
  }
}

export default Calendar;
