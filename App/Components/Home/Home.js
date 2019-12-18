import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import Lodash from 'lodash';

import { colors, spacers, fonts, toBaseDesignPx } from '../../Core/Theme';
import Text from '../Common/Text';
import InLineComponent from '../Common/InLineComponent';
import Section from '../Common/Section';
import LoadingState from '../LoadingState';
import Link from '../Common/Link';
import Event from '../SwipeableEventCalendar';
import Subject from '../SubjectCalendar';

class Home extends React.Component {
  renderTodayTitle = () => {
    const { actualMonth } = this.props;
    return (
      <View>
        <Text.Bold text="Hoy," style={styles.textToday} />
        <Text.Medium text={actualMonth} style={styles.textMonthActual} />
      </View>
    );
  };

  renderInfoCalendar = () => {
    return (
      <View>
        <InLineComponent>
          <View style={styles.infoSubjectCalendar} />
          <Text.Light text="Clases" style={styles.infoText} />
        </InLineComponent>
        <InLineComponent>
          <View style={styles.infoEventCalendar} />
          <Text.Light text="Eventos" style={styles.infoText} />
        </InLineComponent>
      </View>
    );
  };

  renderEvent = ({ item }) => {
    const { onEventPress, onEventDownVote, onEventUpVote } = this.props;
    return (
      <Event
        subjectName={item.subject}
        eventTitle={item.title}
        eventStartTime={item.time}
        author={item.name}
        onLeftSwipe={() => onEventDownVote(item)}
        onRightSwipe={() => onEventUpVote(item)}
        onPress={() => onEventPress(item)}
        avatarUri={item.avatarURL}
        isPrivate={item.isPrivate}
        badgeUri={item.badgeUri}
        initialsText={item.initials}
      />
    );
  };

  renderListEvents = () => {
    const { events } = this.props;

    if (!Lodash.isEmpty(events)) {
      return (
        <FlatList
          data={events}
          extraData={events}
          renderItem={this.renderEvent}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ ...spacers.MA_2 }} />}
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

  renderListSubjects = () => {
    const { subjects } = this.props;

    if (!Lodash.isEmpty(subjects)) {
      return (
        <FlatList
          data={subjects}
          extraData={subjects}
          renderItem={this.renderSubject}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ ...spacers.MA_2 }} />}
          ListFooterComponent={() => <View style={{ ...spacers.MA_14 }} />}
        />
      );
    }

    return null;
  };

  renderEvents = () => {
    const { events, subjects } = this.props;

    if (Lodash.isEmpty(events) && Lodash.isEmpty(subjects)) {
      return (
        <View style={styles.noEventsContainer}>
          <LoadingState.NoEvents />

          <Text.Medium text="Nada para hoy" style={styles.noEventsText} />
          <Link
            text="Ver mi calendario"
            textStyle={styles.goToCalendarText}
            onPress={this.handleOnMyCalendarPress}
          />
        </View>
      );
    }
    return (
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
        {this.renderListSubjects()}
        {this.renderListEvents()}
      </ScrollView>
    );
  };

  render() {
    const { renderSubjects, refreshing, onRefresh } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Section>
          <View style={styles.headerContainer}>
            <InLineComponent
              viewStyle={styles.headerInlineContainer}
              leftChild={this.renderTodayTitle}
              rightChild={this.renderInfoCalendar}
            />
          </View>
        </Section>
        <ScrollView
          style={styles.container}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Section>{this.renderEvents()}</Section>
          <Section
            title="Clases"
            viewStyle={styles.classesContainer}
            titleStyle={styles.classesTitle}
          >
            {renderSubjects()}
          </Section>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  noEventsText: { color: colors.GRAY, ...spacers.MT_16, ...spacers.MB_2 },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...spacers.MB_4,
    ...spacers.MT_15,
  },
  container: {
    flex: 1,
  },
  textToday: { ...fonts.SIZE_XXXL, color: colors.GRAY },
  textMonthActual: { ...fonts.SIZE_XL, color: colors.GRAY },
  infoSubjectCalendar: {
    height: toBaseDesignPx(7),
    width: toBaseDesignPx(7),
    borderRadius: toBaseDesignPx(3.5),
    backgroundColor: colors.GREEN_OPACITY_LIGHT,
    ...spacers.MR_1,
  },
  infoEventCalendar: {
    height: toBaseDesignPx(7),
    width: toBaseDesignPx(7),
    borderRadius: toBaseDesignPx(3.5),
    backgroundColor: colors.PURPLE_LIGHT,
    ...spacers.MR_1,
  },
  headerContainer: { ...spacers.MB_3, justifyContent: 'center' },
  headerInlineContainer: {
    justifyContent: 'space-between',
  },
  classesContainer: { ...spacers.MT_10 },
  classesTitle: { ...fonts.SIZE_XXL, color: colors.GRAY },
  infoText: { color: colors.GRAY },
});

Home.defaultProps = {
  events: null,
  subjects: null,
};

Home.propTypes = {
  onEventPress: PropTypes.func.isRequired,
  onEventUpVote: PropTypes.func.isRequired,
  onEventDownVote: PropTypes.func.isRequired,
  onSubjectPress: PropTypes.func.isRequired,
  renderSubjects: PropTypes.func.isRequired,
  actualMonth: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()),
  subjects: PropTypes.arrayOf(PropTypes.shape()),
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default Home;
