import _ from 'lodash';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import HeaderNav from '../../componments/HeaderNav';
import themeColor from '../../utils/theme';
import { addType } from '../../actions/TypesAction';
import { ALL_ICON, OPERATOR_TYPE } from '../../config';

const INITIAL_VALUE = {
  label: '',
  color: '#fff',
  operator: OPERATOR_TYPE.COST,
  icon: 'add',
};

const styles = StyleSheet.create({
  root: { backgroundColor: themeColor.background, flex: 1 },
  listContent: {
    paddingHorizontal: 20,
  },
  listContentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  listContentRowText: {
    fontSize: 20,
    paddingVertical: 10,
  },
  listContentRowInput: {
    fontSize: 20,
    flex: 1,
    textAlign: 'right',
  },
  typeBlock: {
    flexDirection: 'row',
  },
  typeBlockItem: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
  typeBlockItemActive: { backgroundColor: '#a2a2a2' },
  typeBlockItemText: {
    fontSize: 17,
  },

  modalHeader: {},
  modalContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentPress: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalContentIcon: {},
});

const CreateTypeScreen = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState(INITIAL_VALUE);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const updateType = (key, value) => {
    setType((type) => ({ ...type, [key]: value }));
    if (key === 'icon') toggleModal();
  };

  const onSubmit = () => {
    console.log(type);
    dispatch(addType(type)).then(() => {
      setType(INITIAL_VALUE);
    });
    alert('新增成功');
  };

  return (
    <SafeAreaView style={styles.root}>
      <HeaderNav title="新增分類" goBack />
      <View style={styles.listContent}>
        <View style={styles.listContentRow}>
          <Text style={styles.listContentRowText}>名稱</Text>
          <TextInput
            value={type.label}
            style={styles.listContentRowInput}
            placeholder="請輸入分類名稱"
            onChangeText={(value) => updateType('label', value)}
          />
        </View>
        <View style={styles.listContentRow}>
          <Text style={styles.listContentRowText}>類型</Text>
          <View style={styles.typeBlock}>
            <TouchableOpacity
              style={[
                styles.typeBlockItem,
                type.operator === OPERATOR_TYPE.INCOME && styles.typeBlockItemActive,
              ]}
              onPress={() => updateType('operator', OPERATOR_TYPE.INCOME)}
            >
              <Text style={styles.typeBlockItemText}>收入</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeBlockItem,
                type.operator === OPERATOR_TYPE.COST && styles.typeBlockItemActive,
              ]}
              onPress={() => updateType('operator', OPERATOR_TYPE.COST)}
            >
              <Text style={styles.typeBlockItemText}>支出</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listContentRow}>
          <Text style={styles.listContentRowText}>圖示</Text>
          <TouchableOpacity
            style={{
              width: 100,
              height: 35,
            }}
            onPress={toggleModal}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name={type.icon} size={30} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.listContentRow}>
          <Text style={styles.listContentRowText}>顏色</Text>
          <TextInput
            value={type.color}
            style={styles.listContentRowInput}
            placeholder="請輸入顏色色碼"
            onChangeText={(value) => updateType('color', value)}
          />
        </View>
        <Button title="送出" onPress={onSubmit} />
      </View>
      <Modal isVisible={isModalVisible} backdropOpacity={0}>
        <View style={{ backgroundColor: 'white', margin: 0 }}>
          <View style={styles.modalContent}>
            {_.map(ALL_ICON, (iconName) => (
              <TouchableOpacity
                key={iconName}
                style={styles.modalContentPress}
                onPress={() => updateType('icon', iconName)}
              >
                <Ionicons name={iconName} size={50} style={styles.modalContentIcon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CreateTypeScreen;
