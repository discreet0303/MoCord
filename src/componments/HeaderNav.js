import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import themeColor from '../utils/theme';

const styles = StyleSheet.create({
  root: {
    height: 45,
    backgroundColor: themeColor.background,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    paddingHorizontal: 10,
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
