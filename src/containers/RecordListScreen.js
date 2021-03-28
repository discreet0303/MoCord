import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {Calendar} from 'react-native-calendars';

import _ from 'lodash';
import moment from 'moment';

import {useDispatch, useSelector} from 'react-redux';
import {fetchRecord, setRecord} from '../actions/recordsAction';

import HeaderNav from '../componments/HeaderNav';
import RecordItem from '../componments/RecordItem';
import TestM from '../componments/modal/TestM';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  totalText: {
    fontSize: 30,
    fontWeight: 'bold',
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
  const [date, setDate] = React.useState(moment().format('YYYY-MM-DD'));

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    const runAsync = async () => {
      dispatch(fetchRecord(date));
    };
    runAsync();
  }, [date]);

  const handleRecordDelete = (record) => {
    const recordData = _.filter(records, (item) => item !== record);
    dispatch(setRecord(recordData));
  };

  return (
    <>
      <HeaderNav title={moment(date).format('YYYY/MM/DD')} />
      <Calendar
        current={date}
        monthFormat={'yyyy/MM'}
        onDayPress={(day) => setDate(day.dateString)}
        markingType={'custom'}
        markedDates={{
          [date]: {
            customStyles: {
              container: {
                backgroundColor: '#00adf5',
              },
              text: {
                color: 'white',
              },
            },
          },
        }}
      />
      <View style={styles.totalSection}>
        <Text style={styles.totalText}>總和</Text>
        <Text style={styles.totalText}>
          {_.sum(_.map(records, (record) => record.money))}
        </Text>
      </View>
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
        {/* <Button title="Modal" onPress={() => setModalVisible((m) => !m)} />
        <TestM
          headerTitle={moment().format('YYYY/MM/DD')}
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
        /> */}
      </View>
    </>
  );
};

export default RecordListScreen;
