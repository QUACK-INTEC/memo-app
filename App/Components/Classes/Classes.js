import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import { colors, spacers, fonts } from '../../Core/Theme';
import LoadingState from '../LoadingState';
import Section from '../Common/Section';

class Classes extends React.Component {
  renderClasses = () => {
    const { isLoading, renderClasses } = this.props;
    if (isLoading) {
      return <LoadingState.Small />;
    }

    return renderClasses();
  };

  render() {
    return (
      <SafeAreaView>
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
  classesContainer: { ...spacers.MT_10 },
  classesTitle: { ...fonts.SIZE_XXL, color: colors.GRAY },
});

Classes.defaultProps = {
  isLoading: true,
  renderClasses: () => null,
};

Classes.propTypes = {
  isLoading: PropTypes.bool,
  renderClasses: PropTypes.func,
};

export default Classes;