import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import Lodash from 'lodash';
import LoadingState from '../../Components/LoadingState';

import TeacherResourcesComponent from '../../Components/TeacherResources';
import SubjectPost from '../../Components/SubjectPostRecent';
import { spacers, colors } from '../../Core/Theme';
import { TeacherResources as TeacherResourcesList } from '../../Models';
import Icon, { ICON_TYPE, ICON_SIZE } from '../../Components/Common/Icon';
import Text from '../../Components/Common/Text';

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
    if (Lodash.isEmpty(teacherResources)) {
      return (
        <View style={styles.noResourcesContainer}>
          <Icon
            type={ICON_TYPE.MEMO_ICONS}
            name="moon"
            color={colors.GRAY}
            size={ICON_SIZE.EXTRA_LARGE}
          />
          <Text.Medium
            text="No hay recursos disponibles para este profesor"
            style={styles.noResourcesText}
          />
        </View>
      );
    }
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
  noResourcesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...spacers.MB_15,
  },
  noResourcesText: {
    color: colors.GRAY,
    ...spacers.MT_16,
    ...spacers.MB_2,
    ...spacers.ML_8,
    ...spacers.MR_8,
    textAlign: 'center',
  },
  container: { flex: 1 },
  resourceContainer: { ...spacers.MA_1, ...spacers.MR_7, ...spacers.ML_7, ...spacers.MB_7 },
});

export default TeacherResources;
