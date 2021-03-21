import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RecordListScreen = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Text>This is the recore list screen !</Text>
      <Button
        title="Go to Record Edit Screen"
        onPress={() => navigation.navigate('RecordEdit')}
      />
    </View>
  );
};

export default RecordListScreen;
