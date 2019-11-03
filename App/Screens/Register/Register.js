import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RegisterComponent from '../../Components/Register';

// TODO: Logic create account
class Register extends Component {
  handleSubmit = objValues => {
    // console.log({ objValues });
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
