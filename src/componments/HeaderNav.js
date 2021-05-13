import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeColor from '../utils/theme';

const styles = StyleSheet.create({
  root: {
    height: 55,
    backgroundColor: themeColor.background,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
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
    <TouchableOpacity
      style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name={'md-arrow-back'} size={30} />
    </TouchableOpacity>
  );
};

const HeaderNav = ({
  title = '',
  titleHandler,
  renderLeftSection = null,
  renderRightSection = null,
  goBack = false,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.leftSection}>{goBack ? <GoBack /> : renderLeftSection}</View>
      {titleHandler ? (
        <TouchableOpacity onPress={titleHandler}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}

      <View style={styles.rightSection}>{renderRightSection}</View>
    </View>
  );
};

export default HeaderNav;
