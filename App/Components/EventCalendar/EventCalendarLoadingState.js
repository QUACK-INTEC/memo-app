import React from 'react';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';

import { Rect } from 'react-native-svg';

import { toBaseDesignPx, constants } from '../../Core/Theme';

class EventCalendarLoadingState extends React.Component {
  renderEventCalendarLoadingState = () => {
    return (
      <SvgAnimatedLinearGradient height={toBaseDesignPx(96)} width={toBaseDesignPx(327)}>
        <Rect
          x={toBaseDesignPx(8)}
          y={toBaseDesignPx(19)}
          rx={toBaseDesignPx(5)}
          ry={toBaseDesignPx(5)}
          width={toBaseDesignPx(378)}
          height={toBaseDesignPx(124)}
        />
      </SvgAnimatedLinearGradient>
    );
  };

  render() {
    if (constants.isAndroid) {
      return null;
    }

    return this.renderEventCalendarLoadingState();
  }
}

export default EventCalendarLoadingState;
