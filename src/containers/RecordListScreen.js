import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import RecordItem from '../componments/RecordItem';
import {getRecords, storeRecords} from '../utils/fileManager';

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
        return <RecordItem key={idx} record={record} />;
      })}
      <Button
        title="Go to Record Edit Screen"
        onPress={() => navigation.navigate('RecordEdit')}
      />
    </View>
  );
};

export default RecordListScreen;
