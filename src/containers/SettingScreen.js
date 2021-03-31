import _ from 'lodash';
import React from 'react';
import {View, Text} from 'react-native';

import {getRecordTypes, storeRecordTypes} from '../utils/fileManager';

const def = [
  {label: '食物'},
  {label: '飲品'},
  {label: '交通'},
  {label: '消費'},
  {label: '居家'},
  {label: '收入'},
  {label: '其他'},
];

const SettingScreen = () => {
  const [types, setTypes] = React.useState(types);

  React.useEffect(() => {
    const runAsync = async () => {
      await storeRecordTypes(def);
      const res = await getRecordTypes();
      console.log(res);
      setTypes(res);
    };

    runAsync();
  }, []);

  return (
    <View>
      {_.map(types, (type) => (
        <Text key={type.id}>{type.label}</Text>
      ))}
    </View>
  );
};

export default SettingScreen;
