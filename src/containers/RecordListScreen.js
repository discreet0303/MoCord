import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';

import _ from 'lodash';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { fetchRecord, setRecord } from '../actions/recordsAction';
import { fetchTypes } from '../actions/TypesAction';

import HeaderNav from '../componments/HeaderNav';
import RecordItem from '../componments/RecordItem';

import { calcuTotalMoney } from '../utils/record';

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

const EmptyRecordButton = ({ navigation, date }) => {
  return (
    <TouchableOpacity
      style={styles.emptyRecordButton}
      onPress={() => navigation.navigate('RecordEdit', { date: date })}
    >
      <Text style={{ fontSize: 18 }}>新增</Text>
    </TouchableOpacity>
  );
};

const RecordListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records.records);
  const types = useSelector((state) => state.types);
  const [date, setDate] = React.useState(moment().format('YYYY-MM-DD'));

  // TODO: INIT STATE
  React.useEffect(() => {
    dispatch(fetchTypes());
  }, []);

  React.useEffect(() => {
    dispatch(fetchRecord(date));
  }, [date]);

  const handleRecordDelete = (record) => {
    const recordData = _.filter(records, (item) => item !== record);
    dispatch(setRecord(date, recordData));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <Text style={styles.totalText}>{calcuTotalMoney(records, types)}</Text>
      </View>
      <ScrollView>
        <View style={styles.root}>
          <View style={{ width: '100%' }}>
            {_.map(records, (record, idx) => {
              return (
                <RecordItem key={idx} record={record} handleRecordDelete={handleRecordDelete} />
              );
            })}
          </View>
          <View>
            <EmptyRecordButton navigation={navigation} date={date} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordListScreen;
