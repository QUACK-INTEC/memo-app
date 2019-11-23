import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import LoadingState from '../../Components/LoadingState';

import TeacherResourcesComponent from '../../Components/TeacherResources';
import SubjectPost from '../../Components/SubjectPostRecent';
import { spacers } from '../../Core/Theme';
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
    const {
      navigation: { getParam },
    } = this.props;
    const teacherResources = getParam('teacherResources', {});
    const subjectName = getParam('subjectName', {});
    const teacherName = getParam('teacherName', {});

    this.setState({
      teacherResources,
      isLoading: false,
      subjectName,
      teacherName,
    });
  }

  handleOnPressResourceItem = objResourceID => {
    // TODO: showResource
    Alert.alert(`showResource:${objResourceID}`);
  };

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  renderResource = ({ item }) => {
    return (
      <View style={styles.resourceContainer}>
        <SubjectPost
          postTitle={item.postTitle}
          postUser={item.author}
          onPress={() => this.handleOnPressResourceItem(item.id)}
        />
      </View>
    );
  };

  renderResources = () => {
    const { teacherResources } = this.state;
    const teacherResourcesFormatted = TeacherResourcesList.getResourcesData(teacherResources);

    return (
      <FlatList
        data={teacherResourcesFormatted}
        renderItem={this.renderResource}
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
  resourceContainer: { ...spacers.MA_1, ...spacers.MR_7, ...spacers.ML_7, ...spacers.MB_7 },
});

export default TeacherResources;
