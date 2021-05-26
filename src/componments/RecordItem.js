import _ from 'lodash';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderTopColor: '#e3e3e3',
    borderTopWidth: 1,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  noteSection: {
    flex: 1,
    paddingHorizontal: 5,
  },
  noteSectionNoteText: {
    fontSize: 18,
  },
  noteSectionWalletText: {
    fontSize: 16,
  },
  moneyText: {
    fontSize: 20,
  },
});

const RecordItem = ({ record, types }) => {
  const navigation = useNavigation();
  const type = _.find(types, ['label', record.type]) || {
    color: '#23415a',
    icon: 'add',
    label: 'New',
    operator: 'cost',
  };

  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => navigation.push('RecordEdit', { record, date: record.datetime })}
    >
      <Ionicons name={type.icon} color={type.color} size={35} />
      <View style={styles.noteSection}>
        <Text style={styles.noteSectionNoteText}>{record.note || type.label}</Text>
        <Text>{record.wallet}</Text>
      </View>
      <Text style={styles.moneyText}>{record.money}</Text>
    </TouchableOpacity>
  );
};

export default RecordItem;
