import React from 'react';
import { View } from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';

import LoggerMessages, { MessagesKey } from '../../Core/LoggerMessages';
import Logger from '../../Services/Logger';
import EventForm from '../../Screens/EventForm';
import Toast from '../../Components/Common/Toast';

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

    renderToastWithoutAction = () => {
      return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <Toast ref={this.toastRef} />
        </View>
      );
    };

    render() {
      return (
        <>
          <EventForm logger={this.logger} MessagesKey={MessagesKey} />
          <WrappedComponent {...this.props} logger={this.logger} toastRef={this.toastRef} />
          {this.renderToastWithoutAction()}
        </>
      );
    }
  }
  hoistNonReactStatic(EnhancedComponent, WrappedComponent);
  return EnhancedComponent;
};

export default WithLogger;
