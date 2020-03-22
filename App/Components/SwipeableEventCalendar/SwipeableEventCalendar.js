import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-swipeable';

// Theme
import { spacers, colors } from '../../Core/Theme';

// Common
import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';
import EventCalendar from '../EventCalendar';

class SwipeableEventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.rightContent = (
      <View style={styles.rightIconStyle}>
        <Icon
          size={ICON_SIZE.SMALL}
          type={ICON_TYPE.MEMO_ICONS}
          name="thumb_up"
          color={colors.GREEN}
        />
      </View>
    );

    this.leftContent = (
      <View style={styles.leftIconStyle}>
        <Icon
          size={ICON_SIZE.SMALL}
          type={ICON_TYPE.MEMO_ICONS}
          name="thumb_down"
          color={colors.RED}
        />
      </View>
    );
  }

  handleLeftSwipe = () => {
    const { disabled, onLeftSwipe } = this.props;

    if (!disabled) {
      return onLeftSwipe();
    }

    return null;
  };

  handleRightSwipe = () => {
    const { disabled, onRightSwipe } = this.props;

    if (!disabled) {
      return onRightSwipe();
    }

    return null;
  };

  render() {
    const { isAuthor } = this.props;
    if (isAuthor) {
      return <EventCalendar {...this.props} />;
    }
    return (
      <Swipeable
        leftContent={this.leftContent}
        rightContent={this.rightContent}
        onLeftActionRelease={this.handleLeftSwipe}
        onRightActionRelease={this.handleRightSwipe}
      >
        <EventCalendar {...this.props} />
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftIconStyle: { flex: 1, justifyContent: 'center', ...spacers.MR_2, alignItems: 'flex-end' },
  rightIconStyle: {
    flex: 1,
    justifyContent: 'center',
    ...spacers.ML_2,
  },
});

SwipeableEventCalendar.defaultProps = {
  isAuthor: null,
  disabled: null,
  onRightSwipe: () => null,
  onLeftSwipe: () => null,
};

SwipeableEventCalendar.propTypes = {
  isAuthor: PropTypes.bool,
  disabled: PropTypes.bool,
  onRightSwipe: PropTypes.func,
  onLeftSwipe: PropTypes.func,
};

export default SwipeableEventCalendar;
