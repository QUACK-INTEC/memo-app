import React from 'react';
import { FlatList } from 'react-native';

class LoadingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4],
    };
  }

  render() {
    const { data } = this.state;
    const { renderItem } = this.props;

    return (
      <FlatList data={data} renderItem={renderItem} keyExtractor={item => item} {...this.props} />
    );
  }
}

export default LoadingList;
