import _ from 'lodash';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchWallets, removeWallet } from '../../actions/WalletsAction';
import HeaderNav from '../../componments/HeaderNav';
import themeColor from '../../utils/theme';

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

const WalletSettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.wallets);

  useEffect(() => {
    dispatch(fetchWallets());
  }, [dispatch]);

  const renderItem = (item) => (
    <View style={styles.listContentRow} key={item.label}>
      <TouchableOpacity style={{ justifyContent: 'center' }}>
        <Text style={styles.listContentRowText}>{item.label}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(removeWallet(item))}>
        <Ionicons name={'ios-trash-outline'} size={25} color={'red'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <HeaderNav title="帳戶" goBack />
      <View style={styles.listContent}>{_.map(wallets, (item) => renderItem(item))}</View>
      <TouchableOpacity
        style={styles.addRow}
        onPress={() => navigation.push('SettingStack', { screen: 'CreateWallet' })}
      >
        <Text style={styles.addRowText}>
          <Ionicons name={'ios-add-outline'} size={20} />
          新增帳戶
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WalletSettingScreen;
