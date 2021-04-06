import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import _ from 'lodash';

import {fetchTypes, addType, removeType} from '../actions/TypesAction';
import {getRecordTypes, storeRecordTypes} from '../utils/fileManager';

const styles = StyleSheet.create({
  typeRoot: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  typeDeleteText: {
    backgroundColor: '#bbbbbb',
    height: 40,
    justifyContent: 'center',
    padding: 5,
  },
});

const SettingScreen = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [text, onChangeText] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchTypes());
  }, []);

  const addRecordType = () => {
    if (text === '') return;
    dispatch(addType({label: text}));
  };

  const removeRecordType = async (type) => {
    dispatch(removeType(type));
  };

  return (
    <View>
      <TextInput
        style={{borderWidth: 1, borderColor: '#000'}}
        value={text}
        onChangeText={onChangeText}
      />
      <Button title={'Type'} onPress={addRecordType} />
      {_.map(types, (type, typeIdx) => (
        <View key={typeIdx} style={styles.typeRoot}>
          <Text style={{fontSize: 18}}>{type.label}</Text>
          <TouchableOpacity
            style={styles.typeDeleteText}
            onPress={() => removeRecordType(type)}>
            <Text style={{fontSize: 18}}>De</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default SettingScreen;
