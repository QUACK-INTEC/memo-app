import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import Lodash from 'lodash';
import LoadingState from '../../Components/LoadingState';

import PostResourcesComponent from '../../Components/PostResources';
import SubjectPost from '../../Components/SubjectPostRecent';
import { spacers, colors } from '../../Core/Theme';
import { TeacherResources as PostResourcesList } from '../../Models';
import Icon, { ICON_TYPE, ICON_SIZE } from '../../Components/Common/Icon';
import Text from '../../Components/Common/Text';

class PostResources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      postResources: [],
      studentName: 'Victor Diaz',
      postName: 'Entrega Asignacion',
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam },
    } = this.props;
    const postResources = getParam('postResources', {});
    const postName = getParam('postName', {});
    const studentName = getParam('studentName', {});

    this.setState({
      postResources,
      isLoading: false,
      postName,
      studentName,
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
    const { postResources } = this.state;
    const postResourcesFormatted = PostResourcesList.getResourcesData(postResources);
    if (Lodash.isEmpty(postResources)) {
      return (
        <View style={styles.noResourcesContainer}>
          <Icon
            type={ICON_TYPE.MEMO_ICONS}
            name="moon"
            color={colors.GRAY}
            size={ICON_SIZE.EXTRA_LARGE}
          />
          <Text.Medium
            text="No hay recursos disponibles para esta publicación"
            style={styles.noResourcesText}
          />
        </View>
      );
    }
    return (
      <FlatList
        data={postResourcesFormatted}
        renderItem={this.renderResource}
        keyExtractor={item => item.id}
      />
    );
  };

  render() {
    const { isLoading, postName, studentName } = this.state;
    return (
      <View style={styles.container}>
        <PostResourcesComponent
          subjectName={postName}
          teacherName={studentName}
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

export default PostResources;
