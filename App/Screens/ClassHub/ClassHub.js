import React from 'react';
import { connect } from 'react-redux';
import Lodash from 'lodash';

import ClassHubComponent from '../../Components/ClassHub';
import Api from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import Text from '../../Components/Common/Text';
import { selectors as myClassesSelectors } from '../../Redux/Common/MyClasses';
import { fonts, colors } from '../../Core/Theme';

class ClassHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      professorName: null,
      classRoom: null,
      code: null,
      className: null,
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam, pop },
      logger,
    } = this.props;
    const objSectionInfo = getParam('sectionInfo', {});
    const idSection = getParam('id', {});
    const professorName = Lodash.get(objSectionInfo, ['professorName'], '');
    const classRoom = Lodash.get(objSectionInfo, ['classRoom'], '');
    const className = Lodash.get(objSectionInfo, ['className'], '');
    const code = Lodash.get(objSectionInfo, ['code'], '');
    this.setState({
      professorName,
      classRoom,
      code,
      className,
    });
    Promise.all([this.getSectionStudents(idSection)])
      .then(listValues => {
        const [objSectionStudentsResponse] = listValues;
        const listStudents = Lodash.get(objSectionStudentsResponse, ['data', 'data'], []);
        this.setState({
          students: listStudents.length,
        });
        return logger.success({
          key: MessagesKey.LOAD_SECTION_INFO_SUCCESS,
          data: listValues,
        });
      })
      .catch(objError => {
        pop();
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.LOAD_SECTION_INFO_FAILED,
            data: objError,
          });
        }, 800);
      });
  }

  getSectionStudents = idSection => {
    return Api.GetSectionStudents(idSection);
  };

  handleOnPressBackArrow = () => {
    const {
      navigation: { pop },
    } = this.props;
    pop();
  };

  handleOnPressGoToEvents = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Calendar');
  };

  renderScheduleClass = () => {
    const {
      navigation: { getParam },
    } = this.props;
    const objSectionInfo = getParam('sectionInfo', {});
    const objScheduleSection = Lodash.get(objSectionInfo, ['schedule'], {});

    return Object.keys(objScheduleSection).map(strScheduleKey => {
      const { from, to } = objScheduleSection[strScheduleKey];
      return (
        <Text.Medium
          key={`${strScheduleKey} ${from}:00 - ${to}:00`}
          text={`${strScheduleKey} ${from}:00 - ${to}:00`}
          style={{ ...fonts.SIZE_L, color: colors.WHITE }}
        />
      );
    });
  };

  renderClassHubComponent = () => {
    const { professorName, students, classRoom, code, className } = this.state;
    return (
      <ClassHubComponent
        subjectName={className}
        subjectTeacher={professorName}
        subjectRoom={classRoom}
        subjectSection={code}
        renderSubjectSchedule={this.renderScheduleClass}
        subjectStudents={students}
        onPressGoToEvents={this.handleOnPressGoToEvents}
        onBackArrowPress={this.handleOnPressBackArrow}
      />
    );
  };

  render() {
    return this.renderClassHubComponent();
  }
}

const mapStateToProps = (state, props) => {
  const { getMyClassesLookup } = myClassesSelectors;
  return {
    myClassesLookup: getMyClassesLookup(state, props),
  };
};

export default WithLogger(
  connect(
    mapStateToProps,
    null
  )(ClassHub)
);
