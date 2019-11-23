import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import Lodash from 'lodash';
import LoadingState from '../../Components/LoadingState';

import TeacherResourcesComponent from '../../Components/TeacherResources';
import SubjectPost from '../../Components/SubjectPostRecent';
import { spacers, colors, fonts } from '../../Core/Theme';
import { TeacherResources as TeacherResourcesList } from '../../Models';

class TeacherResources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      teacherResources: [],
      teacherName: null,
      subjectName: null,
    };
  }

  componentDidMount() {
    // DEFAULT DATA FOR TESTING PURPOSES, TODO: RECEIVE REAL DATA, WILL USE WHEN CONNECT TO API
    const {
      navigation: { getParam },
    } = this.props;
    const teacherResources = getParam('teacherResources', {});
    const subjectName = getParam('subjectName', {});
    const teacherName = getParam('teacherName', {});

    const listTeacherResources = Lodash.get(teacherResources, 'data', []);
    this.setState({
      teacherResources: listTeacherResources,
      isLoading: false,
      subjectName,
      teacherName,
    });
  }

  handleOnPressResourceItem = objResourceID => {
    // TODO: showResource
    Alert.alert(`goToTeacher:${objResourceID}`);
  };

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  renderTeacherCard = ({ item }) => {
    return (
      <View style={styles.resourceContainer}>
        <SubjectPost
          postTitle={item.postTitle}
          postUser={item.author}
          onPress={() => this.handleOnPressResourceItem(item.id)}
          subtitleStyle={styles.subtitle}
        />
      </View>
    );
  };

  renderResources = () => {
    const { teacherResources } = this.state;
    const teacherResourcesFormatted = TeacherResourcesList.getResourcesData(teacherResources);

    return (
      <FlatList
        columnWrapperStyle={styles.resourceListContainer}
        data={teacherResourcesFormatted}
        numColumns={2}
        renderItem={this.renderTeacherCard}
        keyExtractor={item => item.id}
      />
    );
  };

  render() {
    const { isLoading, subjectName, teacherName } = this.state;
    return (
      <View style={styles.container}>
        <TeacherResourcesComponent
          subjectName={subjectName}
          teacherName={teacherName}
          renderResources={this.renderResources}
          onBackArrow={this.handleBackArrow}
        />
        <LoadingState.Modal isVisible={isLoading} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  resourceListContainer: { justifyContent: 'space-around' },
  resourceContainer: { ...spacers.MA_1 },
  subtitle: { color: colors.GRAY, ...fonts.SIZE_XXS, textAlign: 'center' },
});

export default TeacherResources;
