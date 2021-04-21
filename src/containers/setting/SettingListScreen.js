import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';

import HeaderNav from '../../componments/HeaderNav';

const SETTING_PAGE = [
  { screenName: 'TypeSetting', displayName: '設定類別' },
  { screenName: 'WalletSetting', displayName: '設定錢包' },
];

const styles = StyleSheet.create({
  settingItem: {
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 2,
  },
  settingItemText: {
    fontSize: 20,
    fontWeight: '600',
  },
});

const SettingItem = ({ navigation, name, screenName }) => {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => navigation.push('SettingStack', { screen: screenName })}
    >
      <Text style={styles.settingItemText}>{name}</Text>
    </TouchableOpacity>
  );
};

const SettingListScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <HeaderNav title="設定頁面" />
      <ScrollView>
        {SETTING_PAGE.map((page, idx) => (
          <SettingItem
            key={idx}
            navigation={navigation}
            name={page.displayName}
            screenName={page.screenName}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingListScreen;
