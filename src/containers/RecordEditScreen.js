import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RecordEditScreen = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Text>This is the recore edit screen !</Text>
      <Button
        title="Go to Record List Screen"
        onPress={() => navigation.navigate('RecordList')}
      />
    </View>
  );
};

export default RecordEditScreen;
