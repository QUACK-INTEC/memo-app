import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// TODO: Implement this SafeAreaView in all other screens
import SafeAreaView from '../../Components/SafeAreaView';
import ClassesComponent from '../../Components/Classes';
import { selectors as myClassesSelectors } from '../../Redux/Common/MyClasses';
import ClassInfoCard from '../../Components/ClassInfoCard';
import { spacers } from '../../Core/Theme';
import { Classes } from '../../Models';

class ClassRooms extends React.Component {
  handleOnPressClassItem = (idSection, objSection) => {
    const {
      navigation: { navigate },
    } = this.props;

    return navigate('ClassHub', { id: idSection, sectionInfo: objSection });
  };

  renderSubject = ({ item }) => {
    return (
      <View style={styles.myClassContainer}>
        <ClassInfoCard
          subject={item.subjectName}
          professor={item.professorName}
          schedule={item.classDays}
          onPress={() => this.handleOnPressClassItem(item.id, item)}
        />
      </View>
    );
  };

  renderClasses = () => {
    const { myClasses, myClassesLookup } = this.props;
    const myClassesFormatted = Classes.getClassesData(myClasses, myClassesLookup);

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
    return (
      <SafeAreaView>
        <ClassesComponent renderClasses={this.renderClasses} />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  classesContainer: { justifyContent: 'space-between', flex: 1 },
  myClassContainer: { ...spacers.MA_1 },
});

ClassRooms.defaultProps = {
  myClasses: [],
  myClassesLookup: {},
};

ClassRooms.propTypes = {
  myClasses: PropTypes.arrayOf(PropTypes.string),
  myClassesLookup: PropTypes.shape({}),
};

const mapStateToProps = (state, props) => {
  const { getMyClasses, getMyClassesLookup } = myClassesSelectors;
  return {
    myClasses: getMyClasses(state, props),
    myClassesLookup: getMyClassesLookup(state, props),
  };
};

export default connect(
  mapStateToProps,
  null
)(ClassRooms);
