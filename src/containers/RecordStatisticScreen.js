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

import moment from 'moment';
import _ from 'lodash';

import HeaderNav from '../componments/HeaderNav';
import { getRecordByMonth } from '../utils/fileManager';

const styles = StyleSheet.create({
  root: {},
  monthSection: { paddingVertical: 5 },
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
            {_.map(metadata[key], (record) => (
              <View key={record.id} style={styles.recordRow}>
                <Text style={[styles.recordText, { paddingRight: 10 }]}>
                  {moment(record.datetime).format('DD')}
                </Text>
                <Text style={[styles.recordText, { flex: 1 }]}>{record.note}</Text>
                <Text style={styles.recordText}>{record.money}</Text>
              </View>
            ))}
            <View style={styles.recordAmount}>
              <Text style={[styles.recordText, { flex: 1 }]}>合計</Text>
              <Text style={styles.recordText}>
                {_.sum(_.map(metadata[key], (r) => _.toInteger(r.money)))}
              </Text>
            </View>
          </View>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView>
      <HeaderNav title={`${month} 月統計`} />
      <MonthSection />
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Button title={'類別'} onPress={() => setGroupByMethod('type')} />
          <Button title={'備註'} onPress={() => setGroupByMethod('note')} />
        </View>
        <RecordSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordStatisticScreen;

// import React from 'react';

// import { useSelector } from 'react-redux';

// import HeaderNav from '../componments/HeaderNav';

// import { getRecordByMonth } from '../utils/fileManager';
// import { calcuTotalMoney } from '../utils/record';

// const styles = StyleSheet.create({
//   statisticRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     paddingLeft: 15,
//     paddingRight: 5,
//     paddingVertical: 3,
//   },
//   statisticText: {
//     fontSize: 16,
//     width: 50,
//   },
// });

// const RecordStatisticScreen = ({ navigation }) => {
//   const year = moment().year();
//   const [month, setMonth] = React.useState(moment().month() + 1);
//   const [monthReocrd, setMonthRecord] = React.useState({});
//   const [maxAmount, setMaxAmount] = React.useState(0);
//   const types = useSelector((state) => state.types);

//   React.useEffect(() => {
//     const runAsync = async () => {
//       const res = await getRecordByMonth(year, month);
//       const total = calcuTotalMoney(res, types);
//       let data = {
//         total,
//         records: {},
//       };
//       const groupByType = _.groupBy(res, 'type');
//       _.each(groupByType, (typeData, type) => {
//         const maxNum = _.sum(_.map(typeData, (d) => _.toInteger(d.money)));
//         setMaxAmount((n) => {
//           if (n < maxNum) return maxNum;
//           return n;
//         });
//         data.records[type] = {
//           amount: maxNum,
//           label: type,
//           records: typeData,
//         };
//       });
//       setMonthRecord(data);
//     };
//     runAsync();
//   }, [month]);

//   return (
//     <SafeAreaView>
//       <HeaderNav title={`${month} 月統計`} />
//       <ScrollView>
//         {_.map(monthReocrd.records, (typeData, type) => {
//           return (
//             <View key={type} style={styles.statisticRow}>
//               <Text style={styles.statisticText}>{typeData.label}</Text>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   paddingRight: 20,
//                 }}
//               >
//                 <View
//                   style={{
//                     height: 1,
//                     backgroundColor: 'gray',
//                     width: `${_.toInteger((typeData.amount / maxAmount) * 100)}%`,
//                   }}
//                 ></View>
//               </View>
//               <Text style={styles.statisticText}>{typeData.amount}</Text>
//             </View>
//           );
//         })}
//         <View style={{ height: 1, backgroundColor: '#b7b7b7' }}></View>
//         <View style={styles.statisticRow}>
//           <Text style={styles.statisticText}>合計</Text>
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               paddingRight: 20,
//             }}
//           ></View>
//           <Text style={styles.statisticText}>{monthReocrd.total}</Text>
//         </View>
//         <View
//           style={{
//             backgroundColor: '#ffffff',
//             shadowColor: '#000',
//             shadowOffset: {
//               width: 0,
//               height: 1,
//             },
//             shadowOpacity: 0.2,
//             shadowRadius: 1.41,
//             elevation: 2,
//             marginBottom: 20,
//           }}
//         >
//           <Text style={{ textAlign: 'center', fontSize: 30 }}>All Record</Text>
//           {_.map(monthReocrd.records, (typeData, type) => {
//             return (
//               <View key={type} style={{  }}>
//                 <Text
//                   style={{
//                   }}
//                 >
//                   {typeData.label}
//                 </Text>
//                 {_.map(typeData.records, (record, idx) => (
//                   <View key={idx} style={{ flexDirection: 'row' }}>
//                     <Text style={{ fontSize: 18, paddingRight: 15 }}>
//                       {moment(record.datetime).format('DD')}
//                     </Text>
//                     <Text style={{ flex: 1, fontSize: 18 }}>{record.note}</Text>
//                     <Text style={{ fontSize: 18 }}>${record.money}</Text>
//                   </View>
//                 ))}
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     marginTop: 5,
//                     borderTopColor: '#b7b7b7',
//                     borderTopWidth: 1,
//                   }}
//                 >
//                   <Text style={{ flex: 1, fontSize: 18 }}>合計</Text>
//                   <Text style={{ fontSize: 18 }}>
//                     {_.sum(_.map(typeData.records, (r) => _.toInteger(r.money)))}
//                   </Text>
//                 </View>
//               </View>
//             );
//           })}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default RecordStatisticScreen;
