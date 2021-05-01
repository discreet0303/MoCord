import React, { useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';

import { fetchWallets, removeWallet } from '../../actions/WalletsAction';
import HeaderNav from '../../componments/HeaderNav';
import themeColor from '../../utils/theme';

const styles = StyleSheet.create({
  root: { backgroundColor: themeColor.background },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: themeColor.gray,
  },
  walletRow: {
    backgroundColor: '#fff',
    marginVertical: 2,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletDeleteButton: {
    backgroundColor: '#bbbbbb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});

const WalletSettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.wallets);

  useEffect(() => {
    dispatch(fetchWallets());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.root}>
      <HeaderNav title="設定錢包" goBack />
      <ScrollView>
        <View style={styles.walletHeader}>
          <Text style={{ fontSize: 18 }}>錢包</Text>
          <Button
            title="add"
            onPress={() =>
              navigation.push('SettingStack', {
                screen: 'CreateSetting',
                params: { mode: 'wallet' },
              })
            }
          />
        </View>
        {_.map(wallets, (wallet, walletIdx) => (
          <View key={walletIdx} style={styles.walletRow}>
            <Text>{wallet.label}</Text>
            <TouchableOpacity
              style={styles.walletDeleteButton}
              onPress={() => dispatch(removeWallet(wallet))}
            >
              <Text style={{ fontSize: 16 }}>De</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletSettingScreen;
