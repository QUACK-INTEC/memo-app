import React from 'react';

import Modal from 'react-native-modal';

const ModalWrapper = props => {
  const { children } = props;

  return (
    <Modal {...props} useNativeDriver>
      {children}
    </Modal>
  );
};

export default ModalWrapper;
