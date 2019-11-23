import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import WithLogger from '../../HOCs/WithLogger';
import PostInfoForm from '../../Components/PostInfo';
import LoadingState from '../../Components/LoadingState';

class PostInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    // TODO: Get Post Info From API
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }

  handleEdit = () => {
    const {
      navigation: { push },
    } = this.props;
    push('EditPost');
  };

  goToComments = () => {
    const {
      navigation: { push },
    } = this.props;
    push('PostComments');
  };

  goToResources = () => {
    const {
      navigation: { push },
    } = this.props;
    push('PostResources');
  };

  handleUpVote = () => {
    // TODO
  };

  handleDownVote = () => {
    // TODO
  };

  handleAuthorPress = () => {
    const {
      navigation: { push },
    } = this.props;
    push('UserProfile');
  };

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  setLoading = isLoading => {
    return this.setState({ isLoading });
  };

  renderPostInfo = () => {
    return (
      <PostInfoForm
        onBackArrow={this.handleBackArrow}
        onEdit={this.handleEdit}
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
      />
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <LoadingState.Modal isVisible={isLoading} />
        {this.renderPostInfo()}
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
