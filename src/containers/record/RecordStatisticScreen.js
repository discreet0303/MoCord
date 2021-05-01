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

import HeaderNav from '../../componments/HeaderNav';
import YearMonthPickerModal from '../../componments/record/YearMonthPickerModal';
import { getRecordByMonth } from '../../utils/fileManager';
import { calcuTotalMoney } from '../../utils/record';
import themeColor from '../../utils/theme';
import { FILTER_TYPE } from '../../utils/statistic';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: themeColor.background },
  statisticTypeSection: {
    flexDirection: 'row',
    borderBottomColor: themeColor.gray,
    borderBottomWidth: 2,
  },
  statisticType: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 5 },
  statisticTypeText: {
    fontSize: 25,
    color: themeColor.gray,
  },
  statisticTypeTextActive: {
    color: '#000',
  },
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

  const [filterType, setFilterType] = useState(FILTER_TYPE.month);
  const [month, setMonth] = useState(moment().month() + 1);
  const [monthReocrds, setMonthRecords] = useState([]);
  const [groupByMethod, setGroupByMethod] = useState('type');
  const [dateModal, setDateModal] = useState(false);

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

  const StatisticTypeSection = () => {
    const types = _.keys(FILTER_TYPE);

    return (
      <View style={styles.statisticTypeSection}>
        {_.map(types, (type, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.statisticType}
            onPress={() => {
              setFilterType(FILTER_TYPE[type]);
              setDateModal(true);
            }}
            disabled={type !== 'month'}
          >
            <Text
              style={[
                styles.statisticTypeText,
                filterType === FILTER_TYPE[type] && styles.statisticTypeTextActive,
              ]}
            >
              {FILTER_TYPE[type].label}
            </Text>
          </TouchableOpacity>
        ))}
        <YearMonthPickerModal isOpen={dateModal} onMonthPress={onMonthPress} />
      </View>
    );
  };

  const onMonthPress = (month) => {
    setDateModal(false);
    setMonth(month);
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
    <SafeAreaView style={styles.root}>
      <HeaderNav title={`${month} 月統計`} />
      <StatisticTypeSection />
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
