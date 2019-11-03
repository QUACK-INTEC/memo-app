import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RegisterComponent from '../../Components/Register';

// TODO: Implement ImagePicker component
class Register extends Component {
  handleSubmit = objValues => {
    // TODO: Logic create account
    return objValues;
  };

  render() {
    const { initialsValue } = this.props;
    return <RegisterComponent onSubmit={this.handleSubmit} initialsValue={initialsValue} />;
  }
}

Register.defaultProps = {
  initialsValue: null,
};

Register.propTypes = {
  initialsValue: PropTypes.shape({}),
};

export default Register;
