import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../../Components/Common/Text';

// For test, to know how to use redux
import { actions as userActions } from '../../Redux/Common/UserManager';

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'test',
    };
  }

  // For test, to know how to use the actions redux
  onPressButton = () => {
    const { setToken } = this.props;
    const { token } = this.state;

    setToken(token);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hi friend</Text>
        <Button title="Press me" onPress={this.onPressButton} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'red', flex: 1 },
});

// Redux
// const mapStateToProps = (state, props) => {
//   const {
//     getSpacesLookup,
//     getSelectedLocation,
//     getSpaceFiltered,
//     getAmenitiesLookup,
//     getSpaceFilters,
//     getSelectedDate,
//   } = spaceSelectors;
//   const { getLocationsLookup } = locationsSelectors;
//   return {
//     spacesLookup: getSpacesLookup(state, props),
//     locationsLookup: getLocationsLookup(state, props),
//     selectedLocation: getSelectedLocation(state, props),
//     spaces: getSpaceFiltered(state, props),
//     amenitiesLookup: getAmenitiesLookup(state, props),
//     spaceFilters: getSpaceFilters(state, props),
//     selectedDate: getSelectedDate(state, props),
//   };
// };

Playground.defaultProps = {
  setToken: () => null,
};

Playground.propTypes = {
  setToken: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setToken: userActions.setUserToken,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Playground);
