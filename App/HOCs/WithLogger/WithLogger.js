/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
import React from 'react';
import { View } from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { Notifications } from 'expo';
import NotificationPopup from 'react-native-push-notification-popup';

import { MEMO_ASSETS } from '../../Components/Common/ImageWrapper';
import LoggerMessages, { MessagesKey } from '../../Core/LoggerMessages';
import Logger from '../../Services/Logger';
import EventForm from '../../Screens/EventForm';
import Toast from '../../Components/Common/Toast';

const WithLogger = WrappedComponent => {
  class EnhancedComponent extends React.Component { // eslint-disable-line
    constructor(objProps) {
      super(objProps);
      this.toastRef = React.createRef();
      this.popup = React.createRef();
      this.objInternalOptionsLogger = {
        titleSuccessKey: 'Success',
        textSuccessOption: 'Ok',
        titleErrorKey: 'Error',
        textErrorOption: 'Ok',
        successMethod: this.handleOnSuccess,
      };
      this.loggerMessages = LoggerMessages();
      this.logger = Logger(this.loggerMessages, this.objInternalOptionsLogger);
      this.notificationSubscription = Notifications.addListener(this.handleNotification);
    }

    handleNotification = notification => {
      if (this.popup) {
        this.popup.show({
          onPress: () => this.handleOnNotificationPopUpPress(notification),
          appIconSource: MEMO_ASSETS.ICON,
          appTitle: 'Nueva publicación',
          timeText: 'Now',
          title: '[Aqui va el nombre de la materia]',
          body: 'Se ha creado una nueva publicacion para esta materia!😀',
          slideOutTime: 4000,
        });
      }
    };

    handleOnNotificationPopUpPress = notification => {
      return null;
    };

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
          <EventForm logger={this.logger} MessagesKey={MessagesKey} toastRef={this.toastRef} />
          <WrappedComponent {...this.props} logger={this.logger} toastRef={this.toastRef} />
          {this.renderToastWithoutAction()}
          <NotificationPopup ref={ref => (this.popup = ref)} />
        </>
      );
    }
  }
  hoistNonReactStatic(EnhancedComponent, WrappedComponent);
  return EnhancedComponent;
};

export default WithLogger;
