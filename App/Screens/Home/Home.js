import React from 'react';
import { View, StyleSheet } from 'react-native';
import Moment from 'moment';

import LoadingState from '../../Components/LoadingState';
import Text from '../../Components/Common/Text';
import Link from '../../Components/Common/Link';
import HomeComponent from '../../Components/Home';
import Icon, { ICON_TYPE, ICON_SIZE } from '../../Components/Common/Icon';
import { colors, fonts, spacers } from '../../Core/Theme';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    // TODO: Handle from API the subjects and events for today
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }

  renderSubjects = () => {
    // TODO: Flatlist component with rendering the subjects

    return null;
  };

  renderEvents = () => {
    // TODO: Flatlist component with rendering the events
    const { isLoading } = this.state;

    if (isLoading) return null;

    return (
      <View style={styles.noEventsContainer}>
        <Icon
          type={ICON_TYPE.MEMO_ICONS}
          name="moon"
          color={colors.GRAY}
          size={ICON_SIZE.EXTRA_LARGE}
        />
        <Text.Medium text="Nada para hoy" style={styles.noEventsText} />
        <Link text="Ver mi calendario" textStyle={styles.goToCalendarText} />
      </View>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <LoadingState.Modal isVisible={isLoading} />
        <HomeComponent
          actualMonth={Moment().format('MMMM YYYY')}
          renderSubjects={this.renderSubjects}
          renderEvents={this.renderEvents}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...spacers.MB_15,
    ...spacers.MT_15,
  },
  goToCalendarText: { color: colors.GREEN_LIGHT, ...fonts.SIZE_S },
  noEventsText: { color: colors.GRAY, ...spacers.MT_16, ...spacers.MB_2 },
});

export default Home;
