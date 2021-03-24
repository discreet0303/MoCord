import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import _ from 'lodash';
import moment from 'moment';

import {DEFAULT_RECORD_TYPE} from '../config/DefaultRecordConfig';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
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
  },
  leftBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightBlock: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

const RecordItem = ({record}) => {
  const typeIndex = _.findIndex(DEFAULT_RECORD_TYPE, ['name', record.type]);
  const recordType = DEFAULT_RECORD_TYPE[typeIndex];

  return (
    <View style={styles.root}>
      <View style={styles.leftBlock}>
        <Text style={{fontSize: 22, fontWeight: 'bold', paddingRight: 10}}>
          {recordType.label}
        </Text>
        <Text style={{fontSize: 18, fontWeight: '600', color: '#636363'}}>
          /{record.note}
        </Text>
      </View>
      <View style={styles.rightBlock}>
        <Text style={{fontSize: 22}}>${record.money}</Text>
      </View>
    </View>
  );
};

export default RecordItem;
