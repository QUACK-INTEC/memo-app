import React from 'react';
import { View, ViewPropTypes, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';

import * as DocumentPicker from 'expo-document-picker';

// Theme
import { fonts, colors, toBaseDesignPx, spacers } from '../../Core/Theme';

// Common
import Text from '../Common/Text';
import InLineComponent from '../Common/InLineComponent';

import Icon, { ICON_TYPE, ICON_SIZE } from '../Common/Icon';

import FilePile from './FilePill';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({ value: data });
  }

  handleAlert = id => {
    Alert.alert(
      'Borrando Archivo',
      'Seguro que quiere borrar este archivo?',
      [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Si', onPress: () => this.deleteItem(id) },
      ],
      { cancelable: false }
    );
  };

  pickDocument = async () => {
    const { value } = this.state;

    const { onChange } = this.props;
    const newData = value;
    const result = await DocumentPicker.getDocumentAsync({});

    const { uri, name } = result;
    const nameseparator = name.split('.');
    const [resultName, resultType] = nameseparator;

    const index = newData.findIndex(x => x.name === resultName);
    if (index < 0) {
      const item = {};
      item.name = resultName;
      item.type = resultType;
      item.uri = uri;
      newData.push(item);
      this.setState({ value: newData });
      onChange(newData);
    } else {
      // TO-DO documento repetido
    }
  };

  deleteItem = id => {
    const { value } = this.state;

    const { onChange } = this.props;
    const newData = value;
    const index = newData.findIndex(x => x.uri === id);
    newData.splice(index, 1);
    this.setState({ value: newData });

    onChange(newData);
  };

  addItem = () => {
    this.pickDocument();
  };

  renderErrorLabel = () => {
    const { hasError, strError } = this.props;

    if (!hasError) {
      return null;
    }

    return (
      <Text.ItalicLight
        text={`${strError}*`}
        style={{ color: colors.ERROR, ...spacers.ML_1, ...fonts.SIZE_XS }}
      />
    );
  };

  renderLabel = () => {
    const { label, labelStyle, hasError } = this.props;
    const errorLabelStyle = hasError ? styles.errorLabelStyle : null;

    if (label) {
      return (
        <InLineComponent>
          <View>
            <Text.SemiBold
              text={label}
              style={[this.getLabelStyle(), errorLabelStyle, labelStyle]}
            />
          </View>
          {this.renderErrorLabel()}
        </InLineComponent>
      );
    }

    return null;
  };

  getLabelStyle = () => {
    const { disabled } = this.props;

    if (disabled) {
      return styles.textTitleDisabled;
    }

    return styles.textTitle;
  };

  render() {
    const { style, disabled, containerStyle, hasError } = this.props;
    const { value } = this.state;
    const errorStyle = hasError ? styles.errorStyle : null;
    if (disabled) return null;
    return (
      <View style={[styles.mainView, errorStyle, containerStyle]}>
        {this.renderLabel()}
        <View style={{ flexDirection: 'row' }}>
          <FlatList
            onScrollToIndexFailed={() => {}}
            ref={ref => {
              this.flatListRef = ref;
            }}
            style={style}
            data={value}
            renderItem={({ item }) => (
              <FilePile
                id={item.uri}
                documentText={item.name}
                documentType={item.type}
                onPress={this.handleAlert}
              />
            )}
            horizontal
            keyExtractor={item => `${item.uri}`}
            extraData={this.state}
            showsHorizontalScrollIndicator={false}
          />
          <TouchableOpacity onPress={this.addItem} style={{ margin: 5, marginLeft: 10 }}>
            <Icon
              name="add"
              type={ICON_TYPE.MEMO_ICONS}
              size={ICON_SIZE.TINY}
              color={colors.GRAY}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    borderBottomWidth: toBaseDesignPx(2),
    borderColor: colors.GRAY_LIGHT,
  },
  inputContainer: {},
  errorStyle: {
    borderBottomWidth: toBaseDesignPx(2),
    borderColor: colors.ERROR,
  },
  errorLabelStyle: {
    color: colors.ERROR,
  },
  textTitle: {
    color: colors.GRAY,
    ...fonts.SIZE_L,
  },
  textTitleDisabled: {
    color: colors.GRAY_LIGHT,
    ...fonts.SIZE_L,
  },
});

FileInput.defaultProps = {
  onChange: () => [],
  label: null,
  labelStyle: null,
  disabled: false,
  hasError: false,
  style: null,
  containerStyle: null,
  strError: null,
  data: [],
};

FileInput.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelStyle: PropTypes.shape({}),
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  hasError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  strError: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired,
    })
  ),
};

export default FileInput;
