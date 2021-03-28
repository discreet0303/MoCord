import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    height: 45,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
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
  flex1: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
});

const HeaderNav = ({title = '', leftSection, rightSection}) => {
  return (
    <View style={styles.root}>
      <View style={styles.flex1}>{leftSection}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.flex1}>{rightSection}</View>
    </View>
  );
};

export default HeaderNav;
