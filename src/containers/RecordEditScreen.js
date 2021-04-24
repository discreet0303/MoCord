import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import moment from 'moment';
import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import { addRecord, updateRecord } from '../actions/recordsAction';

import HeaderNav from '../componments/HeaderNav';
import Calculator from '../componments/Calculator';

const INIT_RECORD = {
  datetime: moment().format('YYYY-MM-DD HH:mm'),
  type: '',
  money: 0,
  wallet: '',
  note: '',
  equation: '',
};

const styles = StyleSheet.create({
  root: { height: '100%' },
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
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  walletLabel: {
    fontSize: 18,
    padding: 10,
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
  _record.datetime = route.params.date ?? _record.datetime;

  const [record, setRecord] = useState(_record);

  const handleMoneyCalculate = () => {
    if (editMode) {
      dispatch(updateRecord(record));
      Alert.alert('更新成功');
    } else {
      dispatch(addRecord(record));
      Alert.alert('新增成功');
    }
    setRecord({ ...INIT_RECORD, wallet: allWallets[0].label, type: allTypes[0].label });
  };

  const AmountMoneyText = () => {
    const isExistOperater = _.some(['+', '-'], (op) => record.equation.includes(op));
    return (
      <View style={styles.amountSection}>
        {isExistOperater && <Text style={styles.amountEquation}>{record.equation}</Text>}
        <Text style={styles.amount}>{record.money}</Text>
      </View>
    );
  };

  const WalletList = () => {
    return (
      <View style={styles.walletSection}>
        {_.map(allWallets, (wallet) => (
          <TouchableOpacity
            key={wallet.label}
            style={[styles.wallet, record.wallet === wallet.label && { ...styles.active }]}
            onPress={() => setRecord((record) => ({ ...record, wallet: wallet.label }))}
          >
            <Text style={styles.walletLabel}>{wallet.label}</Text>
          </TouchableOpacity>
        ))}
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
      <HeaderNav title={screenTitle} goBack />
      <AmountMoneyText />
      <WalletList />
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
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Calculator
          mathStack={record.equation.split('')}
          setRecord={setRecord}
          handleMoneyCalculate={handleMoneyCalculate}
        />
      </View>
    </SafeAreaView>
  );
};

export default RecordEditScreen;
