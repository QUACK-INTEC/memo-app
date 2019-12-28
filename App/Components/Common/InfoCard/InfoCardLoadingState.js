import React from 'react';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';

import { Rect } from 'react-native-svg';

import { toBaseDesignPx } from '../../../Core/Theme';

class SectionLoadingState extends React.Component {
  renderSectionLoadingState = () => {
    return (
      <SvgAnimatedLinearGradient height={toBaseDesignPx(80)} width={toBaseDesignPx(151)}>
        <Rect
          x={toBaseDesignPx(8)}
          y={toBaseDesignPx(19)}
          rx={toBaseDesignPx(5)}
          ry={toBaseDesignPx(5)}
          width={toBaseDesignPx(200)}
          height={toBaseDesignPx(104)}
        />
      </SvgAnimatedLinearGradient>
    );
  };

  render() {
    return this.renderSectionLoadingState();
  }
}

export default SectionLoadingState;
