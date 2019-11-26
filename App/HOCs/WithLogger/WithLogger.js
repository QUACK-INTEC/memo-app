import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import LoggerMessages, { MessagesKey } from '../../Core/LoggerMessages';
import Logger from '../../Services/Logger';
import EventForm from '../../Screens/EventForm';

const WithLogger = WrappedComponent => {
  class EnhancedComponent extends React.Component { // eslint-disable-line
    constructor(objProps) {
      super(objProps);
      this.toastRef = React.createRef();
      this.objInternalOptionsLogger = {
        titleSuccessKey: 'Success',
        textSuccessOption: 'Ok',
        titleErrorKey: 'Error',
        textErrorOption: 'Ok',
        successMethod: this.handleOnSuccess,
      };
      this.loggerMessages = LoggerMessages();
      this.logger = Logger(this.loggerMessages, this.objInternalOptionsLogger);
    }

    render() {
      return (
        <>
          <EventForm logger={this.logger} MessagesKey={MessagesKey} />
          <WrappedComponent {...this.props} logger={this.logger} />
        </>
      );
    }
  }
  hoistNonReactStatic(EnhancedComponent, WrappedComponent);
  return EnhancedComponent;
};

export default WithLogger;
