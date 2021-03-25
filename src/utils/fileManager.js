import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import moment from 'moment';
import _ from 'lodash';

const _DIR = RNFetchBlob.fs.dirs.SDCardApplicationDir;
const _FILENAME = '2021-03-24.json';
const _FILE_PATH = _DIR + '/files/' + _FILENAME;

export const createRecord = async (record) => {
  const data = await getTodayRecords();
  data.push(record);
  storeRecords(data);
};

export const storeRecords = (records) => {
  RNFetchBlob.fs.writeFile(_FILE_PATH, JSON.stringify(records), 'utf8');
};

export const getTodayRecords = async () => {
  RNFetchBlob.fs.exists(_FILE_PATH).then((exist) => {
    if (!exist) storeRecords([]);
  });
  return await RNFetchBlob.fs
    .readFile(_FILE_PATH, 'utf8')
    .then((data) => JSON.parse(data));
};
