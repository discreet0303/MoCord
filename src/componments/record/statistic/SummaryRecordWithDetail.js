import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { recordGroupByType } from '../../../utils/record/statistic';

const styles = StyleSheet.create({
  root: {},
  headerText: {
    color: '#767676',
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 13,
    backgroundColor: '#F4F4F4',
  },
  section: {},
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  sectionHeaderTypeText: {
    fontSize: 18,
    flex: 1,
    paddingHorizontal: 5,
  },
  sectionHeaderNumberView: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderNumberText: {
    fontSize: 18,
  },
  sectionHeaderAmountText: {
    fontSize: 18,
    minWidth: 80,
    textAlign: 'right',
  },
  sectionContent: {},
  sectionContentRow: {
    paddingRight: 20,
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionContentRowBar: { width: 8, height: 30, marginRight: 20 },
  sectionContentRowRecordDateText: {
    fontSize: 16,
    paddingRight: 10,
  },
  sectionContentRowRecordNoteText: {
    flex: 1,
    fontSize: 16,
  },
});

const SummaryRecordWithDetail = ({ records }) => {
  const data = recordGroupByType(records);

  return (
    <View>
      <Text style={styles.headerText}>各類資訊</Text>
      {_.map(data, (record) => (
        <View key={record.type.label} style={styles.section}>
          <View
            style={{
              ...styles.sectionHeader,
              backgroundColor: record.type.color || '#F4F4F4',
            }}
          >
            {record.type.color ? (
              <>
                <Ionicons name={record.type.icon || 'alert-outline'} color={'#fff'} size={25} />
                <Text style={{ ...styles.sectionHeaderTypeText, color: '#fff' }}>
                  {record.type.label}
                </Text>
                <View style={{ ...styles.sectionHeaderNumberView, borderColor: '#fff' }}>
                  <Text style={{ ...styles.sectionHeaderNumberText, color: '#fff' }}>
                    {record.records.length}
                  </Text>
                </View>
                <Text style={{ ...styles.sectionHeaderAmountText, color: '#fff' }}>
                  {record.amount}
                </Text>
              </>
            ) : (
              <>
                <Ionicons
                  name={record.type.icon || 'alert-outline'}
                  color={record.type.color || '#121212'}
                  size={25}
                />
                <Text style={styles.sectionHeaderTypeText}>{record.type.label}</Text>
                <View style={{ ...styles.sectionHeaderNumberView, borderColor: 'gray' }}>
                  <Text style={styles.sectionHeaderNumberText}>{record.records.length}</Text>
                </View>
                <Text style={styles.sectionHeaderAmountText}>{record.amount}</Text>
              </>
            )}
          </View>
          <View style={styles.sectionContent}>
            {_.map(record.records, (item, idx) => (
              <View key={idx} style={styles.sectionContentRow}>
                <View
                  style={{
                    ...styles.sectionContentRowBar,
                    backgroundColor: record.type.color || 'red',
                  }}
                ></View>
                <Text style={styles.sectionContentRowRecordDateText}>
                  {moment(item.datetime).format('DD')}
                </Text>
                <Text style={styles.sectionContentRowRecordNoteText}>{item.note}</Text>
                <Text>{item.money}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default SummaryRecordWithDetail;
