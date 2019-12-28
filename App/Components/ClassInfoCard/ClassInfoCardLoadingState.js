import React from 'react';

import InfoCard from '../Common/InfoCard';

class ClassInfoCardLoadingState extends React.Component {
  renderClassInfoCardLoadingState = () => {
    return <InfoCard isLoading />;
  };

  render() {
    return this.renderClassInfoCardLoadingState();
  }
}

export default ClassInfoCardLoadingState;
