import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  root: {
    height: 45,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    paddingHorizontal: 10,
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.43,
    // shadowRadius: 9.51,
    // elevation: 15,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
});

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>Back</Text>
    </TouchableOpacity>
  );
};

const HeaderNav = ({
  title = '',
  renderLeftSection = null,
  renderRightSection = null,
  goBack = false,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.leftSection}>{goBack ? <GoBack /> : renderLeftSection}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSection}>{renderRightSection}</View>
    </View>
  );
};

export default HeaderNav;
