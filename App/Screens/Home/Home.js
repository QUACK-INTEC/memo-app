import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Moment from 'moment';
import Lodash from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import LoadingState from '../../Components/LoadingState';
import Text from '../../Components/Common/Text';
import Link from '../../Components/Common/Link';
import HomeComponent from '../../Components/Home';
import Icon, { ICON_TYPE, ICON_SIZE } from '../../Components/Common/Icon';
import { colors, fonts, spacers } from '../../Core/Theme';
import Api from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import ClassInfoCard from '../../Components/ClassInfoCard';
import {
  actions as classesActions,
  selectors as myClassesSelectors,
} from '../../Redux/Common/MyClasses';
import { Classes } from '../../Models';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { setMyClasses, logger } = this.props;

    Promise.all([this.getMyClasses()])
      .then(listValues => {
        this.setState({ isLoading: false });
        const [objClassResponse] = listValues;
        const listMyClasses = Lodash.get(objClassResponse, ['data', 'data'], []);
        setMyClasses(listMyClasses);
        return logger.success({
          key: MessagesKey.LOAD_EVENTS_AND_MYCLASSES_SUCCESS,
          data: listValues,
        });
      })
      .catch(objError => {
        this.setState({ isLoading: false });
        return setTimeout(() => {
          logger.error({
            key: MessagesKey.LOAD_EVENTS_AND_MYCLASSES_FAILED,
            data: objError,
          });
        }, 800);
      });
  }

  getMyClasses = () => {
    return Api.GetMyClasses();
  };

  handleOnPressClassItem = (idSection, objSection) => {
    const {
      navigation: { navigate },
    } = this.props;

    return navigate('ClassHub', { id: idSection, sectionInfo: objSection });
  };

  renderSubject = ({ item }) => {
    console.log({ item });
    return (
      <View style={styles.myClassContainer}>
        <ClassInfoCard
          subject="Falta del api"
          professor={item.professorName}
          schedule={item.classDays}
          onPress={() => this.handleOnPressClassItem(item.id, item)}
        />
      </View>
    );
  };

  renderSubjects = () => {
    const { myClasses, myClassesLookup } = this.props;
    const myClassesFormatted = Classes.getClassesData(myClasses, myClassesLookup);

    if (Lodash.isNull(myClasses) || Lodash.isEmpty(myClassesLookup)) return null;

    return (
      <FlatList
        columnWrapperStyle={styles.classesContainer}
        data={myClassesFormatted}
        numColumns={2}
        renderItem={this.renderSubject}
        keyExtractor={item => item.id}
      />
    );
  };

  renderEvents = () => {
    const { isLoading } = this.state;

    if (isLoading) return <></>;

    return (
      <View style={styles.noEventsContainer}>
        <Icon
          type={ICON_TYPE.MEMO_ICONS}
          name="moon"
          color={colors.GRAY}
          size={ICON_SIZE.EXTRA_LARGE}
        />
        <Text.Medium text="Nada para hoy" style={styles.noEventsText} />
        <Link text="Ver mi calendario" textStyle={styles.goToCalendarText} />
      </View>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <LoadingState.Modal isVisible={isLoading} />
        <HomeComponent
          actualMonth={Moment().format('MMMM YYYY')}
          renderSubjects={this.renderSubjects}
          renderEvents={this.renderEvents}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...spacers.MB_15,
    ...spacers.MT_15,
  },
  goToCalendarText: { color: colors.GREEN_LIGHT, ...fonts.SIZE_S },
  noEventsText: { color: colors.GRAY, ...spacers.MT_16, ...spacers.MB_2 },
  myClassContainer: { ...spacers.MA_1 },
  classesContainer: { justifyContent: 'space-between' },
});

Home.defaultProps = {
  myClasses: [],
  setMyClasses: () => null,
  myClassesLookup: {},
};

Home.propTypes = {
  myClasses: PropTypes.arrayOf(PropTypes.string),
  setMyClasses: PropTypes.func,
  myClassesLookup: PropTypes.shape({}),
};

const mapStateToProps = (state, props) => {
  const { getMyClasses, getMyClassesLookup } = myClassesSelectors;
  return {
    myClasses: getMyClasses(state, props),
    myClassesLookup: getMyClassesLookup(state, props),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setMyClasses: classesActions.setClasses,
    },
    dispatch
  );
};

export default WithLogger(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
