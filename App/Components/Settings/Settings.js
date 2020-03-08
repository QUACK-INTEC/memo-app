import React from 'react';
import { View, StyleSheet, SafeAreaView, Linking } from 'react-native';
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
    const {
      onBackArrowPress,
      onChangeProfilePicture,
      onLogoutPress,
      onSyncPress,
      onNotificationPress,
      imageUri,
      onChangePasswordPress,
    } = this.props;

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
          <SettingsItemImagePicker
            onChangeProfilePicture={onChangeProfilePicture}
            label="Cambiar foto de perfil"
            imageUri={imageUri}
            style={styles.separatorItemImageProfile}
          />
          <SettingsItem
            label="Nombre"
            style={styles.separatorItems}
            hasOnPress={false}
            renderCustomRightChoice={this.renderUserName}
          />
          <SettingsItem
            label="Sincronizar cuenta"
            style={styles.separatorItems}
            onPress={onSyncPress}
          />
          <SettingsItem
            label="Notificaciones"
            style={styles.separatorItems}
            onPress={onNotificationPress}
          />
          <SettingsItem
            label="Cambiar Contraseña"
            style={styles.separatorItems}
            onPress={onChangePasswordPress}
          />
          <SettingsItem
            label="FAQ"
            style={styles.separatorItems}
            onPress={() => Linking.openURL('https://memosupport.pedroslopez.me/')}
          />
          <SettingsItem
            label="MemoWiki"
            style={styles.separatorItems}
            onPress={() => Linking.openURL('https://memowiki.pedroslopez.me')}
          />
          <SettingsItem
            label="SLA"
            style={styles.separatorItems}
            onPress={() => Linking.openURL('https://memosupport.pedroslopez.me/sla')}
          />
        </View>
        <View style={styles.containerLogOut}>
          <SettingsItem
            label="Cerrar sesión"
            style={[styles.separatorItems, styles.logoutItem]}
            onPress={onLogoutPress}
            labelStyle={styles.logoutItem}
            iconColor={colors.RED}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logoutItem: { borderColor: colors.RED, color: colors.RED },
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

Settings.defaultProps = {
  imageUri: null,
};

Settings.propTypes = {
  userName: PropTypes.string.isRequired,
  onBackArrowPress: PropTypes.func.isRequired,
  onChangePasswordPress: PropTypes.func.isRequired,
  onChangeProfilePicture: PropTypes.func.isRequired,
  onLogoutPress: PropTypes.func.isRequired,
  onSyncPress: PropTypes.func.isRequired,
  onNotificationPress: PropTypes.func.isRequired,
  imageUri: PropTypes.string,
};

export default Settings;
