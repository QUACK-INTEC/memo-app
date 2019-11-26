import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import { colors, spacers, fonts } from '../../Core/Theme';
import Section from '../Common/Section';

class Classes extends React.Component {
  renderClasses = () => {
    const { renderClasses } = this.props;

    return renderClasses();
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Section
          title="Clases"
          viewStyle={styles.classesContainer}
          titleStyle={styles.classesTitle}
        >
          {this.renderClasses()}
        </Section>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  classesContainer: { ...spacers.MT_10, flex: 1 },
  classesTitle: { ...fonts.SIZE_XXL, color: colors.GRAY },
});

Classes.defaultProps = {
  renderClasses: () => null,
};

Classes.propTypes = {
  renderClasses: PropTypes.func,
};

export default Classes;
