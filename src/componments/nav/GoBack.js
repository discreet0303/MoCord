import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
});

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.root} onPress={() => navigation.goBack()}>
      <Text>Back</Text>
    </TouchableOpacity>
  );
};

export default GoBack;
