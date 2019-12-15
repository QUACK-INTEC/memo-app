import React from 'react';
import { View, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import Lodash from 'lodash';

import DatePicker from '../Common/CalendarDatePicker';
import Text from '../Common/Text';
import BiButton from '../Common/BiButton';
import { spacers, toBaseDesignPx, colors } from '../../Core/Theme';
import Event from '../SwipeableEventCalendar';
import InLineComponent from '../Common/InLineComponent';
import Subject from '../SubjectCalendar';
import LoadingState from '../LoadingState';

class Calendar extends React.Component {
  leftText = () => {
    return <Text.Medium text="Global" style={styles.textGlobal} />;
  };

  rightText = () => {
    return <Text.Medium text="Privado" style={styles.textPrivate} />;
  };

  handleOnDateChange = objDate => {
    const { onDateChange } = this.props;
    onDateChange(objDate);
  };

  renderDatePicker = () => {
    return (
      <View style={styles.containerDatePicker}>
        <DatePicker onChange={this.handleOnDateChange} />
      </View>
    );
  };

  renderClassInfoIndicator = () => {
    return (
      <InLineComponent>
        <View style={styles.infoSubjectCalendar} />
        <Text.Light text="Clases" style={styles.infoText} />
      </InLineComponent>
    );
  };

  renderEventInfoIndicator = () => {
    return (
      <InLineComponent>
        <View style={styles.infoEventCalendar} />
        <Text.Light text="Eventos" style={styles.infoText} />
      </InLineComponent>
    );
  };

  renderInfoCalendar = () => {
    return (
      <InLineComponent
        leftChild={this.renderClassInfoIndicator}
        rightChild={this.renderEventInfoIndicator}
      >
        <View style={{ ...spacers.MA_14 }} />
      </InLineComponent>
    );
  };

  renderEvent = ({ item }) => {
    const { onEventPress, onEventDownVote, onEventUpVote } = this.props;

    return (
      <Event
        subjectName={item.subject}
        eventTitle={item.title}
        eventStartTime={item.time}
        author={item.author}
        onPress={() => onEventPress(item)}
        onLeftSwipe={() => onEventDownVote(item)}
        onRightSwipe={() => onEventUpVote(item)}
      />
    );
  };

  renderEvents = () => {
    const { events } = this.props;

    if (events) {
      return (
        <FlatList
          data={events}
          extraData={events}
          renderItem={this.renderEvent}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ ...spacers.MA_14 }} />}
          ListFooterComponent={() => <View style={{ ...spacers.MA_14 }} />}
        />
      );
    }

    return null;
  };

  renderSubject = ({ item }) => {
    const { onSubjectPress } = this.props;

    return (
      <Subject
        subjectName={item.name}
        subjectSchedule={item.schedule}
        onPress={() => onSubjectPress(item)}
      />
    );
  };

  renderSubjects = () => {
    const { subjects } = this.props;

    if (subjects) {
      return (
        <FlatList
          data={subjects}
          extraData={subjects}
          renderItem={this.renderSubject}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ ...spacers.MA_14 }} />}
          ListFooterComponent={() => <View style={{ ...spacers.MA_14 }} />}
          ListHeaderComponent={() => <View style={{ ...spacers.MA_14 }} />}
        />
      );
    }

    return null;
  };

  renderListEventsAndSubjects = () => {
    const { events, subjects, refreshing, onRefresh } = this.props;

    if (Lodash.isEmpty(events) && Lodash.isEmpty(subjects)) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <LoadingState.NoEvents />
        </View>
      );
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {this.renderSubjects()}
        {this.renderEvents()}
      </ScrollView>
    );
  };

  render() {
    const { onGlobalPress, onPrivatePress, isLoading } = this.props;
    return (
      <View style={styles.container}>
        {this.renderDatePicker()}
        <View style={{ ...spacers.ML_4, ...spacers.MR_4, flex: 1 }}>
          <View style={{ alignItems: 'flex-end' }}>{this.renderInfoCalendar()}</View>
          {isLoading ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <LoadingState.Small />
            </View>
          ) : (
            this.renderListEventsAndSubjects()
          )}
        </View>

        <View style={styles.biButtonContainer}>
          <BiButton
            leftChild={this.leftText}
            rightChild={this.rightText}
            onLeftPress={onGlobalPress}
            onRightPress={onPrivatePress}
            leftButtonStyle={{ backgroundColor: colors.WHITE }}
            rightButtonStyle={{ backgroundColor: colors.WHITE }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  infoSubjectCalendar: {
    height: toBaseDesignPx(7),
    width: toBaseDesignPx(7),
    borderRadius: toBaseDesignPx(3.5),
    backgroundColor: colors.GREEN_OPACITY_LIGHT,
    ...spacers.MR_1,
  },
  infoText: { color: colors.GRAY },
  infoEventCalendar: {
    height: toBaseDesignPx(7),
    width: toBaseDesignPx(7),
    borderRadius: toBaseDesignPx(3.5),
    backgroundColor: colors.PURPLE_LIGHT,
    ...spacers.MR_1,
  },
  textPrivate: {
    color: colors.ORANGE_LIGHT,
  },
  textGlobal: {
    color: colors.PURPLE_LIGHT,
  },
  biButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    ...spacers.MB_10,
    ...spacers.MR_4,
  },
  container: { flex: 1 },
  containerDatePicker: {
    ...spacers.PL_14,
    ...spacers.PR_14,
    ...spacers.PT_10,
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {
      width: toBaseDesignPx(0),
      height: toBaseDesignPx(3),
    },
    shadowRadius: toBaseDesignPx(6),
    shadowOpacity: toBaseDesignPx(0.11),
  },
});

Calendar.defaultProps = {
  events: null,
  subjects: null,
};

Calendar.propTypes = {
  onEventPress: PropTypes.func.isRequired,
  onEventUpVote: PropTypes.func.isRequired,
  onEventDownVote: PropTypes.func.isRequired,
  onSubjectPress: PropTypes.func.isRequired,
  onGlobalPress: PropTypes.func.isRequired,
  onPrivatePress: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()),
  subjects: PropTypes.arrayOf(PropTypes.shape()),
  isLoading: PropTypes.bool.isRequired,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default Calendar;
