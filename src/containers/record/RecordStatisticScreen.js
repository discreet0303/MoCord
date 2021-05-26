import _ from 'lodash';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import HeaderNav from '../../componments/HeaderNav';
import YearMonthPickerModal from '../../componments/record/statistic/YearMonthPickerModal';
import { getRecordByMonth } from '../../utils/fileManager';
import themeColor from '../../utils/theme';

import { FILTER_TYPE } from '../../utils/statistic';
import SummaryRecordWithLine from '../../componments/record/statistic/SummaryRecordWithLine';
import SummaryRecordWithDetail from '../../componments/record/statistic/SummaryRecordWithDetail';

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
});

const RecordStatisticScreen = ({ navigation }) => {
  const [filterType, setFilterType] = useState(FILTER_TYPE.month);
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().month() + 1);
  const [monthReocrds, setMonthRecords] = useState([]);
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
  }, [year, month]);

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

  const onMonthPress = (year, month) => {
    setDateModal(false);
    setYear(year);
    setMonth(month);
  };

  return (
    <SafeAreaView style={styles.root}>
      <HeaderNav title={`${year}/${month} 月統計`} />
      <StatisticTypeSection />
      <ScrollView>
        {monthReocrds.length === 0 ? (
          <View style={{ marginTop: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>無紀錄</Text>
          </View>
        ) : (
          <>
            <SummaryRecordWithLine records={monthReocrds} />
            <SummaryRecordWithDetail records={monthReocrds} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordStatisticScreen;
