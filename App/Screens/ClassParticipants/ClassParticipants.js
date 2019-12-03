import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Lodash from 'lodash';
import LoadingState from '../../Components/LoadingState';

import ClassParticipantsComponent from '../../Components/ClassParticipants';
import ParticipantCard from '../../Components/ParticipantCard';
import { spacers, colors } from '../../Core/Theme';
import { Participants } from '../../Models';
import Icon, { ICON_TYPE, ICON_SIZE } from '../../Components/Common/Icon';
import Text from '../../Components/Common/Text';

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

    if (Lodash.isEmpty(participantsFormatted)) {
      return (
        <View style={styles.noParticipantsContainer}>
          <Icon
            type={ICON_TYPE.MEMO_ICONS}
            name="moon"
            color={colors.GRAY}
            size={ICON_SIZE.EXTRA_LARGE}
          />
          <Text.Medium
            text="No hay participantes actuales en esta materia"
            style={styles.noParticipantsText}
          />
        </View>
      );
    }
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
  noParticipantsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...spacers.MB_15,
  },
  noParticipantsText: {
    color: colors.GRAY,
    ...spacers.MT_16,
    ...spacers.MB_2,
    ...spacers.ML_8,
    ...spacers.MR_8,
    textAlign: 'center',
  },
  container: { flex: 1 },
  participantContainer: { ...spacers.MA_1 },
});

export default ClassParticipants;
