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
    const { onUpVote } = this.props;
    this.setState(
      prevState => ({ isUpVote: !prevState.isUpVote, isDownVote: false }),
      () => {
        const { isUpVote } = this.state;
        return onUpVote(isUpVote);
      }
    );
  };

  handleDownVote = () => {
    const { onDownVote } = this.props;

    this.setState(
      prevState => ({ isUpVote: false, isDownVote: !prevState.isDownVote }),
      () => {
        const { isDownVote } = this.state;
        return onDownVote(isDownVote);
      }
    );
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
  onDownVote: () => null,
  score: null,
};

UpDownVoteSimple.propTypes = {
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  score: PropTypes.number,
};

export default UpDownVoteSimple;
