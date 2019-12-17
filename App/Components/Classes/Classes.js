import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors, fonts } from '../../Core/Theme';
import Section from '../Common/Section';

class Classes extends React.Component {
  renderClasses = () => {
    const { renderClasses } = this.props;

    return renderClasses();
  };

  render() {
    const { label } = this.props;
    return (
      <>
        <Section
          title={label || 'Clases'}
          viewStyle={styles.classesContainer}
          titleStyle={styles.classesTitle}
        >
          {this.renderClasses()}
        </Section>
      </>
    );
  }
}

const styles = StyleSheet.create({
  classesContainer: { flex: 1 },
  classesTitle: { ...fonts.SIZE_XXL, color: colors.GRAY },
});

Classes.defaultProps = {
  renderClasses: () => null,
  label: null,
};

Classes.propTypes = {
  renderClasses: PropTypes.func,
  label: PropTypes.string,
};

export default Classes;
