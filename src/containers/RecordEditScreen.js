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
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addRecord, updateRecord} from '../actions/recordsAction';

import {DEFAULT_RECORD_TYPE} from '../config/DefaultRecordConfig';
import HeaderNav from '../componments/HeaderNav';
import GoBack from '../componments/nav/GoBack';
import Calculator from '../componments/Calculator';

const RECORD_INIT = {
  datetime: moment().format('YYYY-MM-DD HH:mm'),
  type: 'food',
  money: 0,
  note: '',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  recordText: {
    fontSize: 45,
    textAlign: 'right',
    marginVertical: 3,
    marginRight: 5,
  },
  recordTypeRow: {
    flexDirection: 'row',
  },
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  numberRow: {
    flexDirection: 'row',
    backgroundColor: '#282c34',
  },
  numberItem: {
    flex: 1,
  },
  numberItemText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 45,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f7f7f7',
  },
  divide: {
    height: 1,
    backgroundColor: '#b3b3b3',
  },
});

const RecordEditScreen = ({navigation, route}) => {
  const _record = route.params ? route.params.record : RECORD_INIT;
  const _mathStack = route.params ? _.split(route.params.record.money) : [];
  const _mode = route.params ? true : false;
  const screenTitle = route.params ? '編輯紀錄' : '新增紀錄';

  const [recordData, setRecordData] = useState(_record);
  const [mathStack, setMathStack] = useState(_mathStack);
  const dispatch = useDispatch();

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

  return (
    <>
      <HeaderNav title={screenTitle} leftSection={<GoBack />} />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={-100}
        style={{flex: 1}}>
        <Text style={styles.recordText}>${recordData.money}</Text>
        <Text style={styles.recordText}>{_.join(mathStack, '')}</Text>
        {_.map(_.chunk(DEFAULT_RECORD_TYPE, 4), (rowData, rowIdx) => {
          return (
            <View key={rowIdx} style={{flexDirection: 'row'}}>
              {_.map(rowData, (recordItem, recordItemIdx) => (
                <TouchableOpacity
                  key={recordItemIdx}
                  style={[
                    styles.recordTypeItem,
                    recordData.type == recordItem.name
                      ? styles.recordTypeItemActive
                      : styles.recordTypeItemInactive,
                  ]}
                  onPress={() =>
                    setRecordData((record) => ({
                      ...record,
                      type: recordItem.name,
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
