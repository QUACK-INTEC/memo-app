import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Lodash from 'lodash';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import LoadingState from '../../Components/LoadingState';

import SubjectsByTeacherComponent from '../../Components/SubjectsByTeacher';
import DescriptiveInfoCard from '../../Components/DescriptiveInfoCard';
import { spacers, colors, fonts } from '../../Core/Theme';
import { TeacherResources } from '../../Models';
import Text from '../../Components/Common/Text';

class SubjectsByTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      teacherResources: [],
      subjectName: null,
      // sectionId: null <- will use when API
    };
  }

  componentDidMount() {
    // DEFAULT DATA FOR TESTING PURPOSES, TODO: RECEIVE REAL DATA, WILL USE WHEN CONNECT TO API
    const {
      navigation: { getParam },
      logger,
    } = this.props;
    const sectionId = getParam('idSection', {});
    const subjectName = getParam('subjectName', {});

    Promise.all([this.getTeacherResources(sectionId)])
      .then(listValues => {
        const [objCommentResponse] = listValues;
        const listTeacherResources = Lodash.get(objCommentResponse, 'data', []);
        this.setState({
          teacherResources: listTeacherResources,
          isLoading: false,
          subjectName,
        });
        return logger.success({
          key: MessagesKey.LOAD_TEACHER_RESOURCES_SUCCESS,
          data: listValues,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.LOAD_TEACHER_RESOURCES_FAILED,
            data: objError,
          });
        }, 800);
      });
  }

  getTeacherResources = sectionId => {
    if (sectionId === '5dcf2caa716452c07b5395d5') {
      return {
        success: true,
        data: [
          {
            id: '1',
            teacherName: 'Renato Gonzalez',
            resources: [
              {
                id: '1',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
              {
                id: '2',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
              {
                id: '3',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
              {
                id: '4',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
              {
                id: '5',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
              {
                id: '6',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
              {
                id: '7',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
              {
                id: '8',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
              {
                id: '9',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
              {
                id: '10',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
            ],
          },
          {
            id: '2',
            teacherName: 'Renato Gonzalez Disla de la Mora Morales',
            resources: [
              {
                id: '1',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
            ],
          },
          {
            id: '3',
            teacherName: 'Renato Gonzalez',
            resources: [
              {
                id: '1',
                postTitle: 'AI For Humans',
                author: 'Emma Paige',
              },
            ],
          },
          {
            id: '4',
            teacherName: 'Renato Gonzalez',
          },
          {
            id: '5',
            teacherName: 'Renato Gonzalez',
          },
          {
            id: '6',
            teacherName: 'Renato Gonzalez Disla de la Mora Morales',
          },
          {
            id: '7',
            teacherName: 'Renato Gonzalez',
          },
          {
            id: '8',
            teacherName: 'Renato Gonzalez',
          },
          {
            id: '9',
            teacherName: 'Renato Gonzalez',
          },
          {
            id: '10',
            teacherName: 'Renato Gonzalez Disla de la Mora Morales',
          },
          {
            id: '11',
            teacherName: 'Renato Gonzalez',
          },
          {
            id: '12',
            teacherName: 'Renato Gonzalez',
          },
          {
            id: '13',
            teacherName: 'Renato Gonzalez',
          },
          {
            id: '14',
            teacherName: 'Renato Gonzalez Disla de la Mora Morales',
          },
          {
            id: '15',
            teacherName: 'Renato Gonzalez',
          },
          {
            id: '16',
            teacherName: 'Renato Gonzalez',
          },
        ],
      };
    }
    return {
      success: true,
      data: [],
    };
  };

  handleOnPressProfessorItem = objTeacherResource => {
    const {
      navigation: { navigate },
    } = this.props;
    const { subjectName } = this.state;

    return navigate('TeacherResources', {
      subjectName,
      teacherResources: objTeacherResource.resources,
      teacherName: objTeacherResource.teacherName,
    });
  };

  handleBackArrow = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  renderTeacherCard = ({ item }) => {
    return (
      <View style={styles.professorContainer}>
        <DescriptiveInfoCard
          title={item.teacherName}
          subtitle={`Ver los recursos de esta clase con el profesor ${item.teacherFirstName}`}
          onPress={() => this.handleOnPressProfessorItem(item)}
          subtitleStyle={styles.subtitle}
        />
      </View>
    );
  };

  renderProfessors = () => {
    const { teacherResources } = this.state;
    const teacherResourcesFormatted = TeacherResources.getTeachersData(teacherResources);

    if (Lodash.isEmpty(teacherResources)) {
      return (
        <View style={styles.noResourcesContainer}>
          <LoadingState.Empty />
          <Text.Medium
            text="No hay recursos disponibles para esta materia"
            style={styles.noResourcesText}
          />
        </View>
      );
    }

    return (
      <FlatList
        columnWrapperStyle={styles.professorListContainer}
        data={teacherResourcesFormatted}
        numColumns={2}
        renderItem={this.renderTeacherCard}
        keyExtractor={item => item.id}
      />
    );
  };

  render() {
    const { isLoading, subjectName } = this.state;
    return (
      <View style={styles.container}>
        <SubjectsByTeacherComponent
          subjectName={subjectName}
          renderProfessors={this.renderProfessors}
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
  professorListContainer: { justifyContent: 'space-around' },
  professorContainer: { ...spacers.MA_1 },
  subtitle: { color: colors.GRAY, ...fonts.SIZE_XXS, textAlign: 'center' },
});

export default WithLogger(SubjectsByTeacher);
