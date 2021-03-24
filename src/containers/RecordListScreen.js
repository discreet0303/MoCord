import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import _ from 'lodash';

import RecordItem from '../componments/RecordItem';
import {getRecords} from '../utils/fileManager';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyRecordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginVertical: 10,
    width: 100,
    padding: 10,
    height: 50,
  },
});

const EmptyRecordButton = ({navigation}) => (
  <TouchableOpacity
    style={styles.emptyRecordButton}
    onPress={() => navigation.navigate('RecordEdit')}>
    <Text style={{fontSize: 18}}>新增</Text>
  </TouchableOpacity>
);

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
      <View style={{width: '100%'}}>
        {_.map(records, (record, idx) => {
          return <RecordItem key={idx} record={record} />;
        })}
      </View>
      <View>
        {!_.isEmpty(records) && <EmptyRecordButton navigation={navigation} />}
      </View>
      <Button
        title="Go to Record Edit Screen"
        onPress={() => navigation.navigate('RecordEdit')}
      />
    </View>
  );
};

export default RecordListScreen;
