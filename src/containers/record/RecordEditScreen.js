import moment from 'moment';
import _ from 'lodash';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';

import { addRecord, updateRecord } from '../../actions/recordsAction';

import HeaderNav from '../../componments/HeaderNav';
import Calculator from '../../componments/Calculator';
import themeColor from '../../utils/theme';

const INIT_RECORD = {
  datetime: moment().format('YYYY-MM-DD HH:mm'),
  type: '',
  money: 0,
  wallet: '',
  note: '',
  equation: '',
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: {
    flex: 1,
    backgroundColor: themeColor.background,
  },
  amountSection: {
    height: 80,
    justifyContent: 'center',
  },
  amount: {
    fontSize: 40,
    textAlign: 'right',
    color: '#525252',
  },
  amountEquation: {
    fontSize: 25,
    textAlign: 'right',
    color: '#ceaf57',
  },
  walletSection: {
    flexDirection: 'row',
  },
  wallet: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    height: 50,
    padding: 5,
  },
  walletLabel: {
    fontSize: 18,
  },
  typeSection: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  type: {
    width: '25%',
    padding: 15,
  },
  typeLabel: {
    textAlign: 'center',
    fontSize: 18,
  },
  active: {
    backgroundColor: 'gray',
  },
});

const RecordEditScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);
  const allWallets = useSelector((state) => state.wallets);

  const editMode = route.params.record ? true : false;
  const screenTitle = editMode ? '編輯紀錄' : '新增紀錄';
  const _record = editMode
    ? { ...INIT_RECORD, ...route.params.record }
    : { ...INIT_RECORD, wallet: allWallets[0].label, type: allTypes[0].label };
  _record.datetime = route.params.date;

  const [record, setRecord] = useState(_record);
  const [walletModal, setWalletModal] = useState(false);

  const handleMoneyCalculate = () => {
    if (editMode) {
      dispatch(updateRecord(record));
      Alert.alert('更新成功');
    } else {
      dispatch(addRecord(record));
      Alert.alert('新增成功');
    }
    setRecord((r) => ({
      ...r,
      money: 0,
      note: '',
      equation: '',
    }));
  };

  const AmountMoneySection = () => {
    const isExistOperater = _.some(['+', '-'], (op) => record.equation.includes(op));
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity style={styles.wallet} onPress={() => setWalletModal(!walletModal)}>
          <Text style={styles.walletLabel}>{record.wallet}</Text>
        </TouchableOpacity>
        <View style={styles.amountSection}>
          {isExistOperater && <Text style={styles.amountEquation}>{record.equation}</Text>}
          <Text style={styles.amount}>{record.money}</Text>
        </View>
      </View>
    );
  };

  const RecordTypeList = () => {
    return (
      <View style={styles.typeSection}>
        {_.map(allTypes, (type, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.type, record.type === type.label && { ...styles.active }]}
            onPress={() => setRecord((record) => ({ ...record, type: type.label }))}
          >
            <Text style={styles.typeLabel}>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <HeaderNav title={screenTitle} goBack />
        <AmountMoneySection />
        <RecordTypeList />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 20 }}
          onChangeText={(note) =>
            setRecord((record) => ({
              ...record,
              note,
            }))
          }
          value={record.note}
        />
      </KeyboardAvoidingView>
      <Calculator
        mathStack={record.equation.split('')}
        setRecord={setRecord}
        handleMoneyCalculate={handleMoneyCalculate}
      />
      <Modal
        isVisible={walletModal}
        backdropOpacity={0.2}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setWalletModal(false)}
        ></TouchableOpacity>
        <View style={{ backgroundColor: 'white', paddingBottom: 50 }}>
          <TouchableOpacity onPress={() => setWalletModal(false)}>
            <Text style={{ textAlign: 'right', fontSize: 25, padding: 20 }}>X</Text>
          </TouchableOpacity>
          {_.map(allWallets, (wallet) => (
            <TouchableOpacity
              key={wallet.label}
              style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}
              onPress={() => {
                setRecord((record) => ({ ...record, wallet: wallet.label }));
                setWalletModal(false);
              }}
            >
              <Text style={styles.walletLabel}>{wallet.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RecordEditScreen;
