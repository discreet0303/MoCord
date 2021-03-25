import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import _ from 'lodash';

import HeaderNav from '../componments/HeaderNav';
import RecordItem from '../componments/RecordItem';
import {storeRecords} from '../utils/fileManager';
import moment from 'moment';

import {useDispatch, useSelector} from 'react-redux';
import {fetchRecord, addRecord, setRecord} from '../actions/recordsAction';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyRecordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginVertical: 10,
    width: 100,
    padding: 10,
    height: 50,
  },
});

const EmptyRecordButton = ({navigation}) => (
  <TouchableOpacity
    style={styles.emptyRecordButton}
    onPress={() => navigation.navigate('RecordEdit')}>
    <Text style={{fontSize: 18}}>新增</Text>
  </TouchableOpacity>
);

const RecordListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records.records);

  React.useEffect(() => {
    const runAsync = async () => {
      dispatch(fetchRecord());
    };
    runAsync();
  }, []);

  const handleRecordDelete = (record) => {
    const recordData = _.filter(records, (item) => item !== record);
    dispatch(setRecord(recordData));
  };

  return (
    <>
      <HeaderNav title={moment().format('YYYY/MM/DD')} />
      <View style={styles.root}>
        <View style={{width: '100%'}}>
          {_.map(records, (record, idx) => {
            return (
              <RecordItem
                key={idx}
                record={record}
                handleRecordDelete={handleRecordDelete}
              />
            );
          })}
        </View>
        <View>
          <EmptyRecordButton navigation={navigation} />
        </View>
        <Button
          title="Go to Record Edit Screen"
          onPress={() => navigation.navigate('RecordEdit')}
        />
        <Button title="Cur val" onPress={() => console.log(records)} />
        <Button
          title="Tesst Redux add"
          onPress={() => {
            console.log('add', counter);
            dispatch(addRecord({datetime: '2020-20-20', type: 'food'}));
          }}
        />
        <Button
          title="Tesst Redux set"
          onPress={() => {
            console.log('set be', counter);
            dispatch(setRecord([]));
            console.log('set af', counter);
          }}
        />
      </View>
    </>
  );
};

export default RecordListScreen;
