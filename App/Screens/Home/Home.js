import React from 'react';
import Moment from 'moment';

import HomeComponent from '../../Components/Home';

class Home extends React.Component {
  renderSubjects = () => {
    // TODO: Flatlist component with rendering the subjects

    return null;
  };

  renderEvents = () => {
    // TODO: Flatlist component with rendering the events

    return null;
  };

  render() {
    return (
      <HomeComponent
        actualMonth={Moment().format('MMMM YYYY')}
        renderSubjects={this.renderSubjects}
        renderEvents={this.renderEvents}
      />
    );
  }
}

export default Home;
