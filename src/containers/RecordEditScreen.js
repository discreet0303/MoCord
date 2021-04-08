import React, {useState} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {addRecord, updateRecord} from '../actions/recordsAction';

import HeaderNav from '../componments/HeaderNav';
import Calculator from '../componments/Calculator';

const RECORD_INIT = {
  datetime: moment().format('YYYY-MM-DD HH:mm'),
  type: '食物',
  money: 0,
  wallet: '錢包',
  note: '',
};

const styles = StyleSheet.create({
  recordTypeItem: {
    width: '25%',
  },
  recordTypeItemActive: {
    width: '25%',
    backgroundColor: 'gray',
  },
  recordTypeItemInactive: {
    width: '25%',
  },
  recordTypeText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 45,
    fontSize: 20,
  },
  numberRoot: {
    // flex: 1,
    // justifyContent: 'flex-end',
  },
});

const RecordEditScreen = ({navigation, route}) => {
  const _mode = _.has(route.params, 'record') ? true : false;
  const screenTitle = _.has(route.params, 'record') ? '編輯紀錄' : '新增紀錄';

  const _record = _mode ? route.params.record : RECORD_INIT;
  const _mathStack = _mode ? _.split(route.params.record.money) : [];

  _record.datetime = _.has(route.params, 'date')
    ? moment(route.params.date).format('YYYY-MM-DD HH:mm')
    : _record.datetime;

  const [recordData, setRecordData] = useState(_record);
  const [mathStack, setMathStack] = useState(_mathStack);
  const dispatch = useDispatch();
  const recordTypes = useSelector((state) => state.types);
  const recordWallets = useSelector((state) => state.wallets);

  React.useEffect(() => {
    setRecordData((data) => {
      const money = mathCalculate(mathStack);
      return {
        ...data,
        money,
      };
    });
  }, [mathStack]);

  const recordHandler = () => {
    if (recordData.money === 0) return;
    if (_mode) {
      dispatch(updateRecord(recordData));
      Alert.alert(
        '更新成功',
        '',
        [
          {
            text: '好',
            onPress: () => navigation.navigate('RecordList'),
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => navigation.navigate('RecordList'),
        },
      );
    } else {
      dispatch(addRecord(recordData));
      setRecordData(RECORD_INIT);
      setMathStack([]);
      Alert.alert('新增成功');
    }
  };

  const renderMoneySection = () => {
    const isExistOperater = _.intersection(['+', '-', 'x', '/'], mathStack);
    return (
      <View
        style={{
          height: 80,
          justifyContent: 'center',
          marginRight: 10,
        }}>
        {isExistOperater.length > 0 ? (
          <>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'right',
                color: '#ceaf57',
              }}>
              {_.join(mathStack, '')}
            </Text>
            <Text
              style={{
                fontSize: 40,
                textAlign: 'right',
                marginTop: -10,
                color: '#525252',
              }}>
              ${recordData.money}
            </Text>
          </>
        ) : (
          <Text
            style={{
              fontSize: 45,
              textAlign: 'right',
              color: '#525252',
            }}>
            ${recordData.money}
          </Text>
        )}
      </View>
    );
  };

  const renderWalletSection = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{marginBottom: 3}}>
      {_.map(recordWallets, (wallet) => (
        <TouchableOpacity
          key={wallet.id}
          onPress={() =>
            setRecordData((record) => ({
              ...record,
              wallet: wallet.label,
            }))
          }
          style={[
            {
              height: 40,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#000',
              marginHorizontal: 10,
            },
            recordData.wallet === wallet.label && {backgroundColor: '#999999'},
          ]}>
          <Text>{wallet.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <>
      <HeaderNav title={screenTitle} goBack />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={-200}>
        {renderMoneySection()}
        {renderWalletSection()}
        {_.map(_.chunk(recordTypes, 4), (rowData, rowIdx) => {
          return (
            <View key={rowIdx} style={{flexDirection: 'row'}}>
              {_.map(rowData, (recordItem, recordItemIdx) => (
                <TouchableOpacity
                  key={recordItemIdx}
                  style={[
                    styles.recordTypeItem,
                    recordData.type == recordItem.label
                      ? styles.recordTypeItemActive
                      : styles.recordTypeItemInactive,
                  ]}
                  onPress={() =>
                    setRecordData((record) => ({
                      ...record,
                      type: recordItem.label,
                    }))
                  }>
                  <Text style={[styles.recordTypeText]}>
                    {recordItem.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
        <TextInput
          style={{borderColor: 'gray', borderWidth: 1, fontSize: 20}}
          onChangeText={(note) =>
            setRecordData((record) => ({
              ...record,
              note,
            }))
          }
          value={recordData.note}
        />
        <View style={styles.numberRoot}>
          <Calculator
            mathStack={mathStack}
            setMathStack={setMathStack}
            recordHandler={recordHandler}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RecordEditScreen;
