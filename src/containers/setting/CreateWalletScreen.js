import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import HeaderNav from '../../componments/HeaderNav';
import themeColor from '../../utils/theme';
import { addWallet } from '../../actions/WalletsAction';

const styles = StyleSheet.create({
  root: { backgroundColor: themeColor.background, flex: 1 },
  listContent: {
    paddingHorizontal: 20,
  },
  listContentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  listContentRowText: {
    fontSize: 20,
    paddingVertical: 10,
  },
  listContentRowInput: {
    fontSize: 20,
    flex: 1,
    textAlign: 'right',
  },
});

const CreateWalletScreen = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const onSubmit = () => {
    dispatch(addWallet({ label: text })).then(() => {
      setText('');
    });
    alert('新增成功');
  };

  return (
    <SafeAreaView style={styles.root}>
      <HeaderNav title="新增帳戶" goBack />
      <View style={styles.listContent}>
        <View style={styles.listContentRow}>
          <Text style={styles.listContentRowText}>名稱</Text>
          <TextInput
            value={text}
            style={styles.listContentRowInput}
            placeholder="請輸入帳戶名稱"
            onChangeText={setText}
          />
        </View>
        <Button title="送出" onPress={onSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default CreateWalletScreen;
