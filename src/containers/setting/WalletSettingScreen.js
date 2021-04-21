import React from 'react';
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
import { fetchWallets, addWallet, removeWallet } from '../../actions/WalletsAction';

import _ from 'lodash';

import HeaderNav from '../../componments/HeaderNav';

const styles = StyleSheet.create({
  walletRoot: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginVertical: 2,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  walletDeleteText: {
    backgroundColor: '#bbbbbb',
    height: 40,
    justifyContent: 'center',
    padding: 5,
  },
});

const WalletSettingScreen = () => {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.wallets);
  const [text, onChangeText] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchWallets());
  }, [dispatch]);

  const createWallet = () => {
    if (text === '') return;
    dispatch(addWallet({ label: text }));
  };

  const deleteWallet = async (wallet) => {
    dispatch(removeWallet(wallet));
  };

  return (
    <SafeAreaView>
      <HeaderNav title="設定錢包" goBack />
      <ScrollView>
        {_.map(wallets, (wallet, walletIdx) => (
          <View key={walletIdx} style={styles.walletRoot}>
            <Text style={{ fontSize: 18 }}>{wallet.label}</Text>
            <TouchableOpacity style={styles.walletDeleteText} onPress={() => deleteWallet(wallet)}>
              <Text style={{ fontSize: 18 }}>De</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          style={{ borderWidth: 1, borderColor: '#000' }}
          value={text}
          onChangeText={onChangeText}
        />
        <Button title={'Add wallet'} onPress={createWallet} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletSettingScreen;
