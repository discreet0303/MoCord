import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';

import moment from 'moment';
import _ from 'lodash';

import HeaderNav from '../componments/HeaderNav';
import { getRecordByMonth } from '../utils/fileManager';
import { calcuTotalMoney } from '../utils/record';

const styles = StyleSheet.create({
  root: {},
  monthSection: { paddingVertical: 5, height: 60 },
  month: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  summarySection: {
    marginVertical: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  summaryRowText: {
    fontSize: 18,
    textAlign: 'right',
  },
  recordSection: {},
  recordItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  recordItemTitle: {
    borderLeftColor: 'gray',
    borderLeftWidth: 4,
    marginBottom: 5,
  },
  recordItemTitleText: {
    fontSize: 20,
    fontWeight: '700',
    paddingLeft: 10,
  },
  recordRow: { flexDirection: 'row' },
  recordText: { fontSize: 18 },
  recordAmount: {
    flexDirection: 'row',
    marginTop: 5,
    paddingTop: 5,
    borderTopColor: '#b7b7b7',
    borderTopWidth: 1,
  },
  active: {
    backgroundColor: 'gray',
  },
});

const RecordStatisticScreen = ({ navigation }) => {
  const year = moment().year();
  const types = useSelector((state) => state.types);

  const [month, setMonth] = useState(moment().month() + 1);
  const [monthReocrds, setMonthRecords] = useState([]);
  const [groupByMethod, setGroupByMethod] = useState('type');

  useEffect(() => {
    const runAsync = async () => {
      const res = await getRecordByMonth(year, month);
      setMonthRecords(res);
    };

    const forceListener = navigation.addListener('focus', () => {
      runAsync();
    });
    runAsync();
    return forceListener;
  }, [month]);

  const MonthSection = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthSection}>
        {_.map(_.times(12), (monthNum) => (
          <TouchableOpacity
            key={monthNum}
            style={[styles.month, monthNum + 1 === month && { ...styles.active }]}
            onPress={() => setMonth(monthNum + 1)}
          >
            <Text>{monthNum + 1}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const SummarySection = () => {
    const groupByType = _.groupBy(monthReocrds, 'type');
    let metadata = _.map(groupByType, (records, type) => {
      const amount = _.sumBy(records, (item) => Number(item.money));
      return {
        records,
        type,
        amount,
      };
    });
    const maxAmount = _.max(_.map(metadata, 'amount'));

    return (
      <View style={styles.summarySection}>
        {_.map(metadata, (row) => (
          <View key={row.type} style={styles.summaryRow}>
            <Text style={styles.summaryRowText}>{row.type}</Text>
            <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'gray',
                  width: `${(row.amount / maxAmount) * 100}%`,
                }}
              ></View>
            </View>
            <Text style={{ ...styles.summaryRowText, width: '15%' }}>{row.amount}</Text>
          </View>
        ))}
        <View style={{ ...styles.recordAmount, marginHorizontal: 10 }}>
          <Text style={[styles.recordText, { flex: 1 }]}>合計</Text>
          <Text style={styles.recordText}>{calcuTotalMoney(monthReocrds, types)}</Text>
        </View>
      </View>
    );
  };

  const RecordSection = () => {
    let metadata = [];
    if (groupByMethod === 'type') metadata = _.groupBy(monthReocrds, 'type');
    else if (groupByMethod === 'note') metadata = _.groupBy(monthReocrds, 'note');

    return (
      <>
        {_.map(metadata, (obj, key) => (
          <View key={key} style={styles.recordItem}>
            <View style={styles.recordItemTitle}>
              <Text style={styles.recordItemTitleText}>{key}</Text>
            </View>
            {_.map(metadata[key], (record, idx) => (
              <View key={idx} style={styles.recordRow}>
                <Text style={[styles.recordText, { paddingRight: 10 }]}>
                  {moment(record.datetime).format('DD')}
                </Text>
                <Text style={[styles.recordText, { flex: 1 }]}>{record.note}</Text>
                <Text style={styles.recordText}>{record.money}</Text>
              </View>
            ))}
            <View style={styles.recordAmount}>
              <Text style={[styles.recordText, { flex: 1 }]}>合計</Text>
              <Text style={styles.recordText}>{calcuTotalMoney(metadata[key], types)}</Text>
            </View>
          </View>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <HeaderNav title={`${month} 月統計`} />
        <MonthSection />
      </View>
      <ScrollView>
        {monthReocrds.length === 0 ? (
          <View style={{ marginTop: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>無紀錄</Text>
          </View>
        ) : (
          <>
            <SummarySection />
            <View style={{ flexDirection: 'row' }}>
              <Button title={'類別'} onPress={() => setGroupByMethod('type')} />
              <Button title={'備註'} onPress={() => setGroupByMethod('note')} />
            </View>
            <RecordSection />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordStatisticScreen;
