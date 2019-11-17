import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ClassesComponent from '../../Components/Classes';
import { selectors as myClassesSelectors } from '../../Redux/Common/MyClasses';
import ClassInfoCard from '../../Components/ClassInfoCard';
import { spacers } from '../../Core/Theme';
import { MyClasses } from '../../Models';

class ClassRooms extends React.Component {
  renderSubject = ({ item }) => {
    return (
      <View style={styles.myClassContainer}>
        <ClassInfoCard
          subject="Falta del api"
          professor={item.professorName}
          schedule={item.classDays}
        />
      </View>
    );
  };

  renderClasses = () => {
    const { myClasses } = this.props;
    const myClassesFormatted = MyClasses.getMyClassesData(myClasses);

    return (
      <FlatList
        columnWrapperStyle={styles.classesContainer}
        data={myClassesFormatted}
        numColumns={2}
        renderItem={this.renderSubject}
        keyExtractor={item => item.id}
      />
    );
  };

  render() {
    return <ClassesComponent renderClasses={this.renderClasses} />;
  }
}
const styles = StyleSheet.create({
  classesContainer: { justifyContent: 'space-between' },
  myClassContainer: { ...spacers.MA_1 },
});

ClassRooms.defaultProps = {
  myClasses: [],
};

ClassRooms.propTypes = {
  myClasses: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = (state, props) => {
  const { getMyClasses } = myClassesSelectors;
  return {
    myClasses: getMyClasses(state, props),
  };
};

export default connect(
  mapStateToProps,
  null
)(ClassRooms);
