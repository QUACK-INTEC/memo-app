import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import ImagePicker from '../Common/ImagePicker';
import SettingsItem from '../SettingsItem';
import { toBaseDesignPx } from '../../Core/Theme';

class SettingsItemImagePicker extends React.Component {
  renderImagePicker = () => {
    const { onChangeProfilePicture, imageUri } = this.props;
    return (
      <ImagePicker
        style={styles.imagePicker}
        imageUri={imageUri}
        onChangeImage={strImageUri => onChangeProfilePicture(strImageUri)}
      />
    );
  };

  render() {
    const { style } = this.props;
    return (
      <SettingsItem
        style={style}
        label="Cambiar foto de perfil"
        hasOnPress={false}
        renderCustomRightChoice={this.renderImagePicker}
      />
    );
  }
}

const styles = StyleSheet.create({
  imagePicker: {
    height: toBaseDesignPx(50),
    width: toBaseDesignPx(50),
    borderRadius: toBaseDesignPx(25),
  },
});

SettingsItemImagePicker.defaultProps = {
  onChangeProfilePicture: () => null,
  imageUri: null,
};

SettingsItemImagePicker.propTypes = {
  onChangeProfilePicture: PropTypes.func,
  imageUri: PropTypes.string,
};

export default SettingsItemImagePicker;
