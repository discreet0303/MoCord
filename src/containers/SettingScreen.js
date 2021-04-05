import _ from 'lodash';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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
  const [types, setTypes] = React.useState(types);
  const [text, onChangeText] = React.useState('');

  React.useEffect(() => {
    const runAsync = async () => {
      const res = await getRecordTypes();
      console.log(res);
      setTypes(res);
    };

    runAsync();
  }, []);

  const addRecordType = async () => {
    if (text === '') return;
    const data = _.uniqBy([...types, {label: text}], 'label');
    setTypes(data);
    onChangeText('');
    await storeRecordTypes(data);
  };

  const removeRecordType = async (typeIndex) => {
    const data = _.filter(types, (type, typeIdx) => typeIdx !== typeIndex);
    setTypes(data);
    await storeRecordTypes(data);
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
            onPress={() => removeRecordType(typeIdx)}>
            <Text style={{fontSize: 18}}>De</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default SettingScreen;
