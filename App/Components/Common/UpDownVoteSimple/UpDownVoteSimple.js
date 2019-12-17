import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

// Theme
import { colors } from '../../../Core/Theme';

// Common
import Icon, { ICON_TYPE, ICON_SIZE } from '../Icon';

class UpDownVoteSimple extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.score !== props.score) {
      return {
        isUpVote: props.score != null ? props.score > 0 : false,
        isDownVote: props.score != null ? props.score < 0 : false,
        score: props.score,
      };
    }
    return null;
  }

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
    const { isUpVote } = this.state;
    const isReaction = !isUpVote;
    onUpVote(isReaction).then(success => {
      if (success) {
        if (isReaction) {
          this.setState({
            isDownVote: false,
            isUpVote: true,
          });
        } else {
          this.setState({
            isDownVote: false,
            isUpVote: false,
          });
        }
      }
    });
  };

  handleDownVote = () => {
    const { onDownVote } = this.props;
    const { isDownVote } = this.state;
    const isReaction = !isDownVote;
    onDownVote(isReaction).then(success => {
      if (success) {
        if (isReaction) {
          this.setState({
            isDownVote: true,
            isUpVote: false,
          });
        } else {
          this.setState({
            isDownVote: false,
            isUpVote: false,
          });
        }
      }
    });
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
