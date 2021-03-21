var RNFS = require('react-native-fs');

import {Platform} from 'react-native';

const dir = RNFS.ExternalDirectoryPath;

export const storeRecord = () => {
  const filePath = dir + '/123.txt';

  RNFS.writeFile(filePath, 'Lorem ipsum dolor sit amet', 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
};
