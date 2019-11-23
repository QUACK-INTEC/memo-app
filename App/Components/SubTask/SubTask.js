import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors, spacers, fonts } from '../../Core/Theme';

// Common
import RadioButton from '../Common/RadioButton';

import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';

import Text from '../Common/Text';

class SubTaskComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleRadioButtonPress = (isPressed, id) => {
    const { onSubTaskPress } = this.props;
    return onSubTaskPress(isPressed, id);
  };

  // Hay un bug ahora mismo dejame eso comentado.
  /* scrollToIndex = () => {
        /*const {inverted, data} = this.props;
        if(data.length > 0)
        {      
            let index = data.length - 1;
            this.flatListRef.scrollToIndex({animated: true, index: index});
        }
      }
      componentDidUpdate(prevProps) {
        if(this.props != prevProps)
        {
            this.scrollToIndex();
        }
    } 
      */

  handleAddSubtask = () => {
    const { inputValue } = this.state;
    const { onSubTaskAdd } = this.props;

    if (!(inputValue.trim() === '')) {
      onSubTaskAdd(inputValue);
      this.setState({ inputValue: '' });
    }
  };

  render() {
    const {
      error,
      title,
      placeholder,
      data,
      maxHeight,
      inverted,
      containerStyle,
      onMoreIconPress,
    } = this.props;
    const { inputValue } = this.state;
    return (
      <View style={containerStyle}>
        <Text.SemiBold text={title} style={styles.textTitle} />
        <View style={styles.listContainer}>
          <FlatList
            onScrollToIndexFailed={() => {}}
            ref={ref => {
              this.flatListRef = ref;
            }}
            style={{ maxHeight }}
            data={data}
            inverted={inverted}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <RadioButton
                  onPress={isPressed => this.handleRadioButtonPress(isPressed, item.value)}
                  text={item.label}
                />
                <Icon
                  onPress={() => onMoreIconPress(item.value)}
                  name="ios-more"
                  type={ICON_TYPE.ION_ICONS}
                  size={ICON_SIZE.TINY}
                  color={colors.GRAY}
                />
              </View>
            )}
            keyExtractor={item => item.value}
            extraData={this.props}
          />
        </View>

        {error ? <Text.SemiBold text={error} style={styles.error} /> : null}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={this.handleAddSubtask}>
            <Icon
              name="add"
              type={ICON_TYPE.MEMO_ICONS}
              size={ICON_SIZE.TINY}
              color={colors.GRAY}
            />
          </TouchableOpacity>
          <TextInput
            onChangeText={text => this.setState({ inputValue: text })}
            value={inputValue}
            placeholder={placeholder}
            style={styles.inputStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    ...fonts.SEMI_BOLD,
    color: colors.BLACK,
    ...spacers.PA_2,
    flex: 1,
  },
  textTitle: {
    color: colors.GRAY,
    ...fonts.SIZE_L,
  },
  error: {
    color: colors.ERROR,
    ...fonts.SIZE_XS,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

SubTaskComponent.defaultProps = {
  onSubTaskAdd: () => null,
  onSubTaskPress: () => null,
  onMoreIconPress: () => null,
  data: [],
  title: 'Subtareas para este evento',
  placeholder: 'Añadir una sub tarea',
  maxHeight: null,
  inverted: false,
  containerStyle: {},
  error: null,
};

SubTaskComponent.propTypes = {
  onSubTaskAdd: PropTypes.func,
  onSubTaskPress: PropTypes.func,
  onMoreIconPress: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
  placeholder: PropTypes.string,
  maxHeight: PropTypes.number,
  inverted: PropTypes.bool,
  containerStyle: PropTypes.shape({}),
  error: PropTypes.string,
};

export default SubTaskComponent;
