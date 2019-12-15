import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingState from '../../Components/LoadingState';

import ViewResourceComponent from '../../Components/ViewResource';

class ViewResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      resourceName: null,
      resourceURI: null,
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam },
    } = this.props;
    const resourceName = getParam('resourceName', 'Data de Prueba');
    const resourceURI = getParam(
      'resourceURI',
      'https://streampage.nyc3.digitaloceanspaces.com/memo/att/1575859645809_IDS%20-%201069215%20-%20FRANCINE%20LUCCA.pdf'
    );

    this.setState({
      resourceName,
      isLoading: false,
      resourceURI,
    });
  }

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  render() {
    const { isLoading, resourceName, resourceURI } = this.state;
    return (
      <View style={styles.container}>
        <ViewResourceComponent
          resourceName={resourceName}
          resourceURI={resourceURI}
          onBackArrow={this.handleBackArrow}
        />
        <LoadingState.Modal isVisible={isLoading} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ViewResource;
