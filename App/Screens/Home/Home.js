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
import { colors, fonts, spacers } from '../../Core/Theme';
import Api, { MemoApi } from '../../Core/Api';
import WithLogger, { MessagesKey } from '../../HOCs/WithLogger';
import ClassInfoCard from '../../Components/ClassInfoCard';
import {
  actions as classesActions,
  selectors as myClassesSelectors,
} from '../../Redux/Common/MyClasses';

import {
  selectors as userManagerSelectors,
  actions as userActions,
} from '../../Redux/Common/UserManager';

import { Classes } from '../../Models';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { setMyClasses, logger, loggedIn, userToken } = this.props;

    if (loggedIn) {
      MemoApi.defaults.headers.common.Authorization = `Bearer ${userToken}`;
    }

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
    return (
      <View style={styles.myClassContainer}>
        <ClassInfoCard
          subject={item.subjectName}
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
    const { logout } = this.props;
    const { isLoading } = this.state;

    if (isLoading) return <></>;

    return (
      <View style={styles.noEventsContainer}>
        <LoadingState.NoEvents />

        <Text.Medium text="Nada para hoy" style={styles.noEventsText} />
        <Link
          text="Ver mi calendario"
          textStyle={styles.goToCalendarText}
          onPress={() => logout()}
        />
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
    ...spacers.MB_4,
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
  const { isLogged, getUserToken } = userManagerSelectors;
  return {
    myClasses: getMyClasses(state, props),
    myClassesLookup: getMyClassesLookup(state, props),
    loggedIn: isLogged(state, props),
    userToken: getUserToken(state, props),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setMyClasses: classesActions.setClasses,
      setUserToken: userActions.setUserToken,
      logout: userActions.logout,
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
