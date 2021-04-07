import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {fetchTypes, addType, removeType} from '../../actions/TypesAction';

import _ from 'lodash';

import HeaderNav from '../../componments/HeaderNav';

const styles = StyleSheet.create({
  typeRoot: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginVertical: 2,
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

const TypeSettingScreen = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [text, onChangeText] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  const addRecordType = () => {
    if (text === '') return;
    dispatch(addType({label: text}));
  };

  const removeRecordType = async (type) => {
    dispatch(removeType(type));
  };

  return (
    <>
      <HeaderNav title="設定類別" goBack />
      <ScrollView>
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
        <TextInput
          style={{borderWidth: 1, borderColor: '#000'}}
          value={text}
          onChangeText={onChangeText}
        />
        <Button title={'Add Type'} onPress={addRecordType} />
      </ScrollView>
    </>
  );
};

export default TypeSettingScreen;
