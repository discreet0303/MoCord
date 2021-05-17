import _ from 'lodash';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, SafeAreaView, FlatList, View } from 'react-native';

import HeaderNav from '../../componments/HeaderNav';
import themeColor from '../../utils/theme';

const SETTING_PAGE = [
  { screenName: 'TypeSetting', displayName: '記帳分類' },
  { screenName: 'WalletSetting', displayName: '帳戶' },
];

const styles = StyleSheet.create({
  root: {
    backgroundColor: themeColor.background,
  },
  listHeader: {
    color: '#767676',
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  listContent: { paddingHorizontal: 20, backgroundColor: '#F4F4F4' },
  listContentRow: {
    paddingVertical: 15,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  listContentRowText: {
    fontSize: 17,
  },
});

const SettingListScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.root}>
      <HeaderNav title="設定" />
      <Text style={styles.listHeader}>記帳設定</Text>
      <View style={styles.listContent}>
        {_.map(SETTING_PAGE, (item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listContentRow}
            onPress={() => navigation.push('SettingStack', { screen: item.screenName })}
          >
            <Text style={styles.listContentRowText}>{item.displayName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default SettingListScreen;
