import React from 'react';
import { TouchableOpacity, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

import HeaderNav from '../../componments/HeaderNav';
import themeColor from '../../utils/theme';

const SETTING_PAGE = [
  { screenName: 'TypeSetting', displayName: '設定類別' },
  { screenName: 'WalletSetting', displayName: '設定錢包' },
];

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: themeColor.background,
  },
  settingItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: themeColor.gray,
  },
  settingItemText: {
    fontSize: 20,
    fontWeight: '600',
  },
});

const SettingListScreen = ({ navigation }) => {
  const renderSettingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => navigation.push('SettingStack', { screen: item.screenName })}
    >
      <Text style={styles.settingItemText}>{item.displayName}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.root}>
      <HeaderNav title="設定頁面" />
      <FlatList
        data={SETTING_PAGE}
        renderItem={renderSettingItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default SettingListScreen;
