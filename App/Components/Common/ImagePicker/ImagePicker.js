import React from 'react';
import { TouchableOpacity, Alert, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePickerExpo from 'expo-image-picker';

// Theme
import { colors, toBaseDesignPx } from '../../../Core/Theme';
import ImageWrapper, { MEMO_ASSETS } from '../ImageWrapper';

// Common
import Avatar from '../Avatar';

class ImagePicker extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.imageUri !== state.imageUri) {
      return {
        imageUri: state.imageUri || props.imageUri,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      imageUri: null,
    };
  }

  handleOnPress = () => {
    const { disabled } = this.props;

    if (!disabled) {
      return this.showImagePicker();
    }

    return null;
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
        Alert.alert('Opps!', 'Se requieren los permisos de cámara para seleccionar una imagen.');
        return Promise.reject();
      }
    }

    return Promise.resolve();
  };

  showImagePicker = async () => {
    const { onChangeImage } = this.props;
    return this.getPermissionAsync()
      .then(async () => {
        const result = await ImagePickerExpo.launchImageLibraryAsync({
          mediaTypes: ImagePickerExpo.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
        });

        if (!result.cancelled) {
          this.setState({ imageUri: result.uri }, () => {
            const { imageUri } = this.state;
            onChangeImage(imageUri);
          });
        }
      })
      .catch(() => {
        // TODO LOG error
      });
  };

  renderImage = () => {
    const { imageUri } = this.state;
    const { style, iconStyle } = this.props;
    if (imageUri) {
      return <Avatar uri={imageUri} style={[styles.avatarStyle, style]} />;
    }
    return (
      <ImageWrapper
        memoSrc={MEMO_ASSETS.CAMERA_PLACEHOLDER}
        style={[styles.iconContainer, iconStyle]}
      />
    );
  };

  render() {
    const { style } = this.props;
    return (
      <TouchableOpacity onPress={this.handleOnPress} style={[styles.avatarStyle, style]}>
        {this.renderImage()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  avatarStyle: {
    height: toBaseDesignPx(188),
    width: toBaseDesignPx(188),
    borderRadius: toBaseDesignPx(94),
    backgroundColor: colors.GRAY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    height: toBaseDesignPx(80),
    width: toBaseDesignPx(80),
  },
});

ImagePicker.defaultProps = {
  disabled: null,
  onChangeImage: () => null,
  style: null,
  iconStyle: null,
};

ImagePicker.propTypes = {
  disabled: PropTypes.bool,
  onChangeImage: PropTypes.func,
  style: ViewPropTypes.style,
  iconStyle: ViewPropTypes.style,
};

export default ImagePicker;
