import _ from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { recordGroupByType } from '../../../utils/record/statistic';

const styles = StyleSheet.create({
  root: {},
  headerText: {
    color: '#767676',
    fontSize: 15,
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: '#F4F4F4',
  },
  row: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  rowIcon: {},
  rowStatisticSection: {
    flex: 1,
    marginHorizontal: 10,
  },
  rowStatisticSectionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  rowAmount: {
    minWidth: 50,
    fontSize: 16,
    textAlign: 'right',
  },
  totalRow: {
    paddingVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#a0a0a0',
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  totalRowLeftSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalRowLeftSideText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  totalRowRightSideText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

const SummaryRecordWithLine = ({ records }) => {
  const data = recordGroupByType(records);
  const maxRange = _.max(_.map(data, (d) => Math.abs(d.amount)));

  return (
    <View style={styles.root}>
      <Text style={styles.headerText}>各類資訊</Text>
      {_.map(data, (record) => (
        <View key={record.type.label} style={styles.row}>
          <Ionicons
            name={record.type.icon || 'alert-outline'}
            color={record.type.color || '#121212'}
            size={25}
          />
          <View style={styles.rowStatisticSection}>
            <Text style={styles.rowStatisticSectionText}>{record.type.label}</Text>
            <View
              style={{
                height: 1,
                width: `${(Math.abs(record.amount) / maxRange) * 100}%`,
                backgroundColor: `${record.type.color || '#121212'}`,
              }}
            ></View>
          </View>
          <Text style={styles.rowAmount}>{record.amount}</Text>
        </View>
      ))}
      <View style={styles.totalRow}>
        <View style={styles.totalRowLeftSide}>
          <Ionicons name={'remove-outline'} color={'#121212'} size={25} />
          <Text style={styles.totalRowLeftSideText}>合計</Text>
        </View>
        <Text style={styles.totalRowRightSideText}>{_.sumBy(data, 'amount')}</Text>
      </View>
    </View>
  );
};

export default SummaryRecordWithLine;
