import React from 'react';
import {View, Text} from 'react-native';

import _ from 'lodash';

import {getRecordByMonth} from '../utils/fileManager';

const RecordStatisticScreen = () => {
  const [monthReocrd, setMonthRecord] = React.useState([]);

  React.useEffect(() => {
    const runAsync = async () => {
      const res = await getRecordByMonth(2021, 3);
      setMonthRecord(_.groupBy(res, 'type'));
    };
    runAsync();
  }, []);

  return (
    <View>
      {_.map(monthReocrd, (typeData, type) => {
        return (
          <View key={type}>
            <Text>{type}</Text>
            {_.map(typeData, (record, idx) => (
              <Text key={idx}>
                {record.type}/{record.money}/{record.note}
              </Text>
            ))}
            <Text style={{fontSize: 20, marginBottom: 10}}>
              Total: {_.sum(_.map(typeData, (d) => _.toInteger(d.money)))}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default RecordStatisticScreen;
