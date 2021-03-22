import RNFS from 'react-native-fs';
import {Platform} from 'react-native';
import moment from 'moment';
import _ from 'lodash';

const dir = RNFS.ExternalDirectoryPath;
const filename = moment().format('YYYY-MM-DD') + '.json';
const filePath = dir + '/' + filename;

export const storeRecords = async (records) => {
  await RNFS.writeFile(filePath, JSON.stringify(records), 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getRecords = async () => {
  return await RNFS.readFile(filePath, 'utf8').then((res) => JSON.parse(res));
};

const data = [
  {datetime: '2020-09-01 12:10', type: 'food', money: 100, note: 'note1'},
  {datetime: '2020-09-02 12:10', type: 'drink', money: 200, note: 'note2'},
  {datetime: '2020-09-03 12:10', type: 'home', money: 200, note: 'note3'},
];
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
};
