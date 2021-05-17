import _ from 'lodash';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HeaderNav from '../../componments/HeaderNav';
import { fetchTypes, removeType } from '../../actions/TypesAction';
import themeColor from '../../utils/theme';
import { OPERATOR_TYPE } from '../../config';

const styles = StyleSheet.create({
  root: { backgroundColor: themeColor.background, flex: 1 },
  listHeader: {
    color: '#767676',
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  listContent: {
    paddingHorizontal: 20,
    backgroundColor: '#F4F4F4',
  },
  listContentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  listContentRowText: {
    fontSize: 17,
  },
  addRow: { paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#e2e2e2' },
  addRowText: {
    fontSize: 18,
    fontWeight: '400',
  },
});

const TypeSettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => _.groupBy(state.types, 'operator'));

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  console.log(types);

  const renderItem = (item) => (
    <View style={styles.listContentRow} key={item.label}>
      <View style={{ flexDirection: 'row' }}>
        <Ionicons name={item.icon} size={25} color={item.color} />
        <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 10 }}>
          <Text style={styles.listContentRowText}>{item.label}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => dispatch(removeType(item))}>
        <Ionicons name={'ios-trash-outline'} size={25} color={'red'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <HeaderNav title="記帳分類" goBack />
      <ScrollView>
        <Text style={styles.listHeader}>支出 / cost</Text>
        <View style={styles.listContent}>
          {_.map(types[OPERATOR_TYPE.COST], (item) => renderItem(item))}
        </View>
        <Text style={styles.listHeader}>收入 / income</Text>
        <View style={styles.listContent}>
          {_.map(types[OPERATOR_TYPE.INCOME], (item) => renderItem(item))}
        </View>
        <TouchableOpacity
          style={styles.addRow}
          onPress={() => {
            navigation.push('SettingStack', { screen: 'CreateType' });
          }}
        >
          <Text style={styles.addRowText}>
            <Ionicons name={'ios-add-outline'} size={20} />
            新增分類
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TypeSettingScreen;
