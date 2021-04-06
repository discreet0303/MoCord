import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: 20,
    marginVertical: 2,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    height: 40,
  },
  leftBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

const RecordItem = ({record, handleRecordDelete}) => {
  const navigation = useNavigation();
  const handleRecordEdit = (record) => {
    navigation.push('RecordEdit', {record});
  };

  return (
    <View style={styles.root}>
      <View style={styles.leftBlock}>
        <Text style={{fontSize: 22, fontWeight: 'bold', paddingRight: 10}}>
          {record.type}
        </Text>
        <Text style={{fontSize: 18, fontWeight: '600', color: '#636363'}}>
          /{record.note}
        </Text>
      </View>
      <View style={styles.rightBlock}>
        <Text style={{fontSize: 22}}>${record.money}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#DDDDDD',
            height: 40,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 5,
          }}
          onPress={() => handleRecordEdit(record)}>
          <Text>ED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#999999',
            height: 40,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 5,
          }}
          onPress={() => handleRecordDelete(record)}>
          <Text>DE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecordItem;
