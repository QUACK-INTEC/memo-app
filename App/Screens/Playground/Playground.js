import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Theme
import { colors, spacers, fonts, toBaseDesignPx } from '../../Core/Theme';

// Common
import ImagePicker from '../../Components/Common/ImagePicker';
import Text from '../../Components/Common/Text';
import BiButton from '../../Components/Common/BiButton';
import Icon, { ICON_TYPE, ICON_SIZE } from '../../Components/Common/Icon';

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

  leftButton = defaultStyle => {
    return (
      <View
        style={{
          backgroundColor: colors.GREEN,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Icon
          type={ICON_TYPE.FONT_AWESOME}
          size={ICON_SIZE.TINY}
          name="chevron-down"
          color={colors.WHITE}
        />
      </View>
    );
  };

  leftText = defaultStyle => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text.Medium
          text="global"
          style={{
            color: colors.PURPLE_LIGHT,
          }}
        />
      </View>
    );
  };

  rightButton = defaultStyle => {
    return (
      <View
        style={{
          backgroundColor: colors.GREEN,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Icon
          type={ICON_TYPE.FONT_AWESOME}
          size={ICON_SIZE.TINY}
          name="chevron-up"
          color={colors.WHITE}
        />
      </View>
    );
  };

  rightText = defaultStyle => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text.Medium
          text="privado"
          style={{
            color: colors.ORANGE_LIGHT,
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <View>
        <Button title="Press me" onPress={this.onPressButton} />
        <ImagePicker />
        <BiButton
          // containerBackgoundColor={colors.GREEN}
          leftChild={this.leftButton}
          rightChild={this.rightButton}
          onLeftPress={() => alert('left')}
          onRightPress={() => alert('right')}
        />
        <View style={{ height: toBaseDesignPx(10) }} />
        <BiButton
          leftChild={this.leftText}
          rightChild={this.rightText}
          onLeftPress={() => alert('left')}
          onRightPress={() => alert('right')}
        />
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Text.Medium text="shadow Applied" style={styles.textStyle} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textStyle: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: 10,
    // shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5,
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
