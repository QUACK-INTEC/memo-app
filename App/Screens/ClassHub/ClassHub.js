import React from 'react';

import ClassHubComponent from '../../Components/ClassHub';

class ClassHub extends React.Component {
  renderClassHubComponent = () => {
    return <ClassHubComponent />;
  };

  render() {
    return this.renderClassHubComponent();
  }
}

export default ClassHub;
