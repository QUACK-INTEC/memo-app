import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Lodash from 'lodash';
import { Linking } from 'expo';
import LoadingState from '../../Components/LoadingState';

import PostResourcesComponent from '../../Components/PostResources';
import PostResource from '../../Components/PostResourceRecent';
import { spacers, colors, constants } from '../../Core/Theme';
import { TeacherResources as PostResourcesList } from '../../Models';
import Text from '../../Components/Common/Text';

class PostResources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      attachments: [],
      author: '',
      title: '',
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam },
    } = this.props;
    const attachments = getParam('attachments', []);
    const title = getParam('title', '');
    const author = getParam('author', '');

    this.setState({
      attachments,
      isLoading: false,
      title,
      author,
    });
  }

  openFileOnWeb = resourceURI => {
    Linking.canOpenURL(resourceURI).then(supported => {
      if (supported) {
        Linking.openURL(resourceURI);
      }
    });
  };

  handleOnPressResourceItem = objResourceID => {
    const {
      navigation: { navigate },
    } = this.props;
    const resourceURI = Lodash.get(objResourceID, ['fileURL'], null);

    if (constants.isAndroid) {
      return this.openFileOnWeb(resourceURI);
    }

    return navigate('ViewResource', {
      resourceName: Lodash.get(objResourceID, ['name'], null),
      resourceURI,
    });
  };

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  renderResource = ({ item }) => {
    return (
      <View style={styles.resourceContainer}>
        <PostResource postTitle={item.name} onPress={() => this.handleOnPressResourceItem(item)} />
      </View>
    );
  };

  renderResources = () => {
    const { attachments } = this.state;
    const postResourcesFormatted = PostResourcesList.getResourcesData(attachments);
    if (Lodash.isEmpty(attachments)) {
      return (
        <View style={styles.noResourcesContainer}>
          <LoadingState.Empty />

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
    const { isLoading, title, author } = this.state;
    return (
      <View style={styles.container}>
        <PostResourcesComponent
          postName={title}
          studentName={`${author}`}
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
