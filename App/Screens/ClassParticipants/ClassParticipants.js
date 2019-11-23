import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import LoadingState from '../../Components/LoadingState';

import ClassParticipantsComponent from '../../Components/ClassParticipants';
import ParticipantCard from '../../Components/ParticipantCard';
import { spacers } from '../../Core/Theme';
import { Participants } from '../../Models';

class ClassParticipants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      participants: [],
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam },
    } = this.props;
    const participants = getParam('participants', {});
    this.setState({ participants });
  }

  handleOnPressParticipantItem = objParticipant => {
    const {
      navigation: { navigate },
    } = this.props;

    return navigate('ViewProfile', { userId: objParticipant.id, user: objParticipant });
  };

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  renderParticipantCard = ({ item }) => {
    return (
      <View style={styles.participantContainer}>
        <ParticipantCard
          participantName={item.fullName}
          avatarUri={item.avatarUrl}
          initialsText={item.initials}
          badgeUri={item.badgeUri}
          onPress={() => this.handleOnPressParticipantItem(item)}
        />
      </View>
    );
  };

  renderParticipants = () => {
    const { participants } = this.state;
    const participantsFormatted = Participants.getParticipantsData(participants);

    return (
      <FlatList
        data={participantsFormatted}
        numColumns={1}
        renderItem={this.renderParticipantCard}
        keyExtractor={item => item.id}
      />
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        <ClassParticipantsComponent
          renderParticipants={this.renderParticipants}
          onBackArrow={this.handleBackArrow}
        />
        <LoadingState.Modal isVisible={isLoading} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  participantContainer: { ...spacers.MA_1 },
});

export default ClassParticipants;
