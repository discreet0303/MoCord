import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import _ from 'lodash';
import {getRecords, storeRecords} from '../utils/fileManager';
import moment from 'moment';

const styles = StyleSheet.create({
  root: {},
});

const RecordListScreen = ({navigation}) => {
  const [records, setRecords] = React.useState({});

  React.useEffect(() => {
    const runAsync = async () => {
      const res = await getRecords();
      setRecords(res);
    };

    runAsync();
  });

  const addRecord = async () => {
    const temp = {
      datetime: moment().format('YYYY-MM-DD HH:ss'),
      type: 'food',
      money: 100,
      note: 'note1',
    };
    let updateRecords = [...records, temp];
    setRecords(updateRecords);
    console.log('updateRecords', updateRecords);

    await storeRecords(updateRecords);
  };

  return (
    <View style={styles.root}>
      {_.map(records, (record, idx) => {
        return (
          <View key={idx}>
            <Text>
              {moment(record.datetime).format('HH:ss')} / {record.type} /
              {record.money} / {record.note}
            </Text>
          </View>
        );
      })}
      <Button
        title="Go to Record Edit Screen"
        onPress={() => addRecord()}
        // onPress={() => navigation.navigate('RecordEdit')}
      />
    </View>
  );
};

export default RecordListScreen;
