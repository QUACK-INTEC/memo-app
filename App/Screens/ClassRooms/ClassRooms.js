import React from 'react';

import ClassesComponent from '../../Components/Classes';

class ClassRooms extends React.Component {
  renderClasses = () => {
    // TODO: List all my classes when backend is ready
    return null;
  };

  render() {
    return <ClassesComponent renderClasses={this.renderClasses} />;
  }
}

export default ClassRooms;
