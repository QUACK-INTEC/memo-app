import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

// Theme

import { colors } from '../../Core/Theme';

// Common

import Text from '../Common/Text';

const MAXLENGTH = 10;

class FilePill extends React.Component {
  trimText = (text, type) => {
    if (type && text.length > MAXLENGTH) {
      return `${text.substring(0, MAXLENGTH)}...${type}`;
    }
    if (text.length > MAXLENGTH) {
      return `${text.substring(0, MAXLENGTH)}...`;
    }
    if (type) {
      return `${text.substring(0, MAXLENGTH)}.${type}`;
    }
    return `${text.substring(0, MAXLENGTH)}`;
  };

  handlePress = () => {
    const { onPress, id } = this.props;
    return onPress(id);
  };

  render() {
    const { documentText, documentType } = this.props;
    const text = this.trimText(documentText, documentType);
    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <View>
          <Text.SemiBold text={text} style={styles.text} />
        </View>
        <View style={styles.closeContainer}>
          <Text.SemiBold text="x" style={styles.x} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 1,
    backgroundColor: colors.GRAY_LIGHT,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 180,
    opacity: 0.7,
  },
  closeContainer: {
    width: 15,
    height: 15,
    backgroundColor: colors.GRAY,
    borderRadius: 50,
    alignItems: 'center',
    marginLeft: 5,
    justifyContent: 'center',
  },
  text: {
    fontSize: 11,
  },
  x: {
    color: 'white',
    fontSize: 9,
  },
});

FilePill.defaultProps = {
  id: '',
  documentText: '',
  documentType: '',
  onPress: () => null,
};

FilePill.propTypes = {
  id: PropTypes.string,
  documentText: PropTypes.string,
  documentType: PropTypes.string,
  onPress: PropTypes.func,
};

export default FilePill;
