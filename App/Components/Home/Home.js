import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import { colors, spacers, fonts, toBaseDesignPx } from '../../Core/Theme';
import Text from '../Common/Text';
import SubjectCalendar from '../SubjectCalendar';
import InLineComponent from '../Common/InLineComponent';
import Section from '../Common/Section';
// import ClassInfoCard from '../ClassInfoCard';

class Home extends React.Component {
  renderTodayTitle = () => {
    return (
      <View>
        <Text.Bold text="Hoy," style={styles.textToday} />
        <Text.Medium text="Noviembre 2019" style={styles.textMonthActual} />
      </View>
    );
  };

  renderInfoCalendar = () => {
    return (
      <View>
        <InLineComponent>
          <View style={styles.infoSubjectCalendar} />
          <Text.Light text="clases" />
        </InLineComponent>
        <InLineComponent>
          <View style={styles.infoEventCalendar} />
          <Text.Light text="Eventos" />
        </InLineComponent>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <Section>
          <View style={styles.headerContainer}>
            <InLineComponent
              viewStyle={styles.headerInlineContainer}
              leftChild={this.renderTodayTitle}
              rightChild={this.renderInfoCalendar}
            />
          </View>
          <View>
            <SubjectCalendar subjectName="Proyecto final" subjectSchedule="18:00 - 20:00" />
            <SubjectCalendar subjectName="Proyecto final" subjectSchedule="18:00 - 20:00" />
            <SubjectCalendar subjectName="Proyecto final" subjectSchedule="18:00 - 20:00" />
            <SubjectCalendar subjectName="Proyecto final" subjectSchedule="18:00 - 20:00" />
          </View>
        </Section>
        <View>
          <Section
            title="Clases"
            viewStyle={styles.classesContainer}
            titleStyle={styles.classesTitle}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default Home;
