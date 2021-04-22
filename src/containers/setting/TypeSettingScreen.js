import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';

import HeaderNav from '../../componments/HeaderNav';
import { fetchTypes, addType, removeType } from '../../actions/TypesAction';
import { OPERATOR_TYPE } from '../../config';

const styles = StyleSheet.create({
  root: {},
  typeSection: {},
  typeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  typeHeaderText: {
    fontSize: 20,
    fontWeight: '600',
  },
  typeItem: {
    backgroundColor: '#fff',
    marginVertical: 2,
    flexDirection: 'row',
  },
  typeItemText: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  typeDeleteButton: {
    backgroundColor: '#bbbbbb',
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  typeDeleteButtonText: {},
});

const TypeSettingScreen = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => _.groupBy(state.types, 'operator'));
  const [text, onChangeText] = useState('');

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  const addRecordType = (op) => {
    if (text === '') return;
    dispatch(addType({ label: text, operator: op }));
  };

  const renderTypeItem = (type) => (
    <View key={type.label} style={styles.typeItem}>
      <Text style={styles.typeItemText}>{type.label}</Text>
      <TouchableOpacity style={styles.typeDeleteButton} onPress={() => dispatch(removeType(type))}>
        <Text style={styles.typeDeleteButtonText}>De</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView>
      <HeaderNav title="設定類別" goBack />
      <ScrollView>
        <View style={styles.typeSection}>
          <View style={styles.typeHeader}>
            <Text style={styles.typeHeaderText}>支出</Text>
            <Button title={'add'} onPress={() => {}} />
          </View>
          {_.map(types['pos'], (type) => renderTypeItem(type))}
        </View>
        <View style={styles.typeSection}>
          <View style={styles.typeHeader}>
            <Text style={styles.typeHeaderText}>收入</Text>
            <Button title={'add'} onPress={() => {}} />
          </View>
          {_.map(types['neg'], (type) => renderTypeItem(type))}
        </View>
      </ScrollView>
      <ScrollView>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#000' }}
          value={text}
          onChangeText={onChangeText}
        />
        <Button title={'Add Pos Type'} onPress={() => addRecordType(OPERATOR_TYPE.position)} />
        <Button title={'Add Neg Type'} onPress={() => addRecordType(OPERATOR_TYPE.negative)} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TypeSettingScreen;
