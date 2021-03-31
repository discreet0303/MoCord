import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import _ from 'lodash';
import moment from 'moment';

import HeaderNav from '../componments/HeaderNav';

import {DEFAULT_RECORD_TYPE} from '../config/DefaultRecordConfig';
import {getRecordByMonth} from '../utils/fileManager';

const styles = StyleSheet.create({
  statisticRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 3,
  },
  statisticText: {
    fontSize: 16,
    width: 50,
  },
});

const RecordStatisticScreen = ({navigation}) => {
  const year = moment().year();
  const [month, setMonth] = React.useState(moment().month() + 1);
  const [monthReocrd, setMonthRecord] = React.useState({food: {}, eat: {}});
  const [maxAmount, setMaxAmount] = React.useState(0);

  React.useEffect(() => {
    const runAsync = async () => {
      const res = await getRecordByMonth(year, month);

      let data = {};
      const groupByType = _.groupBy(res, 'type');
      _.each(groupByType, (typeData, type) => {
        const maxNum = _.sum(_.map(typeData, (d) => _.toInteger(d.money)));
        setMaxAmount((n) => {
          if (n < maxNum) return maxNum;
          return n;
        });
        data[type] = {
          amount: maxNum,
          label:
            DEFAULT_RECORD_TYPE[
              _.findIndex(DEFAULT_RECORD_TYPE, ['name', type])
            ].label,
          records: typeData,
        };
      });
      setMonthRecord(data);
    };
    runAsync();
  }, [month]);

  return (
    <>
      <HeaderNav title={`${month} 月統計`} />
      <ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingVertical: 5}}>
          {_.map(_.times(12), (monthNum) => (
            <TouchableOpacity
              key={monthNum}
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                marginHorizontal: 5,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#000',
                backgroundColor: monthNum + 1 === month ? 'gray' : 'white',
              }}
              onPress={() => setMonth(monthNum + 1)}>
              <Text style={{textAlign: 'center'}}>{monthNum + 1}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {_.map(monthReocrd, (typeData, type) => {
          return (
            <View key={type} style={styles.statisticRow}>
              <Text style={styles.statisticText}>{typeData.label}</Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingRight: 20,
                }}>
                <View
                  style={{
                    height: 1,
                    backgroundColor: 'gray',
                    width: `${_.toInteger(
                      (typeData.amount / maxAmount) * 100,
                    )}%`,
                  }}></View>
              </View>
              <Text style={styles.statisticText}>{typeData.amount}</Text>
            </View>
          );
        })}
        <View style={{height: 1, backgroundColor: '#b7b7b7'}}></View>
        <View style={styles.statisticRow}>
          <Text style={styles.statisticText}>合計</Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingRight: 20,
            }}></View>
          <Text style={styles.statisticText}>
            {_.sum(_.map(monthReocrd, (m) => m.amount))}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            marginBottom: 20,
          }}>
          <Text style={{textAlign: 'center', fontSize: 30}}>All Record</Text>
          {_.map(monthReocrd, (typeData, type) => {
            return (
              <View
                key={type}
                style={{paddingHorizontal: 20, paddingVertical: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    marginBottom: 5,
                    paddingLeft: 10,
                    borderLeftColor: '#666666',
                    borderLeftWidth: 4,
                  }}>
                  {typeData.label}
                </Text>
                {_.map(typeData.records, (record, idx) => (
                  <View key={idx} style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 18, paddingRight: 15}}>
                      {moment(record.datetime).format('DD')}
                    </Text>
                    <Text style={{flex: 1, fontSize: 18}}>{record.note}</Text>
                    <Text style={{fontSize: 18}}>${record.money}</Text>
                  </View>
                ))}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    borderTopColor: '#b7b7b7',
                    borderTopWidth: 1,
                  }}>
                  <Text style={{flex: 1, fontSize: 18}}>合計</Text>
                  <Text style={{fontSize: 18}}>
                    {_.sum(
                      _.map(typeData.records, (r) => _.toInteger(r.money)),
                    )}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <Button title={'Back'} onPress={() => navigation.goBack()} />
      </ScrollView>
    </>
  );
};

export default RecordStatisticScreen;
