import React from 'react';
import { StyleSheet, SafeAreaView, Alert, View } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Lodash from 'lodash';

import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import PostInfoForm from '../../Components/PostInfo';
import LoadingState from '../../Components/LoadingState';
import Api from '../../Core/Api';
import PopUp from '../../Components/Common/PopUp';
import SubTask from '../../Components/SubTask';
import { SubTasks } from '../../Models';
import { spacers } from '../../Core/Theme';

class PostInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      confirmationPopUpVisible: false,
      deleteConfirmationPopUpVisible: false,
      postId: null,
      userSubTasks: [],
    };
  }

  componentDidMount() {
    // DEFAULT DATA FOR TESTING PURPOSES, TODO: RECEIVE REAL DATA, WILL USE WHEN CONNECT TO API
    const {
      // navigation: { getParam, pop },
      logger,
    } = this.props;
    // const authorTitle = getParam('authorName', {});
    // const postTitle = getParam('postTitle', {});
    // const postId = getParam('postId', {});
    // const authorId = getParam('authorId', {});

    Promise.all([this.getSubTasks()])
      .then(listValues => {
        const [objSubTasks] = listValues;
        const listSubTasks = Lodash.get(objSubTasks, 'data', []);
        this.setState({ userSubTasks: listSubTasks, isLoading: false });
        return logger.success({
          key: MessagesKey.LOAD_SUBTASKS_SUCCESS,
          data: listValues,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.LOAD_SUBTASKS_FAILED,
            data: objError,
          });
        }, 800);
      });
  }

  getSubTasks = () => {
    return {
      success: true,
      data: [
        {
          id: '5dcb3a143f84959c924adfa8',
          label: 'Hacer esta cosa',
          done: false,
        },
        {
          id: '5d924adfa89',
          label: 'Hacer aquella cosa',
          done: true,
        },
      ],
    };
  };

  handleEdit = () => {
    // TODO : EDIT POST
    Alert.alert('Edit Post');
  };

  deletePost = () => {
    const { logger } = this.props;
    const { postId } = this.state;
    this.setState({ isLoading: true, confirmationPopUpVisible: false });
    return Api.DeletePost(postId)
      .then(objResponse => {
        this.setState({ isLoading: false });
        const isSuccess = Lodash.get(objResponse, 'success', false);
        if (isSuccess) {
          this.setState({
            deleteConfirmationPopUpVisible: true,
          });
          return logger.success({
            key: MessagesKey.DELETE_POST_SUCCESS,
            data: objResponse,
          });
        }
        return logger.error({
          key: MessagesKey.DELETE_POST_FAILED,
          data: objResponse,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.DELETE_POST_FAILED,
            data: objError,
          });
        }, 800);
      });
  };

  showConfirmationBox = () => {
    this.setState({
      confirmationPopUpVisible: true,
    });
  };

  goToComments = () => {
    const {
      navigation: { navigate },
    } = this.props;
    return navigate('PostComments');
  };

  goToResources = () => {
    const {
      navigation: { navigate },
    } = this.props;
    return navigate('PostResources');
  };

  handleUpVote = value => {
    // TODO
    Alert.alert(`upvote: ${value}`);
  };

  handleDownVote = value => {
    // TODO
    Alert.alert(`downvote: ${value}`);
  };

  handleAuthorPress = () => {
    const {
      navigation: { navigate },
    } = this.props;
    return navigate('UserProfile');
  };

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  setLoading = isLoading => {
    return this.setState({ isLoading });
  };

  goBack = () => {
    const {
      navigation: { pop },
    } = this.props;
    this.setState({
      deleteConfirmationPopUpVisible: false,
    });
    pop();
  };

  handleSubTaskPress = (isPressed, subTaskId) => {
    // TODO: send request to api to mark as done/undone
    Alert.alert(`Press SubTask id: ${subTaskId}, checked: ${isPressed}`);
  };

  deleteSubTask = subTaskIdd => {
    // TODO: send request to api to delete SubTask
    Alert.alert(`delete SubTask id: ${subTaskIdd}`);
  };

  addSubTask = subTaskLabel => {
    // TODO: send request to api to add SubTask
    const subTaskObj = {
      id: '5d924adfa8934',
      label: subTaskLabel,
      done: false,
    };
    this.setState(prevState => ({ userSubTasks: [...prevState.userSubTasks, subTaskObj] }));
  };

  renderSubTasks = () => {
    const { userSubTasks } = this.state;
    const subtasksFormatted = SubTasks.getSubTasksData(userSubTasks);
    if (Lodash.isEmpty(subtasksFormatted)) {
      return null;
    }
    return (
      <View style={{ ...spacers.ML_3, ...spacers.MR_3 }}>
        <SubTask
          data={subtasksFormatted}
          onDeleteSubTask={this.deleteSubTask}
          onSubTaskAdd={this.addSubTask}
          onSubTaskPress={this.handleSubTaskPress}
        />
      </View>
    );
  };

  renderPostInfo = () => {
    return (
      <PostInfoForm
        onBackArrow={this.handleBackArrow}
        onEdit={this.handleEdit}
        onDelete={this.showConfirmationBox}
        onUpVote={this.handleUpVote}
        onDownVote={this.handleDownVote}
        onAuthorPress={this.handleAuthorPress}
        goToComments={this.goToComments}
        goToResources={this.goToResources}
        renderSubTasks={this.renderSubTasks}
        isAuthor
        badgeUri="https://cdn0.iconfinder.com/data/icons/usa-politics/67/45-512.png"
        initialsText="EP"
        score={12}
        className="Proyecto Final I"
        postTitle="Entrega de Informe Final"
        postDescription="Entregar project charter y un powerpoint para presentarlo en clase"
        postDate="19 Lunes, Septiembre"
        postTime="22:00"
        author="Emma Paige"
        personalScore={1}
      />
    );
  };

  render() {
    const { isLoading, confirmationPopUpVisible, deleteConfirmationPopUpVisible } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <PopUp.Info
          title="Publicación eliminada exitosamente"
          buttonText="OK"
          onButtonPress={this.goBack}
          isVisible={deleteConfirmationPopUpVisible}
        />
        <PopUp.Default
          isVisible={confirmationPopUpVisible}
          leftButtonText="Cancelar"
          rightButtonText="Si"
          title="¿Seguro que quieres eliminar esta publicación?"
          onRightPress={this.deletePost}
          onLeftPress={() => this.setState({ confirmationPopUpVisible: false })}
        />
        <LoadingState.Modal isVisible={isLoading} />
        <ActionSheetProvider>{this.renderPostInfo()}</ActionSheetProvider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WithLogger(PostInfo);
