import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTypes, addType, removeType } from '../../actions/TypesAction';

import HeaderNav from '../../componments/HeaderNav';

import { OPERATOR_TYPE } from '../../config';

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
  typeSectionText: {
    fontSize: 20,
    paddingLeft: 20,
    marginVertical: 10,
  },
});

const TypeSettingScreen = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => _.groupBy(state.types, 'operator'));
  const [text, onChangeText] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  const addRecordType = (op) => {
    if (text === '') return;
    dispatch(addType({ label: text, operator: op }));
  };

  const removeRecordType = async (type) => {
    dispatch(removeType(type));
  };

  return (
    <SafeAreaView>
      <HeaderNav title="設定類別" goBack />
      <ScrollView>
        {_.map(_.keys(types), (op, idx) => (
          <View key={op}>
            <Text style={styles.typeSectionText}>{op}</Text>
            {_.map(types[op], (type, typeIdx) => (
              <View key={typeIdx} style={styles.typeRoot}>
                <Text style={{ fontSize: 18 }}>{type.label}</Text>
                <TouchableOpacity
                  style={styles.typeDeleteText}
                  onPress={() => removeRecordType(type)}
                >
                  <Text style={{ fontSize: 18 }}>De</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
        <TextInput
          style={{ borderWidth: 1, borderColor: '#000' }}
          value={text}
          onChangeText={onChangeText}
        />
        <Button title={'Add Pos Type'} onPress={() => addRecordType(OPERATOR_TYPE.position)} />
        <Button title={'Add Neg Type'} onPress={() => addRecordType(OPERATOR_TYPE.negative)} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TypeSettingScreen;
