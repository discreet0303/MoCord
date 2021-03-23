import RNFS from 'react-native-fs';
import {Platform} from 'react-native';
import moment from 'moment';
import _ from 'lodash';

const dir = RNFS.ExternalDirectoryPath;
const filename = moment().format('YYYY-MM-DD') + '.json';
const filePath = dir + '/' + filename;

export const createRecord = async (record) => {
  const records = await getRecords();
  records.push(record);
  storeRecords(records);
};

export const storeRecords = (records) => {
  RNFS.writeFile(filePath, JSON.stringify(records), 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getRecords = async () => {
  const fileExist = await RNFS.exists(filePath);
  if (!fileExist) await storeRecords([]);

  return await RNFS.readFile(filePath, 'utf8').then((res) => JSON.parse(res));
};
