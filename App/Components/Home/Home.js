import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { colors, spacers, fonts, toBaseDesignPx } from '../../Core/Theme';
import Text from '../Common/Text';
import InLineComponent from '../Common/InLineComponent';
import Section from '../Common/Section';

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

  render() {
    const { renderEvents, renderSubjects } = this.props;
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
        <ScrollView style={styles.container}>
          <Section>{renderEvents()}</Section>
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

Home.propTypes = {
  renderEvents: PropTypes.func.isRequired,
  renderSubjects: PropTypes.func.isRequired,
  actualMonth: PropTypes.string.isRequired,
};

export default Home;
