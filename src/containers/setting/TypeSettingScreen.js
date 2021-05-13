import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderNav from '../../componments/HeaderNav';
import { fetchTypes, removeType } from '../../actions/TypesAction';
import themeColor from '../../utils/theme';

const styles = StyleSheet.create({
  root: { backgroundColor: themeColor.background },
  typeSection: {},
  typeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: themeColor.gray,
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

const TypeSettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => _.groupBy(state.types, 'operator'));

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  const renderTypeItem = (type) => (
    <View key={type.label} style={styles.typeItem}>
      <Text style={styles.typeItemText}>{type.label}</Text>
      <TouchableOpacity style={styles.typeDeleteButton} onPress={() => dispatch(removeType(type))}>
        <Text style={styles.typeDeleteButtonText}>De</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <HeaderNav title="設定類別" goBack />
      <ScrollView>
        <View style={styles.typeSection}>
          <View style={styles.typeHeader}>
            <Text style={styles.typeHeaderText}>支出</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push('SettingStack', {
                  screen: 'CreateSetting',
                  params: { mode: 'type' },
                })
              }
            >
              <Ionicons name="add" size={30} color="#000" />
            </TouchableOpacity>
          </View>
          {_.map(types['pos'], (type) => renderTypeItem(type))}
        </View>
        <View style={styles.typeSection}>
          <View style={styles.typeHeader}>
            <Text style={styles.typeHeaderText}>收入</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push('SettingStack', {
                  screen: 'CreateSetting',
                  params: { mode: 'type' },
                })
              }
            >
              <Ionicons name="add" size={30} color="#000" />
            </TouchableOpacity>
          </View>
          {_.map(types['neg'], (type) => renderTypeItem(type))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TypeSettingScreen;
