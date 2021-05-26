import _ from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import themeColor from '../../../utils/theme';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 15,
  },
  yearSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingBottom: 10,
    borderBottomColor: themeColor.gray,
    borderBottomWidth: 2,
  },
  yearText: { fontSize: 30, textAlign: 'center' },
  monthItem: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: { textAlign: 'center', fontSize: 20 },
});

const YearMonthPickerModal = ({ isOpen, onMonthPress }) => {
  const [year, setYear] = useState(moment().year());
  const monthArr = _.range(1, 13);

  return (
    <Modal backdropOpacity={0.1} isVisible={isOpen} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.yearSection}>
          <TouchableOpacity onPress={() => setYear((y) => y - 1)}>
            <Ionicons name={'chevron-back-outline'} size={20} />
          </TouchableOpacity>
          <Text style={styles.yearText}>{year}</Text>
          <TouchableOpacity onPress={() => setYear((y) => y + 1)}>
            <Ionicons name={'chevron-forward-outline'} size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ height: 220 }}>
          <FlatList
            data={monthArr}
            numColumns={3}
            style={{ padding: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.monthItem} onPress={() => onMonthPress(year, item)}>
                <Text style={styles.monthText}>{item}月</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    </Modal>
  );
};

export default YearMonthPickerModal;
