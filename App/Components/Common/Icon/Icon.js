import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createIconSetFromIcoMoon, Ionicons, FontAwesome, Glyphicons } from '@expo/vector-icons';

// Constants
import { ICON_TYPE, ICON_SIZE } from './Constants';

// Theme
import { toBaseDesignPx } from '../../../Core/Theme';
import MEMO_ICON_CONFIG from '../../../Core/Assets/MemoIcons/icons.json';

const ICON_MOON_ASSET_ID = require('../../../Core/Assets/Fonts/icomoon.ttf');

const MemoIcon = createIconSetFromIcoMoon(MEMO_ICON_CONFIG, 'iconmoon', ICON_MOON_ASSET_ID);

class Icon extends Component {
  getSize = () => {
    const { size } = this.props;

    switch (size) {
      case ICON_SIZE.TINY:
        return toBaseDesignPx(24);

      case ICON_SIZE.EXTRA_SMALL:
        return toBaseDesignPx(40);

      case ICON_SIZE.MEDIUM:
        return toBaseDesignPx(60);

      case ICON_SIZE.LARGE:
        return toBaseDesignPx(70);

      case ICON_SIZE.EXTRA_LARGE:
        return toBaseDesignPx(95);

      default:
        return toBaseDesignPx(55);
    }
  };

  renderIcon = () => {
    const { type } = this.props;

    switch (type) {
      case ICON_TYPE.FONT_AWESOME:
        return (
          <FontAwesome.Button
            {...this.props}
            size={this.getSize()}
            backgroundColor="transparent"
            underlayColor="transparent"
          />
        );

      case ICON_TYPE.GLYPH_ICONS:
        return (
          <Glyphicons
            {...this.props}
            size={this.getSize()}
            backgroundColor="transparent"
            underlayColor="transparent"
          />
        );

      case ICON_TYPE.MEMO_ICONS:
        return (
          <MemoIcon
            {...this.props}
            size={this.getSize()}
            backgroundColor="transparent"
            underlayColor="transparent"
          />
        );

      default:
        return (
          <Ionicons.Button
            {...this.props}
            size={this.getSize()}
            backgroundColor="transparent"
            underlayColor="transparent"
          />
        );
    }
  };

  render() {
    return this.renderIcon();
  }
}

Icon.defaultProps = {
  type: null,
  size: null,
};

Icon.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
};

export default Icon;
