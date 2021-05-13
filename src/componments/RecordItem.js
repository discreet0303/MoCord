import _ from 'lodash';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeColor from '../utils/theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: themeColor.gray,
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
    navigation.push('RecordEdit', { record, date: record.datetime });
  };

  const typeToIcon = (type) => {
    switch (type) {
      case '食物':
        return 'restaurant';
      case '飲品':
        return 'ios-pint';
      case '交通':
        return 'bus';
      case '消費':
        return 'cart-sharp';
      case '居家':
        return 'home';
      case '收入':
        return 'md-briefcase-sharp';
      case '其他':
        return 'ios-document-attach';
      default:
        return 'alert';
    }
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
        <Ionicons name={typeToIcon(record.type)} size={20} /> {record.type}
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
