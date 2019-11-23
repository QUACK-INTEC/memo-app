import React, { Component } from 'react';
import Lodash from 'lodash';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import PostInfoForm from '../../Components/PostInfo';
import LoadingState from '../../Components/LoadingState';
import Api from '../../Core/Api';
import PopUp from '../../Components/Common/PopUp';

class PostInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      confirmationPopUpVisible: false,
      deleteConfirmationPopUpVisible: false,
      postId: null,
    };
  }

  componentDidMount() {
    // TODO: Get Post Info From API and Params from navigation
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }

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
