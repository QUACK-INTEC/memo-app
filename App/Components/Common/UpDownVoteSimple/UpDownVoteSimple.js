import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors } from '../../../Core/Theme';

// Common
import Icon, { ICON_TYPE, ICON_SIZE } from '../Icon';

class UpDownVoteSimple extends React.Component {
  constructor(props) {
    super(props);
    const { score } = this.props;
    this.state = {
      isUpVote: score && score > 0,
      isDownVote: score && score < 0,
    };
  }

  handleUpVote = () => {
    const { onUpVote, onRemoveUpVote } = this.props;
    const { isUpVote } = this.state;
    this.setState({ isUpVote: !isUpVote, isDownVote: false });

    if (!isUpVote) {
      return onUpVote();
    }

    return onRemoveUpVote();
  };

  handleDownVote = () => {
    const { onDownVote, onRemoveDownVote } = this.props;
    const { isDownVote } = this.state;
    this.setState({ isUpVote: false, isDownVote: !isDownVote });
    if (!isDownVote) {
      return onDownVote();
    }

    return onRemoveDownVote();
  };

  render() {
    const { isUpVote, isDownVote } = this.state;
    return (
      <View>
        <Icon
          name="chevron-up"
          type={ICON_TYPE.FONT_AWESOME}
          size={ICON_SIZE.TINY}
          color={isUpVote ? colors.GREEN : colors.GRAY_LIGHT}
          onPress={this.handleUpVote}
        />
        <Icon
          name="chevron-down"
          type={ICON_TYPE.FONT_AWESOME}
          size={ICON_SIZE.TINY}
          color={isDownVote ? 'red' : colors.GRAY_LIGHT}
          onPress={this.handleDownVote}
        />
      </View>
    );
  }
}

UpDownVoteSimple.defaultProps = {
  onUpVote: () => null,
  onRemoveUpVote: () => null,
  onDownVote: () => null,
  onRemoveDownVote: () => null,
  score: null,
};

UpDownVoteSimple.propTypes = {
  onUpVote: PropTypes.func,
  onRemoveUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  onRemoveDownVote: PropTypes.func,
  score: PropTypes.number,
};

export default UpDownVoteSimple;
