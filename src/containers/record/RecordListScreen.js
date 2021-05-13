import _ from 'lodash';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { fetchRecord, setRecord } from '../../actions/recordsAction';
import HeaderNav from '../../componments/HeaderNav';
import RecordItem from '../../componments/RecordItem';
import themeColor from '../../utils/theme';
import { dateOnly } from '../../utils/formatter';
import { calcuTotalMoney } from '../../utils/record';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: themeColor.background },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 4,
    paddingTop: 15,
    borderTopColor: themeColor.gray,
    borderTopWidth: 2,
  },
  totalText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  createRecordBt: {
    width: 100,
    height: 50,
    padding: 10,
    marginVertical: 10,
    backgroundColor: themeColor.gray,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

const RecordListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const records = useSelector((state) => state.records.records);
  const [date, setDate] = useState(dateOnly());
  const [isCalendarOpen, setCalendarOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchRecord(date));
  }, [date]);

  const onVisibleMonthsChange = ([day]) => {
    if (moment().month() + 1 === day.month) setDate(dateOnly());
    else {
      const newDate = moment(day.dateString).set('date', 1);
      setDate(dateOnly(newDate));
    }
  };

  const handleRecordDelete = (record) => {
    const recordData = _.filter(records, (item) => item !== record);
    dispatch(setRecord(date, recordData));
  };

  return (
    <SafeAreaView style={styles.root}>
      <HeaderNav
        title={date}
        titleHandler={() => setDate(dateOnly())}
        renderRightSection={
          <TouchableOpacity onPress={() => setCalendarOpen((open) => !open)}>
            <Ionicons name={isCalendarOpen ? 'ios-calendar' : 'ios-calendar-outline'} size={30} />
          </TouchableOpacity>
        }
      />
      <CalendarList
        current={date}
        style={{ height: isCalendarOpen ? 320 : 0 }}
        onDayPress={(day) => setDate(day.dateString)}
        renderHeader={(date) => {}}
        horizontal={true}
        pagingEnabled={true}
        enableSwipeMonths={true}
        onVisibleMonthsChange={onVisibleMonthsChange}
        markingType={'custom'}
        markedDates={{
          [date]: {
            customStyles: {
              container: {
                backgroundColor: '#00adf5',
              },
              text: {
                color: '#fff',
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
        <View>
          {records.map((record) => (
            <RecordItem key={record.id} record={record} handleRecordDelete={handleRecordDelete} />
          ))}
        </View>
        <TouchableOpacity
          style={styles.createRecordBt}
          onPress={() => navigation.navigate('RecordEdit', { date: date })}
        >
          <Text>新增</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordListScreen;
