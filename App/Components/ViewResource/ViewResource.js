import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { Linking } from 'expo';

import InLineComponent from '../Common/InLineComponent';
import Text from '../Common/Text';
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import { toBaseDesignPx, spacers, colors, constants, fonts } from '../../Core/Theme';

class ViewResource extends React.Component {
  handleBackArrow = () => {
    const { onBackArrow } = this.props;
    onBackArrow();
  };

  openFileOnWeb = () => {
    const { resourceURI } = this.props;
    Linking.canOpenURL(resourceURI).then(supported => {
      if (supported) {
        Linking.openURL(resourceURI);
      }
    });
  };

  renderHeader = () => {
    return (
      <InLineComponent viewStyle={styles.header}>
        <View style={styles.headerBackIconContainer}>
          <Icon
            name="chevron-circle-left"
            type={ICON_TYPE.FONT_AWESOME}
            size={ICON_SIZE.TINY}
            color={colors.GRAY}
            onPress={this.handleBackArrow}
          />
        </View>
        <View style={styles.downloadIconContainer}>
          <Icon
            name="download"
            type={ICON_TYPE.FONT_AWESOME}
            size={ICON_SIZE.TINY}
            onPress={this.openFileOnWeb}
            color={colors.GRAY}
          />
        </View>
      </InLineComponent>
    );
  };

  render() {
    const { resourceURI, resourceName } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerInfoContainer}>{this.renderHeader()}</View>
        <Text.Medium text={resourceName} style={styles.titleStyle} />
        {resourceURI ? (
          <WebView
            source={{
              uri: resourceURI,
            }}
            style={{ marginTop: 20 }}
            javaScriptEnabled
            domStorageEnabled
            allowFileAccessFromFileURLs
            startInLoadingState
            originWhitelist={['*']}
            mixedContentMode="compatibility"
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  completeFlex: { flex: 1 },
  container: { flex: 1 },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBackIconContainer: {
    ...spacers.ML_14,
    ...spacers.MT_3,
    width: toBaseDesignPx(47),
    justifyContent: 'flex-start',
  },
  downloadIconContainer: {
    ...spacers.MT_10,
    ...spacers.MR_14,
  },
  headerInfoContainer: { marginTop: constants.DEVICE.STATUS_BAR_HEIGHT },
  centeredChildren: {
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  titleStyle: {
    ...fonts.SIZE_XXL,
    ...spacers.MR_15,
    ...spacers.ML_15,
    alignSelf: 'center',
    color: colors.GRAY,
    textAlign: 'center',
  },
});

ViewResource.defaultProps = {
  onBackArrow: () => null,
  resourceURI: null,
  resourceName: null,
};

ViewResource.propTypes = {
  onBackArrow: PropTypes.func,
  resourceURI: PropTypes.string,
  resourceName: PropTypes.string,
};

export default ViewResource;
