import _ from 'lodash';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';

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
  },
  monthItem: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: { textAlign: 'center', fontSize: 20 },
});

const YearMonthPickerModal = ({ isOpen, onMonthPress }) => {
  const monthArr = _.range(1, 12);

  return (
    <Modal backdropOpacity={0.1} isVisible={isOpen} style={styles.modal}>
      <View style={styles.container}>
        <View style={{ height: 220 }}>
          <FlatList
            data={monthArr}
            numColumns={3}
            style={{ padding: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.monthItem} onPress={() => onMonthPress(item)}>
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
