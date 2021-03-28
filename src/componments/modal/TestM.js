import React from 'react';
import {Button, Text, View, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';

import HeaderNav from '../HeaderNav';

const TestM = ({headerTitle, isModalVisible, toggleModal}) => {
  return (
    <Modal
      style={{margin: 0}}
      isVisible={isModalVisible}
      animationIn={'slideInDown'}
      animationOut={'slideOutUp'}
      backdropTransitionOutTiming={0}
      customBackdrop={
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>
      }>
      <View style={{flex: 1}}>
        <HeaderNav title={headerTitle} />
        <Button title="Hide modal" onPress={toggleModal} />
      </View>
    </Modal>
  );
};

export default TestM;
