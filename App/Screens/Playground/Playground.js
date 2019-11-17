import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Theme
import { colors, spacers, fonts } from '../../Core/Theme';

// Common
import ImagePicker from '../../Components/Common/ImagePicker';

// For test, to know how to use redux
import { actions as userActions } from '../../Redux/Common/UserManager';

import EventForm from '../../Components/EventForm';

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
      <EventForm />
      // <View style={styles.container}>
      //   <Button title="Press me" onPress={this.onPressButton} />
      //   <ImagePicker />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.GREEN_LIGHT,
    flex: 1,
    ...spacers.MA_9,
  },
  boldXSText: {
    fontFamily: 'poppins-bold',
    color: 'blue',
    ...fonts.BOLD,
    ...fonts.SIZE_XS,
  },
  boldSText: {
    fontFamily: 'poppins-bold',
    color: 'blue',
    ...fonts.BOLD,
    ...fonts.SIZE_S,
  },
  boldMText: {
    fontFamily: 'poppins-bold',
    color: 'blue',
    ...fonts.BOLD,
    ...fonts.SIZE_M,
  },
  boldLText: {
    fontFamily: 'poppins-bold',
    color: 'blue',
    ...fonts.BOLD,
    ...fonts.SIZE_L,
  },
  boldXLText: {
    fontFamily: 'poppins-bold',
    color: 'blue',
    ...fonts.BOLD,
    ...fonts.SIZE_XL,
  },
  boldXXLText: {
    fontFamily: 'poppins-bold',
    color: 'blue',
    ...fonts.BOLD,
    ...fonts.SIZE_XXL,
  },
  boldXXXLText: {
    fontFamily: 'poppins-bold',
    color: 'blue',
    ...fonts.BOLD,
    ...fonts.SIZE_XXXL,
  },
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
//
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
