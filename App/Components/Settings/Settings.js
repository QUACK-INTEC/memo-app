import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import SettingsItem from '../SettingsItem';
import SettingsItemImagePicker from '../SettingsItemImagePicker';
import { colors, toBaseDesignPx, spacers } from '../../Core/Theme';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import Text from '../Common/Text';

// TODO: custom text name for user and implement props to handle from screen
class Settings extends React.Component {
  renderUserName = () => {
    const { userName } = this.props;
    return <Text.SemiBold text={userName} style={{ color: colors.GRAY }} />;
  };

  render() {
    const { onBackArrowPress, onChangeProfilePicture } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.headerBackIconContainer}>
            <Icon
              name="chevron-circle-left"
              type={ICON_TYPE.FONT_AWESOME}
              size={ICON_SIZE.TINY}
              color={colors.GRAY}
              onPress={onBackArrowPress}
            />
          </View>
          <SettingsItem label="Sincronizar cuenta" style={styles.separatorItems} />
          <SettingsItem label="Notificaciones" style={styles.separatorItems} />
          <SettingsItemImagePicker
            onChangeProfilePicture={onChangeProfilePicture}
            label="Cambiar foto de perfil"
            style={styles.separatorItemImageProfile}
          />
          <SettingsItem
            label="Nombre"
            style={styles.separatorItems}
            hasOnPress={false}
            renderCustomRightChoice={this.renderUserName}
          />
        </View>
        <View style={styles.containerLogOut}>
          <SettingsItem label="Cerrar sesión" style={styles.separatorItems} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', alignContent: 'space-between', flex: 1 },
  separatorItemImageProfile: { ...spacers.MB_5 },
  containerLogOut: { ...spacers.MB_4 },
  separatorItems: { ...spacers.MB_3 },
  headerBackIconContainer: {
    ...spacers.ML_14,
    ...spacers.MT_3,
    ...spacers.MB_5,
    width: toBaseDesignPx(47),
  },
});

Settings.propTypes = {
  userName: PropTypes.string.isRequired,
  onBackArrowPress: PropTypes.func.isRequired,
  onChangeProfilePicture: PropTypes.func.isRequired,
};

export default Settings;
