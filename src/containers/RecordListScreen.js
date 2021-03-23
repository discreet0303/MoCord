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

  return (
    <View style={styles.root}>
      {_.map(records, (record, idx) => {
        return (
          <View key={idx}>
            <Text>
              {moment(record.datetime).format('HH:mm')} / {record.type} /
              {record.money} / {record.note}
            </Text>
          </View>
        );
      })}
      <Button
        title="Go to Record Edit Screen"
        onPress={() => navigation.navigate('RecordEdit')}
      />
    </View>
  );
};

export default RecordListScreen;
