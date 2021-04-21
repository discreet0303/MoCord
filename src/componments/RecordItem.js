import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 5,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordInfoBlock: {
    flex: 1,
    flexDirection: 'row',
  },
  recordActionBlock: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
  },
});

const RecordItem = ({ record, handleRecordDelete }) => {
  const navigation = useNavigation();
  const handleRecordEdit = (record) => {
    navigation.push('RecordEdit', { record });
  };

  return (
    <View style={styles.root}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          paddingRight: 10,
          textAlignVertical: 'center',
          paddingHorizontal: 10,
        }}
      >
        {record.type}
      </Text>
      <Text
        style={{
          flex: 1,
          fontSize: 18,
          fontWeight: '600',
          color: '#636363',
          textAlignVertical: 'bottom',
          marginVertical: 5,
        }}
      >
        /{record.wallet ?? '無'} /{record.note}
      </Text>
      <Text style={{ fontSize: 22, textAlignVertical: 'center', paddingLeft: 10 }}>
        ${record.money}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#DDDDDD',
          width: 50,
          marginLeft: 5,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handleRecordEdit(record)}
      >
        <Text>ED</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#999999',
          width: 50,
          marginLeft: 5,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handleRecordDelete(record)}
      >
        <Text>DE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecordItem;
