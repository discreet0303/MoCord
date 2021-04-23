import React, { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import HeaderNav from '../../componments/HeaderNav';
import { OPERATOR_TYPE } from '../../config';
import { addType } from '../../actions/TypesAction';
import { addWallet } from '../../actions/WalletsAction';

const styles = StyleSheet.create({
  typeSection: {
    flexDirection: 'row',
  },
  typeButton: { flex: 1, justifyContent: 'center', alignItems: 'center', height: 40 },
  typeText: {
    fontSize: 20,
  },
  input: {
    fontSize: 20,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
  },
});

const HEADER_TITLE = {
  type: '新增類別',
  wallet: '新增錢包',
};

const CreateSettingScreen = ({ route }) => {
  const dispatch = useDispatch();

  const [type, setType] = useState(OPERATOR_TYPE.position);
  const [text, onChangeText] = useState('');

  const onSubmit = () => {
    if (text === '') return;
    switch (route.params.mode) {
      case 'type':
        dispatch(addType({ label: text, operator: type }));
      case 'wallet':
        dispatch(addWallet({ label: text }));
      default:
        break;
    }
    Alert.alert('新增成功');
  };

  return (
    <SafeAreaView>
      <HeaderNav title={HEADER_TITLE[route.params.mode]} goBack />
      {route.params.mode === 'type' && (
        <View style={styles.typeSection}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === OPERATOR_TYPE.position && { backgroundColor: 'gray' },
            ]}
            onPress={() => setType(OPERATOR_TYPE.position)}
          >
            <Text style={styles.typeText}>收入</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === OPERATOR_TYPE.negative && { backgroundColor: 'gray' },
            ]}
            onPress={() => setType(OPERATOR_TYPE.negative)}
          >
            <Text style={styles.typeText}>支出</Text>
          </TouchableOpacity>
        </View>
      )}
      <TextInput value={text} onChangeText={onChangeText} style={styles.input} />
      <Button title={'送出'} onPress={onSubmit} />
    </SafeAreaView>
  );
};

export default CreateSettingScreen;
