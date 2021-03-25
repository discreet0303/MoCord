import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  root: {
    height: 45,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
});

const HeaderNav = ({title = '', leftSection, rightSection}) => {
  return (
    <View style={styles.root}>
      <View>{leftSection}</View>
      <Text style={styles.title}>{title}</Text>
      <View>{rightSection}</View>
    </View>
  );
};

export default HeaderNav;
